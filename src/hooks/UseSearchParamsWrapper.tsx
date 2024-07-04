'use client'

import { useSearchParams } from 'next/navigation';

type UseSearchParamsWrapperProps = {
  children: (params: { urlError: string }) => React.ReactNode;
};

export function UseSearchParamsWrapper({ children }: UseSearchParamsWrapperProps) {
  const searchParams = useSearchParams();
  let urlError = "";

  const error = searchParams.get("error");

  if (error === "OAuthAccountNotLinked") {
    urlError = "Email already in use with other provider!";
  } else if (error === "unauthorized") {
    urlError = "Login or create an account to apply for jobs";
  }
  return (
    <>
      {children({ urlError })}
    </>
  );
}
