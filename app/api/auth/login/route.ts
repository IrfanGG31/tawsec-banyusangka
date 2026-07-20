import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const envPassword = process.env.INTERNAL_DOC_PASSWORD || "tawsec2026";

    if (password !== envPassword) {
      return NextResponse.json(
        { error: "Password salah, silakan coba lagi." },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("tawsec_internal_auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
