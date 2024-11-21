"use server";

const url = process.env.NEXT_PUBLIC_API_URL;

export async function login(body: any) {
  const res = await fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Ensures the server knows the body is JSON
    },
    body: JSON.stringify(body) // Serialize the body to JSON format
  });
  console.log(body);
  const data = await res.json();
  console.log(data);
  return data;
}
