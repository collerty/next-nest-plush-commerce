"use server";

import {fetcher} from "@/lib/fetcher";
import {apiUrl} from "@/lib/api-url";
import {clearAuthTokens, getAuthTokens, setAuthTokens} from "@/lib/auth-tokens";
import {AddProductDTO, Product, User} from "@/lib/types";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";


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
      body: JSON.stringify(body),
      'Content-Type': 'application/json',
    });

    if (data.accessToken && data.refreshToken) {
      await setAuthTokens(data.accessToken, data.refreshToken);
    }


    return {success: true, data: data};
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    return {success: false, error: error};
  }
}


export async function getProfile(): Promise<ApiResponse<User>> {
  try {
    const data = await fetcher(`${apiUrl}/auth/profile`, {
      method: 'GET',
      credentials: "include",
      cache: 'no-store',
    });

    return {success: true, data: data};
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    return {success: false, error: error};
  }
}

export async function logout(): Promise<void> {
  let redirectPath: string | null = null;

  try {
    const {accessToken} = await getAuthTokens();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: accessToken ? `Bearer ${accessToken.value}` : undefined,
    };
    await fetch(`${apiUrl}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      ...headers
    });
    console.log("clear auth tokens")
    await clearAuthTokens();
    console.log("revalidate path")
    // window.location.href = '/';
    // revalidatePath('/', 'layout');
  } catch (e) {
    console.log(e);
  } finally {
    // redirect("/");
  }
}

export async function getProductById(id: string): Promise<ApiResponse<Product>> {
  try {
    const data = await fetcher(`${apiUrl}/products/${id}`, {
      method: 'GET'
    });

    return {success: true, data: data};
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    console.log(error)
    return {success: false, error: error};
  }
}

export async function getAllProducts(): Promise<ApiResponse<Product[]>> {
  try {
    const data = await fetcher(`${apiUrl}/products`, {
      method: 'GET'
    });

    return {success: true, data: data};
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    return {success: false, error: error};
  }
}

export async function addProduct(body: Partial<AddProductDTO>): Promise<ApiResponse<Product>> {
  try {
    console.log("adding product", {body});
    const data = await fetcher(`${apiUrl}/products`, {
      method: 'POST',
      body: JSON.stringify(body),
      'Content-Type': 'application/json',
    });

    return {success: true, data: data};
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    return {success: false, error: error};
  }
}

export async function updateProduct(body: Partial<AddProductDTO>, productId): Promise<ApiResponse<Product>> {
  try {
    console.log("editing product", {body});
    const data = await fetcher(`${apiUrl}/products/${productId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      'Content-Type': 'application/json',
    });

    return {success: true, data: data};
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    return {success: false, error: error};
  }
}


export async function deleteProduct(id) {
  try {
    const data = await fetcher(`${apiUrl}/products/${id}`, {
      method: 'DELETE',
    });

    return {success: true, data: data};
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    return {success: false, error: error};
  }
}

export async function uploadImages(formData): Promise<ApiResponse<string[]>> {
  try {
    if (formData.entries().next().done) {
      return {success: true, data: []};
    }
    console.log(formData);
    const data = await fetcher(`${apiUrl}/upload/images`, {
      method: 'POST',
      body: formData,
    });

    return {success: true, data: data};
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    return {success: false, error: error};
  }
}


export async function getAllCategories(): Promise<ApiResponse<Product[]>> {
  try {
    // const data = await fetcher(`${apiUrl}/categories`, {
    //   method: 'GET',
    // });
    const data = await fetch(`${apiUrl}/categories`, {
      method: 'GET',
    });

    return {success: true, data: data};
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    return {success: false, error: error};
  }
}
