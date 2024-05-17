import { NextResponse } from "next/server";
import jwt from "@tsndr/cloudflare-worker-jwt";

export const config = {
  matcher: [
       "/dashboard",
  ],
};

export default async function middleware(req) {
  console.log('Middleware function called');
  
  try {
    const token = req.cookies.get("token");
    const roleData = req.cookies.get("roles") ?? '';
    // const roles = JSON.parse(roleData)
    console.log('roleData', roleData.value);

    if (!token) {
      console.log('Token not found, redirecting to login page');
      return NextResponse.redirect(`http://localhost:3000/login`);
    }
    const cleanedToken = token.value.replace(/"/g, '');
    const isValid = await jwt.verify(cleanedToken, process.env.JWT);
    console.log('Token validation result:', process.env.JWT);

    if (!isValid ) {
      console.log('Invalid token, redirecting to login page');
      return NextResponse.redirect(`http://localhost:3000/login`);
    }

    console.log('Token is valid, allowing access to the route');
    return NextResponse.next();
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.redirect(`http://localhost:3000/login`);
  }
}
