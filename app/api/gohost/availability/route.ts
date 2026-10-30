import { NextRequest, NextResponse } from "next/server";
import { fetchRoomAvailability } from "@/lib/gohost";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const adults = parseInt(searchParams.get("adults") || "1", 10);
    const children = parseInt(searchParams.get("children") || "0", 10);

    if (!checkIn || !checkOut) {
      return NextResponse.json(
        { success: false, error: "Vui lòng chọn ngày nhận phòng và ngày trả phòng." },
        { status: 400 }
      );
    }

    if (checkOut <= checkIn) {
      return NextResponse.json(
        { success: false, error: "Ngày trả phòng phải sau ngày nhận phòng." },
        { status: 400 }
      );
    }

    const availableRooms = await fetchRoomAvailability({
      checkIn,
      checkOut,
      adults: isNaN(adults) || adults < 1 ? 1 : adults,
      children: isNaN(children) || children < 0 ? 0 : children,
    });

    return NextResponse.json({
      success: true,
      data: availableRooms,
    });
  } catch (error: any) {
    console.error("Error in availability API:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Không thể kiểm tra phòng trống lúc này. Vui lòng thử lại sau.",
      },
      { status: 500 }
    );
  }
}
