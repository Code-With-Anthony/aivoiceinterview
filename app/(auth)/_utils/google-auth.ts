"use client";
import {
  AuthProvider,
  GOOGLEERROR_MESSAGE,
  ROLE,
  SUCCESS_MESSAGE,
} from "@/constants";
import { auth, provider } from "@/firebase/client";
import { getCurrentUser, signIn } from "@/lib/actions/auth.action";
import { useUserStore } from "@/lib/store/useUserStore";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useGoogleAuth = () => {
  const { setUser } = useUserStore((state) => state);
  const router = useRouter();

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user) {
        toast.error(GOOGLEERROR_MESSAGE.GOOGLE_SIGNIN_FAILED_NO_USER);
        return;
      }

      const userDetails = await getCurrentUser();
      const idToken = await user.getIdToken();

      // Attempt to sign in
      const signInResult = await signIn({
        email: user.email!,
        idToken,
        authProvider: AuthProvider.GOOGLE,
      });

      if (signInResult?.success === true) {
        setUser({
          id: signInResult?.user?.uid,
          name: signInResult?.user?.name,
          email: signInResult?.user?.email,
          role: signInResult?.user?.role,
          authProvider: AuthProvider.GOOGLE,
        });
        toast.success(SUCCESS_MESSAGE.SIGNIN_SUCCESSFULL);
      } else if (
        signInResult.message === GOOGLEERROR_MESSAGE.GOOGLE_POPUP_CLOSED_BY_USER
      ) {
        toast.error(GOOGLEERROR_MESSAGE.GOOGLE_SIGNIN_FAILED_BY_CLOSING_POPUP);
        return;
      } else {
        toast.error(signInResult.message);
        return;
      }

      if (userDetails?.role === ROLE.CANDIDATE) {
        router.push("/");
      } else if (userDetails?.role === ROLE.RECRUITER) {
        router.push("/recruiter");
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
      toast.error(GOOGLEERROR_MESSAGE.GOOGLE_SIGNIN_FAILED);
    }
  };

  return { handleGoogleAuth };
};
