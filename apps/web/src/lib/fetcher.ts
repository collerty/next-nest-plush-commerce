'use server';

import {cookies} from 'next/headers';
import {apiUrl} from "@/lib/api-url";

export async function fetcher(url, options = {}) {
  const {accessToken} = await getAuthTokens(); // Await for cookies API
  const headers = {
    'Content-Type': 'application/json',
    Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    ...options.headers,
  };

  try {
    const res = await fetch(url, {...options, headers});

    if (res.status === 401) {
      // Attempt token refresh if unauthorized
      await handleTokenRefresh();
      return fetcher(url, options); // Retry request after refreshing token
    }

    if (!res.ok) return res.text().then(text => { throw new Error(text) })
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
  return {accessToken, refreshToken};
}

export async function handleTokenRefresh() {
  try {
    // Retrieve the refresh token
    const {refreshToken} = await getAuthTokens();
    if (!refreshToken) throw new Error('No refresh token available');

    // Send the request to refresh the token
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

    // Check if the response is successful
    if (!res.ok) return res.text().then(text => { throw new Error(text) })

    // Parse the response JSON and extract the new access token
    const {accessToken} = await res.json();

    // Set the new access token in the cookies
    return new Response('Token refreshed', {
      status: 200,
      headers: {
        'Set-Cookie': `accessToken=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict`,
      },
    });
  } catch (error) {
    // Log the error and throw it, or return a specific error response
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