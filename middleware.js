import { NextResponse } from "next/server";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { PROD_URL, UI_URL } from "./utils/constants";
import { jwtVerify } from "jose";
const builderRoute = ["/property","/dashboard", "/projectInquiry", "/profile"];
export const config = {
  matcher: [
    "/property",
    "/projectInquiry",
    "/dashboard",
    "/amenity/:path*",
    "/users",
    "/reviewProperty/:path*",
    "/project/:path*",
    "/feature/:path*",
    "/builder/:path*",
    "/banner/:path*",
    "/testiMonials/:path*",
    "/faq/:path*",
    "/profile",
  ],
};

const navUrl = process.env.NODE_ENV == "development" ? UI_URL : PROD_URL;
export default async function middleware(req) {

  try {
    const token = req.cookies.get("token");
    const roleData = req.cookies.get("roles") ?? "";

    if (!token) {
      return NextResponse.redirect(`${navUrl}/login`);
    }

    const cleanedToken = token.value.replace(/"/g, "");
    const jwtRes = await jwtVerify(
      cleanedToken,
      new TextEncoder().encode('WinterIsComingGOT2019')
    );
    if (!jwtRes?.payload?._id) {
      return NextResponse.redirect(`${navUrl}/login`);
    }
    if (
      roleData?.value?.includes("Developer") &&
      !builderRoute?.includes(req.nextUrl.pathname)
    ) {
      return NextResponse.redirect(`${navUrl}/dashboard`);
    }
    return NextResponse.next();
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.redirect(`${navUrl}/login`);
  }
}