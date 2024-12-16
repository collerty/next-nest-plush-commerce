'use server';

import {getAuthTokens, handleTokenRefresh} from "@/lib/auth-tokens";

export async function fetcher(url, options = {}) {
  const {accessToken} = await getAuthTokens();
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
      return fetcher(url, options);
    }

    if (!res.ok) return res.text().then(text => {
      throw new Error(text)
    })
    return res.json();
  } catch (err) {
    console.error('Error in fetcher:', err.message);
    throw err;
  }
}
