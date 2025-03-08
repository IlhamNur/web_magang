'use server'
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

export const handleLogin = async (email: string, password: string) => {
  // console.log(email, password);
  const response = await fetch(`${process.env.API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (!response.ok) {
    console.log(await response.text());
    throw new Error('Login failed');
  }

  const data = await response.json();
  // console.log(data);
  // Set the token in an HTTP-only cookie
  cookies().set('token', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  })


  const decodedToken: any = jwtDecode(data.token);

  const role = decodedToken.role;

  // console.log(role);
  return role;

};

export async function logout() {
  // Destroy the session
  cookies().set("token", "", { expires: new Date(0) });
}