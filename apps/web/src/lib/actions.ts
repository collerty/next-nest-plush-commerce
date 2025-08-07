"use server";

import {fetcher} from "@/lib/fetcher";
import {apiUrl} from "@/lib/api-url";
import {clearAuthTokens, getAuthTokens, setAuthTokens} from "@/lib/auth-tokens";
import {AddProductDTO, CheckoutSession, Order, Product, User} from "@/lib/types";
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
    // let redirectPath: string | null = null;

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

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

export async function getProductById(id: string): Promise<ApiResponse<Product>> {
    await sleep(4000);
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
        // await sleep(5000);
        const data = await fetcher(`${apiUrl}/products/user`, {
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
        body.price = Number(body.price);
        if (isNaN(body.price)) {
            throw new Error("Price is NaN")
        }
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

export async function updateProduct(body: Partial<AddProductDTO>, productId: number): Promise<ApiResponse<Product>> {
    try {
        console.log("editing product", {body});
        body.price = Number(body.price);
        if (isNaN(body.price)) {
            throw new Error("Price is NaN")
        }
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


export async function deleteProduct(id: number) {
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

export async function uploadImages(formData: FormData): Promise<ApiResponse<string[]>> {
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
        const response = await fetch(`${apiUrl}/categories`, {
            method: 'GET',
        });
        const data = await response.json();
        return {success: true, data: data};
        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
        return {success: false, error: error};
    }
}

export async function getProductCountByCategoryId(categoryId: number): Promise<ApiResponse<number>> {
    try {
        // await sleep(2000);
        const data = await fetcher(`${apiUrl}/products/category/count/${categoryId}`, {
            method: 'GET',
        });
        return {success: true, data: data};
        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
        return {success: false, error: error};
    }
}

export async function getAllProductsByCategory(categorySlug: string): Promise<ApiResponse<Product[]>> {
    try {
        await sleep(2000);
        const data = await fetcher(`${apiUrl}/products/category/slug/${categorySlug}`, {
            method: 'GET',
        });
        return {success: true, data: data};
        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
        return {success: false, error: error};
    }
}

export async function createCheckoutSession(items: {
    productId: number;
    quantity: number
}[], customerEmail: string): Promise<ApiResponse<CheckoutSession>> {
    try {
        const response = await fetch(`${apiUrl}/stripe/checkout`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({items, customerEmail}),
        });

        const data = await response.json();

        return {success: true, data: data};
        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
        return {success: false, error: error};
    }
}

export async function getAllProfileOrders(): Promise<ApiResponse<Order[]>> {
    try {
        const data = await fetcher(`${apiUrl}/orders`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });

        return {success: true, data: data};
        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
        return {success: false, error: error};
    }
}


export async function getOrder(id: string): Promise<ApiResponse<Order>> {
    try {
        const data = await fetcher(`${apiUrl}/orders/${id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });

        return {success: true, data: data};
        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
        return {success: false, error: error};
    }
}