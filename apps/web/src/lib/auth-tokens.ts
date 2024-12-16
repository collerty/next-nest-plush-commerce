"use server"

import {cookies} from "next/headers";
import {apiUrl} from "@/lib/api-url";

export async function getAuthTokens() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');
  return {accessToken, refreshToken};
}

export async function handleTokenRefresh() {
  try {
    const {refreshToken} = await getAuthTokens();
    if (!refreshToken) throw new Error('No refresh token available');

    const res = await fetch(`${apiUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: refreshToken?.value,
      }),
      credentials: 'include', // Include cookies in the request
    });

    if (!res.ok) return res.text().then(text => {
      throw new Error(text)
    })

    const {accessToken} = await res.json();

    return new Response('Token refreshed', {
      status: 200,
      headers: {
        'Set-Cookie': `accessToken=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict`,
      },
    });
  } catch (error) {

    console.error('Error refreshing token:', error);
    throw new Error(`Token refresh failed: ${error.message || error}`);
  }
}


export async function setAuthTokens(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();

  cookieStore.set('accessToken', accessToken, {
    httpOnly: true, // Prevent JavaScript access
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'strict', // Strict SameSite for security
    path: '/', // Available across the whole app
  });

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true, // Prevent JavaScript access
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'strict', // Strict SameSite for security
    path: '/', // Available across the whole app
  });
}

export async function clearAuthTokens() {
  const cookieStore = await cookies();

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
}