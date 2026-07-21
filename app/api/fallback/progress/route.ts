import { NextResponse } from "next/server";
import progressData from "@/data/progress-fallback.json";

export async function GET() {
  return NextResponse.json(progressData);
}
