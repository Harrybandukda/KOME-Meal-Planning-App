import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getServerURL() {
  return process.env.NEXT_PUBLIC_ENV === "development"
    ? "http://localhost:3123"
    : process.env.NEXT_PUBLIC_SERVER_URL;
}

export function buildURL(route: string) {
  return getServerURL() + route;
}

export function sendRequest<T>(url: string, method: string = 'GET', body: any): Promise<T> {
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    }
  };

  if (method !== "GET") {
    options.method = method;
    options.body = JSON.stringify(body);
  }

  return fetch(buildURL(url), options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    });
}