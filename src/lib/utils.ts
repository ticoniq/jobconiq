import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLastWord(input: any): any {
  const words = input.split(' ');
  return words[words.length - 1];
};

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function relativeDate(from: Date) {
  return formatDistanceToNowStrict(from, { addSuffix: true });
}

export function formatDate(date: Date): string {
  return format(date, 'MMMM d, yyyy');
}

export function calculateAge(birthDate: Date) {
  const today = new Date(2024, 6, 6);
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

export function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
