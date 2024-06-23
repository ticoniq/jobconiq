import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLastWord(input: any): any {
  const words = input.split(' ');
  return words[words.length - 1];
};
