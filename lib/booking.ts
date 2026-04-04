// ── Booking Configuration ──────────────────────────────────────────────────────
export const BOOKING_CONFIG = {
  baseUrl:  "https://booking.ezcms.vn/hotel/BeDetailHotel?hotel_code=C4D908",
  lang:     "vi",
  currency: "VND",
} as const;

// ── Types ──────────────────────────────────────────────────────────────────────
export interface BookingParams {
  checkIn:    string; // YYYY-MM-DD
  checkOut:   string; // YYYY-MM-DD
  rooms:      number;
  adults:     number;
  children:   number;
}

export type BookingValidationError =
  | "CHECK_IN_REQUIRED"
  | "CHECK_OUT_REQUIRED"
  | "CHECK_IN_PAST"
  | "CHECK_OUT_NOT_AFTER_CHECK_IN"
  | "MIN_ROOMS"
  | "MIN_ADULTS";

// ── Validation ─────────────────────────────────────────────────────────────────
export function validateBooking(params: BookingParams): BookingValidationError | null {
  const today = new Date().toISOString().split("T")[0];

  if (!params.checkIn)  return "CHECK_IN_REQUIRED";
  if (!params.checkOut) return "CHECK_OUT_REQUIRED";
  if (params.checkIn < today)          return "CHECK_IN_PAST";
  if (params.checkOut <= params.checkIn) return "CHECK_OUT_NOT_AFTER_CHECK_IN";
  if (params.rooms  < 1) return "MIN_ROOMS";
  if (params.adults < 1) return "MIN_ADULTS";

  return null;
}

// ── URL Builder ────────────────────────────────────────────────────────────────
export function buildBookingUrl(params: BookingParams): string {
  const searchParams = new URLSearchParams({
    check_in:        params.checkIn,
    check_out:       params.checkOut,
    num_of_rooms:    String(params.rooms),
    num_of_adults:   String(params.adults),
    num_of_children: String(params.children),
    lang:            BOOKING_CONFIG.lang,
    currency:        BOOKING_CONFIG.currency,
  });

  return `${BOOKING_CONFIG.baseUrl}&${searchParams.toString()}`;
}

// ── Main Action ────────────────────────────────────────────────────────────────
// Returns validation error key or null (and opens booking tab on success)
export function redirectToBooking(
  params: BookingParams
): BookingValidationError | null {
  const error = validateBooking(params);
  if (error) return error;

  const url = buildBookingUrl(params);
  window.open(url, "_blank", "noopener,noreferrer");
  return null;
}
