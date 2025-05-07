import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/actions/auth.action";

export async function GET() {
    const user = await getCurrentUser(); // This reads the HttpOnly cookie
    return NextResponse.json(Boolean(user));
}