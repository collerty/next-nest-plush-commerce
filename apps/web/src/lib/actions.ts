"use server";

const url = process.env.NEXT_PUBLIC_API_URL;

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

export async function login(body: LoginBody): Promise<ApiResponse<Tokens>> {
  try {
    const res = await fetch(`${url}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify(body)
    });

    const data = await res.json();

    return {success: true, data: data};
  } catch (error: any) {
    return {success: false, error: error.response?.data?.message};
  }
}
