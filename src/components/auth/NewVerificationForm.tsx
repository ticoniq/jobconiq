
"use client";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { ImSpinner8 } from "react-icons/im";
import { newVerification } from "@/actions/developer/auth/newVerification";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";

function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing Token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      })
  }, [token, success, error])

  useEffect(() => {
    onSubmit();
  }, [onSubmit])

  return (
    <div className="flex flex-col space-y-5 gap-6 ">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t-2 border-neutrals-400" />
        </div>
      </div>
      <div>
        {!success && !error && (
          <ImSpinner8 className="animate-spin w-20 h-20 mx-auto" />
        )}
        {!success && (
          <FormError message={error} />
        )}
        <FormSuccess message={success} />
      </div>

    </div>
  )
}

export default NewVerificationForm