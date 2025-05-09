"use server";

import { auth, db } from "@/firebase/admin";
import { auth as clientAuth } from "@/firebase/client";
import { Admin, Company, UserProfile } from "@/types/profile";
import { getAuth } from "firebase-admin/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
    const { name, email, authProvider = "email", role, password, companyType } = params;
    if (!name || !email || !authProvider || !role || !password || (role === "recruiter" && !companyType)) {
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

        const newUser = await createUserWithEmailAndPassword(
            clientAuth,
            email,
            password
        );

        const userId = newUser.user.uid;

        if (role === "candidate") {
            const candidateProfile: UserProfile = {
                name,
                email,
                role,
                authProvider,
                bio: "",
                personalDetails: {
                    age: null,
                    gender: "",
                    address: {
                        street: "",
                        city: "",
                        state: "",
                        pin: "",
                    },
                    image: "",
                    hobbies: [],
                },
                professionalDetails: {
                    totalExperience: "",
                    currentRole: [],
                    education: [],
                },
                experience: [],
                skills: [],
                trainings: [],
                certifications: [],
                projects: [],
                socialMedia: {
                    linkedIn: "",
                    dribbble: "",
                    hackerRank: "",
                    codeForces: "",
                    hackerEarth: "",
                    github: "",
                    stackoverflow: "",
                },
                jobsApplied: [],
                completedInterview: [],

            };

            await db.collection("users").doc(userId).set(candidateProfile);
        }

        else if (role === "recruiter") {
            const isTechCompany = companyType === "tech" || companyType === "mix";

            const companyProfile: Company = {
                name,
                email,
                role,
                authProvider,
                logo: "",
                coverImage: "",
                industry: "",
                headquarters: "",
                size: "",
                foundedYear: "",
                website: "",
                description: "",
                mission: "",
                values: [],
                products: [],
                isTechCompany,
                ...(isTechCompany && {
                    techStack: {
                        frontend: [],
                        backend: [],
                        database: [],
                        devops: [],
                        other: [],
                    },
                }),
                reviews: [],
                social: {
                    linkedin: "",
                    twitter: "",
                    github: "",
                    glassdoor: "",
                },
                verified: false,
            };

            await db.collection("users").doc(userId).set(companyProfile);
        }

        else if (role === "admin") {
            const adminProfile: Admin = {
                name,
                email,
                role,
                authProvider,
                adminDetails: {
                    permissions: ["manageUsers", "moderateContent", "manageJobs", "sendNotifications"],
                    createdAt: new Date().toISOString(),
                    assignedSections: [],
                    isSuperAdmin: false,
                    notificationsEnabled: true,
                },
            };

            await db.collection("users").doc(userId).set(adminProfile);
        }

        return {
            success: true,
            userId,
            idToken: newUser.user.getIdToken(),
            message: "User created successfully. Please sign in.",
        };
    } catch (e: any) {
        console.error("Error Creating User:", e);

        if (e?.code === "auth/email-already-exists") {
            return {
                success: false,
                message: "Email already exists",
            };
        }

        return {
            success: false,
            message: "Error creating user",
        };
    }
}


// Helper function to check if a user already exists in Firebase Authentication
export async function checkIfUserExists(email: string) {
    const auth = getAuth();
    try {
        const userRecord = await auth.getUserByEmail(email);
        return userRecord ? userRecord : null;
    } catch (error) {
        if (error?.code === "auth/user-not-found") {
            return false; // User doesn't exist
        }
        console.error("Error checking user existence:", error);
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
    });
}

export async function signIn(params: SignInParams) {
    const { email, idToken, authProvider } = params;
    if (!email || !idToken || !authProvider) {
        return {
            success: false,
            message: "All fields are neccessary",
        };
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
        };
    } catch (e) {
        console.error("Error Signing In:", e);

        return {
            success: false,
            message: "Error signing in",
        };
    }
}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) return null;

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        const userRecord = await db
            .collection("users")
            .doc(decodedClaims.uid)
            .get();

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
