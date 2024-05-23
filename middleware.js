import { NextResponse } from "next/server";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { PROD_URL, UI_URL } from "./utils/constants";
const adminRoute = ['/amenity']
export const config = {
  matcher: [

    // "/dashboard",
    // ...adminRoute

  ],
};
const navUrl = process.env.NODE_ENV == 'development' ? UI_URL : PROD_URL
export default async function middleware(req) {


  try {
    const token = req.cookies.get("token");
    const roleData = req.cookies.get("roles") ?? '';

    if (!token) {

      return NextResponse.redirect(`${navUrl}/login`);
    }
    const cleanedToken = token.value.replace(/"/g, '');
    const isValid = await jwt.verify(cleanedToken, process.env.JWT);


    if (!isValid) {

      return NextResponse.redirect(`${navUrl}/login`);
    }
    if (roleData.value?.includes('Developer') && adminRoute.includes(req.nextUrl.pathname)) {

      return NextResponse.redirect(`${navUrl}/dashboard`);
    }
    return NextResponse.next();
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.redirect(`${navUrl}/login`);
  }
}
