"use server";

import { fetcher} from "@/lib/fetcher";
import {apiUrl} from "@/lib/api-url";
import {clearAuthTokens, getAuthTokens, setAuthTokens} from "@/lib/auth-tokens";
import {redirect} from "next/navigation";


export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface LoginBody {
  email: string;
  password: string;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

// login with credentials; not used in social login
export async function login(body: LoginBody): Promise<ApiResponse<Tokens>> {
  try {
    const data = await fetcher(`${apiUrl}/auth/login`, {
      method: 'POST',
      credentials: "include",
      body: JSON.stringify(body)
    });

    if (data.accessToken && data.refreshToken) {
      await setAuthTokens(data.accessToken, data.refreshToken);
    }


    return {success: true, data: data};
  } catch (error: any) {
    return {success: false, error: error.response?.data?.message};
  }
}

export async function getProfile(): Promise<ApiResponse<any>> {
  try {
    const data = await fetcher(`${apiUrl}/auth/profile`, {
      method: 'GET',
      credentials: "include",
    });

    return {success: true, data: data};
  } catch (error: any) {
    return {success: false, error: error.response?.data?.message};
  }
}

export async function logout(): Promise<void> {
 try {
   const {accessToken, refreshToken} = await getAuthTokens();
   const headers = {
     'Content-Type': 'application/json',
     Authorization: accessToken ? `Bearer ${accessToken.value}` : undefined,
   };
  const response = await fetch(`${apiUrl}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
   ...headers
  });

  // if (!response.ok) {
  //   console.error('Failed to logout');
  //   return;
  // }

  await clearAuthTokens();
 } catch (e) {
    console.log(e);
 }

  // redirect("/");
}

