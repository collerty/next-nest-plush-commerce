'use server';

import { cookies } from 'next/headers';

export async function fetcher(url, options = {}) {
  const { accessToken } = await getAuthTokens(); // Await for cookies API
  const headers = {
    'Content-Type': 'application/json',
    Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    ...options.headers,
  };

  try {
    const res = await fetch(url, { ...options, headers });

    if (res.status === 401) {
      // Attempt token refresh if unauthorized
      await handleTokenRefresh();
      return fetcher(url, options); // Retry request after refreshing token
    }

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error('Error in fetcher:', err.message);
    throw err; // Rethrow error for the caller to handle
  }
}

// Helper to get tokens from cookies
export async function getAuthTokens() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');
  return { accessToken, refreshToken };
}

export async function handleTokenRefresh() {
  const { refreshToken } = await getAuthTokens();
  if (!refreshToken) throw new Error('No refresh token available');

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
    credentials: 'include', // Include cookies in the request
  });

  if (!res.ok) throw new Error('Failed to refresh token');
  const { accessToken } = await res.json();

  return new Response('Token refreshed', {
    status: 200,
    headers: {
      'Set-Cookie': `accessToken=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict`,
    },
  });
}

export async function setAuthTokens(accessToken: string, refreshToken: string){
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