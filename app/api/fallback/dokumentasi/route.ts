import { NextResponse } from "next/server";
import dokumentasiData from "@/data/dokumentasi.json";

export async function GET() {
  return NextResponse.json(dokumentasiData);
}
