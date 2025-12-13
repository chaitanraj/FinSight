import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getUserFromSession() {
  const token = cookies().get("token")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return {
      id: payload.id,
      name: payload.name,
    };
  } catch {
    return null;
  }
}
