"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
    const { uid, name, email} = params;

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
        });

        return {
            success: true,
            message: "User created successfully. Please sign in.",
        }

    } catch (e: any) {
        console.error("Error Creating User:", e);

        if(e?.code === 'auth/email-already-exists') {
            return {
                succuess: false,
                message: "Email already exists",
            }
        }

        return {
            success: false,
            message: "Error creating user",
        }
    }

}

export async function setSessionCookie(idToken: string){
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

export async function signIn(params: SignInParams){
    const {email, idToken} = params;
    try {
        const userRecord = await auth.getUserByEmail(email);
        
        if (!userRecord) {
            return {
                success: false,
                message: "User not found. Please sign up.",
            };
        }
        await setSessionCookie(idToken);
    } catch (e) {
        console.error("Error Signing In:", e);
        
        return {
            success: false,
            message: "Error signing in",
        }
    }
}

export async function getCurrentUser (): Promise<User | null >{
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) return null;

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.collection("users").doc(decodedClaims.uid).get();

        if (!userRecord.exists) {
            return null;
        }

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