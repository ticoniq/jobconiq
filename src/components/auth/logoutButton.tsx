"use client";
import { logout } from '@/actions/developer/auth/logout';

interface LogoutButtonProps {
  children?: React.ReactNode
}

function LogoutButton({ children }: LogoutButtonProps) {
  const onClick = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
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

export default LogoutButton