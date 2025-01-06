import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {getAuthTokens} from "@/lib/auth-tokens";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  const {accessToken, refreshToken} = await getAuthTokens();
  console.log("middleware tokens", {accessToken, refreshToken});

  if (!refreshToken || !accessToken) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  try {



  } catch (err) {
    console.log(err)
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
}