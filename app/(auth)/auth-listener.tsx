"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/client";
import { useUserStore } from "@/lib/store/useUserStore";

export const AuthListener = () => {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        console.log("firebase user: ", firebaseUser);
        try {
          const userRef = doc(db, "users", firebaseUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            console.log("userData: ", userData);
            setUser({
              id: firebaseUser.uid,
              name: userData.name,
              email: userData.email,
              authProvider: userData.authProvider,
              role: userData.role,
            });
          } else {
            // fallback if no user doc exists — optional
            setUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName ?? "Unknown",
              email: firebaseUser.email ?? "No email",
              authProvider: firebaseUser.providerData[0]?.providerId ?? "email",
              role: "candidate",
            });
          }
        } catch (err) {
          console.error("Error fetching user data from Firestore:", err);
        }
      } else {
        clearUser();
      }
    });

    return () => unsubscribe();
  }, [setUser, clearUser]);

  return null;
};
