import { NextRequest, NextResponse } from "next/server";
import { createGoHostBooking } from "@/lib/gohost";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      checkIn,
      checkOut,
      roomTypeId,
      ratePlanId,
      adults = 1,
      children = 0,
      customer,
      notes,
      estimatedPrice,
      daysBreakdown,
      autoCancel,
    } = body;

    if (!checkIn || !checkOut) {
      return NextResponse.json(
        { success: false, error: "Vui lòng chọn ngày nhận phòng và ngày trả phòng." },
        { status: 400 }
      );
    }

    if (!roomTypeId) {
      return NextResponse.json(
        { success: false, error: "Vui lòng chọn loại phòng." },
        { status: 400 }
      );
    }

    if (!customer?.name || !customer.name.trim()) {
      return NextResponse.json(
        { success: false, error: "Vui lòng cung cấp họ và tên khách hàng." },
        { status: 400 }
      );
    }

    if (!customer?.phone && !customer?.email) {
      return NextResponse.json(
        { success: false, error: "Vui lòng cung cấp ít nhất số điện thoại hoặc email liên hệ." },
        { status: 400 }
      );
    }

    const bookingResult = await createGoHostBooking({
      checkIn,
      checkOut,
      roomTypeId,
      ratePlanId,
      adults: Number(adults) || 1,
      children: Number(children) || 0,
      customer,
      notes,
      estimatedPrice,
      daysBreakdown,
      autoCancel: autoCancel ?? false,
    });

    return NextResponse.json({
      success: true,
      data: bookingResult,
    });
  } catch (error: any) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Đặt phòng không thành công. Vui lòng liên hệ hotline khách sạn.",
      },
      { status: 500 }
    );
  }
}
