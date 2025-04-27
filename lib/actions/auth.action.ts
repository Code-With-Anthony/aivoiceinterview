"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
    const { uid, name, email, authProvider = "email", password, role } = params;

    try {
        const userRecord = await db.collection("users").doc(uid).get();

        if (userRecord.exists) {
            return {
                success: false,
                message: "User already exists. Please sign in instead.",
            };
        }

        await db.collection("users").doc(uid).set({
            name,
            email,
            role,
            password,
            authProvider,
        });

        return {
            success: true,
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
    try {
        // Step 1: Check if user exists in Firebase Auth
        const userRecord = await auth.getUserByEmail(email);

        if (!userRecord && authProvider !== "google") {
            return {
                success: false,
                message: "User not found. Please sign up.",
            };
        }

        // Step 2: Check if user document exists in Firestore
        const userDoc = await db.collection("users").doc(userRecord.uid).get();

        // Step 3: If missing, create it for Google Auth only
        if (!userDoc.exists && authProvider === "google") {
            await db.collection("users").doc(userRecord.uid).set({
                name: userRecord.displayName || "New User",
                email: userRecord.email,
                authProvider: "google",
                createdAt: new Date(),
            });

        }
        else if (!userDoc.exists) {
            return {
                success: false,
                message: "User not found. Please sign up.",
            };
        }
        // Step 4: Set session
        await setSessionCookie(idToken);

        return {
            success: true,
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