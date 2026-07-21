import { NextResponse } from "next/server";
import updatesData from "@/data/updates.json";

export async function GET() {
  return NextResponse.json(updatesData);
}
