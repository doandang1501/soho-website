/**
 * GoHost PMS API Integration Service
 * Runs server-side (Vercel Serverless Functions / Route Handlers)
 */

export const GOHOST_CONFIG = {
  baseUrl: process.env.GOHOST_API_BASE_URL || "https://platform.gohost.vn/pms/api/public/v1",
  apiKey: process.env.GOHOST_API_KEY || "",
  apiSecret: process.env.GOHOST_API_SECRET || "",
  propertyId: process.env.GOHOST_PROPERTY_ID || "319b2a80-91a1-4ba6-9345-98aa3d03182d",
  bookingSource: process.env.GOHOST_DEFAULT_BOOKING_SOURCE || "website",
};

export interface GoHostRoomMeta {
  key: "studio" | "twobed" | "threebed";
  nameVi: string;
  nameEn: string;
  nameZh: string;
  image: string;
  gallery: string[];
  detailHref: string;
  maxOccupancy: number;
}

export const ROOM_METADATA_MAP: Record<string, GoHostRoomMeta> = {
  "14f423dc-cd6a-4c0a-a43f-4643ef3f1b87": {
    key: "studio",
    nameVi: "Studio Căn Hộ",
    nameEn: "Studio Apartment",
    nameZh: "单间公寓",
    image: "/images/type_1.jpg",
    gallery: ["/images/studio-1.jpg", "/images/studio-2.jpg", "/images/studio-3.jpg"],
    detailHref: "/studio",
    maxOccupancy: 3,
  },
  "112eec22-8d8c-40ee-bfc6-ccc6aa967b4b": {
    key: "twobed",
    nameVi: "Căn Hộ 2 Phòng Ngủ",
    nameEn: "2-Bedroom Apartment",
    nameZh: "两居室公寓",
    image: "/images/type_2.jpg",
    gallery: ["/images/2bed-1.jpg", "/images/2bed-2.jpg", "/images/2bed-3.jpg"],
    detailHref: "/2-bedroom",
    maxOccupancy: 6,
  },
  "00a9103a-3daf-4926-9313-d2c908d05be6": {
    key: "threebed",
    nameVi: "Căn Hộ 3 Phòng Ngủ",
    nameEn: "3-Bedroom Apartment",
    nameZh: "三居室公寓",
    image: "/images/type_3.jpg",
    gallery: ["/images/img_1.jpg", "/images/img_2.jpg", "/images/img_3.jpg"],
    detailHref: "/3-bedroom",
    maxOccupancy: 8,
  },
};

export interface DayBreakdown {
  day: string;
  price: number;
}

export interface RatePlan {
  id: string;
  is_default: boolean;
  title: string;
  currency: string;
  sell_mode: string;
  has_breakfast: boolean;
  days_breakdown: DayBreakdown[];
  estimated_total_price: number;
}

export interface AvailableRoomType {
  id: string;
  title: string;
  quantity: number;
  occ_adults: number;
  occ_children: number;
  occ_infants: number;
  rate_plans: RatePlan[];
  meta?: GoHostRoomMeta;
}

export interface CheckAvailabilityParams {
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  adults?: number;
  children?: number;
}

export interface CustomerPayload {
  name: string;
  phone?: string;
  email?: string;
}

export interface CreateBookingParams {
  checkIn: string;
  checkOut: string;
  roomTypeId: string;
  ratePlanId?: string;
  adults: number;
  children?: number;
  customer: CustomerPayload;
  notes?: string;
  estimatedPrice?: number;
  daysBreakdown?: DayBreakdown[];
}

function getAuthHeader(): string {
  const key = GOHOST_CONFIG.apiKey;
  const secret = GOHOST_CONFIG.apiSecret;
  return `Bearer ${key}:${secret}`;
}

/**
 * Fetch available room types and dynamic rates from GoHost PMS
 */
export async function fetchRoomAvailability(params: CheckAvailabilityParams): Promise<AvailableRoomType[]> {
  const { checkIn, checkOut, adults = 1, children = 0 } = params;

  const searchParams = new URLSearchParams({
    checkin_date: checkIn,
    checkout_date: checkOut,
    occupancy_adults: String(adults),
  });

  if (children > 0) {
    searchParams.append("occupancy_children", String(children));
  }

  const url = `${GOHOST_CONFIG.baseUrl}/properties/${GOHOST_CONFIG.propertyId}/room_types/search?${searchParams.toString()}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: getAuthHeader(),
      Accept: "application/json",
      "User-Agent": "Soho-Website/1.0",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`GoHost Availability API error: ${res.status} - ${errorText}`);
  }

  const json = await res.json();
  const rawList = json.data || [];

  return rawList
    .map((item: { room_types: AvailableRoomType }) => {
      const room = item.room_types;
      return {
        ...room,
        meta: ROOM_METADATA_MAP[room.id] || {
          key: "studio",
          nameVi: room.title,
          nameEn: room.title,
          nameZh: room.title,
          image: "/images/type_1.jpg",
          gallery: [],
          detailHref: "/rooms",
          maxOccupancy: room.occ_adults,
        },
      };
    })
    .filter((room: AvailableRoomType) => room.quantity > 0);
}

/**
 * Create a new booking directly on GoHost PMS
 */
export async function createGoHostBooking(params: CreateBookingParams) {
  const {
    checkIn,
    checkOut,
    roomTypeId,
    ratePlanId,
    adults,
    children = 0,
    customer,
    notes,
    estimatedPrice,
    daysBreakdown,
  } = params;

  const url = `${GOHOST_CONFIG.baseUrl}/properties/${GOHOST_CONFIG.propertyId}/bookings`;

  const bookingRoomsPayload: any = {
    room_type_id: roomTypeId,
  };

  if (ratePlanId) {
    bookingRoomsPayload.rate_plan_id = ratePlanId;
  }
  if (estimatedPrice) {
    bookingRoomsPayload.default_rate = estimatedPrice;
  }
  if (daysBreakdown && daysBreakdown.length > 0) {
    bookingRoomsPayload.days_breakdown = daysBreakdown;
  }

  const payload = {
    checkin_date: checkIn,
    checkout_date: checkOut,
    source_name: GOHOST_CONFIG.bookingSource,
    customer: {
      name: customer.name.trim(),
      phone: customer.phone ? customer.phone.trim() : null,
      email: customer.email ? customer.email.trim() : null,
    },
    booking_rooms: [bookingRoomsPayload],
    occupancy_adults: adults,
    occupancy_children: children,
    payment_collect: "property",
    auto_cancel: true,
    currency: "VND",
    notes: notes ? notes.trim() : "Đặt phòng trực tiếp từ website SOHO (Thanh toán tại quầy)",
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "Soho-Website/1.0",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const responseBody = await res.json().catch(() => null);

  if (!res.ok) {
    const errorMsg =
      responseBody?.message ||
      (responseBody?.errors ? JSON.stringify(responseBody.errors) : `HTTP ${res.status}`);
    throw new Error(errorMsg);
  }

  return responseBody.data;
}
