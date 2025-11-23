import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("🔥 Logout route hit!");

    
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
      sameSite: "lax", 
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
