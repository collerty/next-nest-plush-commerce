import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {cookies} from "next/headers";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // console.log("middleware");
  // console.log(request.cookies.getAll());
  // return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
  matcher: '/((?!api|_next|static|public|favicon.ico).*)'
}