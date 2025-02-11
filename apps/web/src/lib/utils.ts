import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | number) {
  return new Intl.DateTimeFormat('id-ID', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export const unslugify = (slug: string) => slug.replace(/\-/g, " ")
    .replace(/\w\S*/g,
        (text:string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    );