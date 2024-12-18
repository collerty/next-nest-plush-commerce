'use server';

import {getAuthTokens, handleTokenRefresh} from "@/lib/auth-tokens";

export async function fetcher(url, options = {}) {
  const {accessToken, refreshToken} = await getAuthTokens();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: accessToken ? `Bearer ${accessToken.value}` : undefined,
    ...options.headers,
  };

  console.log(url, headers);

  try {
    const res = await fetch(url, {...options, headers});

    if (res.status === 401 && refreshToken) {
      // Attempt token refresh if unauthorized
      console.log("Attempt token refresh")
      await handleTokenRefresh();
      console.log("recursive fetcher call after token refresh")
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
