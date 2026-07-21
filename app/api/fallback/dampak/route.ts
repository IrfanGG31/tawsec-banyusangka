import { NextResponse } from "next/server";
import dampakData from "@/data/dampak.json";

export async function GET() {
  return NextResponse.json(dampakData);
}
