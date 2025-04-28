"use server";

import { auth, db } from "@/firebase/admin";
import { auth as clientAuth } from "@/firebase/client"
import { getAuth } from "firebase-admin/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
    const { name, email, authProvider = "email", role, password } = params;

    if (!name || !email || !authProvider || !role || !password) {
        return {
            success: false,
        }
    }

    try {
        // Check if the user exists in Firebase Authentication
        const userExists = await checkIfUserExists(email);
        if (userExists) {
            return {
                success: false,
                message: "User already exists. Please sign in instead.",
            };
        }

        // const userRecord = await db.collection("users").doc(userExists?.uid).get();

        // if (userRecord.exists) {
        //     return {
        //         success: false,
        //         message: "User already exists. Please sign in instead.",
        //     };
        // }

        const newUser = await createUserWithEmailAndPassword(
            clientAuth,
            email as string,
            password as string
        );

        await db.collection("users").doc(newUser.user.uid).set({
            name,
            email,
            role,
            authProvider,
        });

        return {
            success: true,
            userId: newUser.user.uid,
            idToke: newUser.user.getIdToken(),
            message: "User created successfully. Please sign in.",
        }

    } catch (e: any) {
        console.error("Error Creating User:", e);

        if (e?.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: "Email already exists",
            }
        }

        return {
            success: false,
            message: "Error creating user",
        }
    }

}

// Helper function to check if a user already exists in Firebase Authentication
export async function checkIfUserExists(email: string) {
    const auth = getAuth();
    try {
        const userRecord = await auth.getUserByEmail(email);
        return userRecord ? userRecord : null;
    } catch (error) {
        if (error?.code === 'auth/user-not-found') {
            return false; // User doesn't exist
        }
        console.error('Error checking user existence:', error);
        return false;
    }
}

export async function setSessionCookie(idToken: string) {
    const cookitStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK * 1000,
    });

    cookitStore.set("session", sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
    })
}

export async function signIn(params: SignInParams) {
    const { email, idToken, authProvider } = params;
    if (!email || !idToken || !authProvider) {
        return {
            success: false,
            message: "All fields are neccessary"
        }
    }
    try {
        // Step 1: Check if user exists in Firebase Auth
        const userRecord = await auth.getUserByEmail(email);

        if (!userRecord) {
            return {
                success: false,
                message: "New User Detected. Please Signup",
            };
        }

        // Step 2: Check if user document exists in Firestore
        const userDoc = await db.collection("users").doc(userRecord.uid).get();

        if (!userDoc.exists) {
            return {
                success: false,
                message: "Something went wrong while fetching user",
            };
        }
        // Step 4: Set session
        await setSessionCookie(idToken);

        return {
            success: true,
            user: userDoc.data(),
        }
    } catch (e) {
        console.error("Error Signing In:", e);

        return {
            success: false,
            message: "Error signing in",
        }
    }
}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) return null;

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        const userRecord = await db.collection("users").doc(decodedClaims.uid).get();

        if (!userRecord.exists) {
            return null;
        }

        // Ensure data exists and matches your User type
        const userData = userRecord.data();
        if (!userData) return null;

        return {
            ...userRecord.data(),
            id: decodedClaims.uid,
        } as User;
    } catch (error) {
        console.error("Error getting current user:", error);
        return null;

    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
}

export async function signOut() {
    try {
        const cookieStore = await cookies();

        // Clear the session cookie by setting it with a past expiration date
        cookieStore.set("session", "", {
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
        });

        return {
            success: true,
            message: "Signed out successfully.",
        };
    } catch (error) {
        console.error("Error signing out:", error);
        return {
            success: false,
            message: "Error signing out.",
        };
    }
}