import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("🔥 Logout route hit!");

    // Create a NextResponse object
    const response = NextResponse.json({
      message: "Logged out successfully",
    });

    // Clear the cookie
    response.cookies.set({
      name: "token",
      value: "",
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // use "none" if cross-site requests are needed
      expires: new Date(0), // expire immediately
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
