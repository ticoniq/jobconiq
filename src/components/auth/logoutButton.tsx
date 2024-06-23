"use client";
import { logout } from '@/actions/developer/auth/logout';

interface logoutButtonProps {
  children?: React.ReactNode
}

function logoutButton({ children }: logoutButtonProps) {
  const onClick = () => {
    logout();
  }

  return (
    <span
      onClick={onClick}
      className="cursor-pointer"
    >
      {children}
    </span>
  )
}

export default logoutButton