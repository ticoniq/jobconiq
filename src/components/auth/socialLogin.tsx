"use client";
import { useState } from 'react';
import { signIn } from "next-auth/react";
import { ImSpinner8 } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from '@/lib/routes';
import { FcGoogle } from "react-icons/fc";

export function SocialLogin() {
  const [isPending, setIsPending] = useState(false);
  
  const handleSignIn = async () => {
    setIsPending(true);
    try {
      await signIn("google", {
        callbackUrl: DEFAULT_LOGIN_REDIRECT,
      });
    } catch (error) {
      console.error("Sign-in error:", error);
      setIsPending(false);
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isPending}
      onClick={handleSignIn}>
      {isPending && <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />}
      {!isPending && <FcGoogle className="mr-2 h-5 w-5" />}
      Login with Google
    </Button>
  );
}
