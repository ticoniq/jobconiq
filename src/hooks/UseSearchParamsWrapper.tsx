'use client'

import { useSearchParams } from 'next/navigation';

type UseSearchParamsWrapperProps = {
  children: (params: { urlError: string }) => React.ReactNode;
};

export function UseSearchParamsWrapper({ children }: UseSearchParamsWrapperProps) {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with other provider!"
      : "";

  return (
    <>
      {children({ urlError })}
    </>
  );
}
