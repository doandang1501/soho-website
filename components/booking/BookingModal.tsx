"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import type { AvailableRoomType } from "@/lib/gohost";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchParams: {
    checkIn: string;
    checkOut: string;
    rooms: number;
    adults: number;
    children: number;
    preselectedRoomKey?: string;
  };
}

export default function BookingModal({
  isOpen,
  onClose,
  searchParams,
}: BookingModalProps) {
  const t = useTranslations("booking");
  const locale = useLocale();

  const [step, setStep] = useState<"loading" | "select_room" | "guest_form" | "submitting" | "success" | "error">("loading");
  const [rooms, setRooms] = useState<AvailableRoomType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<AvailableRoomType | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [createdBooking, setCreatedBooking] = useState<any>(null);

  // Guest form fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState("");

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " VNĐ";
  };

  const calculateNights = (inDate: string, outDate: string) => {
    if (!inDate || !outDate) return 1;
    const diff = new Date(outDate).getTime() - new Date(inDate).getTime();
    return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
  };

  const nights = calculateNights(searchParams.checkIn, searchParams.checkOut);

  // Fetch rooms whenever modal opens or searchParams change
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setStep("loading");
    setErrorMessage("");
    setSelectedRoom(null);
    setCreatedBooking(null);

    const fetchAvailability = async () => {
      try {
        const query = new URLSearchParams({
          checkIn: searchParams.checkIn,
          checkOut: searchParams.checkOut,
          adults: String(searchParams.adults),
          children: String(searchParams.children),
        });

        const res = await fetch(`/api/gohost/availability?${query.toString()}`);
        const data = await res.json();

        if (!isMounted) return;

        if (!data.success) {
          setErrorMessage(data.error || t("noRooms"));
          setStep("error");
          return;
        }

        const roomList: AvailableRoomType[] = data.data || [];
        setRooms(roomList);

        if (roomList.length === 0) {
          setStep("select_room");
          return;
        }

        // If preselected, select it
        if (searchParams.preselectedRoomKey) {
          const match = roomList.find((r) => r.meta?.key === searchParams.preselectedRoomKey);
          if (match) {
            setSelectedRoom(match);
            setStep("guest_form");
            return;
          }
        }

        setStep("select_room");
      } catch (err: any) {
        if (!isMounted) return;
        setErrorMessage(err.message || "Failed to load room availability");
        setStep("error");
      }
    };

    fetchAvailability();

    return () => {
      isMounted = false;
    };
  }, [isOpen, searchParams]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSelectRoom = (room: AvailableRoomType) => {
    setSelectedRoom(room);
    setFormError("");
    setStep("guest_form");
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;

    if (!fullName.trim()) {
      setFormError("Vui lòng nhập họ và tên.");
      return;
    }
    if (!phone.trim()) {
      setFormError("Vui lòng nhập số điện thoại để lễ tân liên hệ xác nhận.");
      return;
    }

    setStep("submitting");
    setFormError("");

    try {
      const defaultRatePlan = selectedRoom.rate_plans?.[0];
      const payload = {
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        roomTypeId: selectedRoom.id,
        ratePlanId: defaultRatePlan?.id,
        adults: searchParams.adults,
        children: searchParams.children,
        customer: {
          name: fullName.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
        },
        notes: notes.trim() || undefined,
        estimatedPrice: defaultRatePlan?.estimated_total_price,
        daysBreakdown: defaultRatePlan?.days_breakdown,
      };

      const res = await fetch("/api/gohost/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        setErrorMessage(data.error || "Đặt phòng không thành công. Vui lòng thử lại.");
        setStep("error");
        return;
      }

      setCreatedBooking(data.data);
      setStep("success");
    } catch (err: any) {
      setErrorMessage(err.message || "Lỗi kết nối khi gửi thông tin đặt phòng.");
      setStep("error");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="
            relative w-full max-w-3xl max-h-[90vh] overflow-y-auto
            bg-[#121212] border border-[var(--color-border)]
            shadow-[0_20px_60px_rgba(0,0,0,0.8)]
            z-10 flex flex-col my-auto
          "
        >
          {/* Top Gold Corner Accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[var(--color-gold)] pointer-events-none z-20" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[var(--color-gold)] pointer-events-none z-20" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[var(--color-gold)] pointer-events-none z-20" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[var(--color-gold)] pointer-events-none z-20" />

          {/* Modal Header */}
          <div className="sticky top-0 bg-[#121212]/95 backdrop-blur-md border-b border-[var(--color-border)] px-6 py-5 flex items-center justify-between z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="block w-4 h-px bg-[var(--color-gold)]" />
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold)]">
                  SOHO Residence & Hotel
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-[var(--color-ivory)]">
                {t("modalTitle")}
              </h2>
              {/* Summary date bar */}
              <p className="font-sans text-xs text-[var(--color-ivory-dim)] mt-0.5">
                📅 {searchParams.checkIn} → {searchParams.checkOut} ({nights} {nights > 1 ? t("nights") : t("night")}) • 👤 {searchParams.adults} {t("adults")} {searchParams.children > 0 ? `• ${searchParams.children} ${t("children")}` : ""}
              </p>
            </div>

            <button
              onClick={onClose}
              className="
                w-9 h-9 rounded-full border border-[var(--color-border)]
                text-[var(--color-ivory)] flex items-center justify-center
                hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]
                transition-all duration-200 active:scale-90
              "
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {/* ── State 1: Loading ── */}
            {step === "loading" && (
              <div className="py-16 flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-10 h-10 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin" />
                <p className="font-sans text-sm text-[var(--color-ivory-dim)]">
                  {t("searching")}
                </p>
              </div>
            )}

            {/* ── State 2: Select Room ── */}
            {step === "select_room" && (
              <div>
                {rooms.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="font-sans text-sm text-[var(--color-ivory-dim)] mb-6 max-w-md mx-auto leading-relaxed">
                      {t("noRooms")}
                    </p>
                    <button
                      onClick={onClose}
                      className="
                        border border-[var(--color-gold)] text-[var(--color-gold)]
                        px-6 py-2.5 text-xs font-sans tracking-[0.15em] uppercase
                        hover:bg-[var(--color-gold)] hover:text-[var(--color-charcoal)]
                        transition-colors duration-200
                      "
                    >
                      {t("close")}
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {rooms.map((room) => {
                      const ratePlan = room.rate_plans?.[0];
                      const totalEstimated = ratePlan?.estimated_total_price || 0;
                      const avgPerNight = Math.round(totalEstimated / nights);

                      return (
                        <div
                          key={room.id}
                          className="
                            border border-[var(--color-border)] bg-[var(--color-charcoal-50)]
                            p-4 sm:p-5 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between
                            hover:border-[var(--color-gold)]/60 transition-all duration-300
                          "
                        >
                          {/* Room image & info */}
                          <div className="flex gap-4 items-center">
                            <div className="relative w-24 h-20 sm:w-28 sm:h-24 shrink-0 overflow-hidden bg-black/40">
                              <Image
                                src={room.meta?.image || "/images/type_1.jpg"}
                                alt={room.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-serif text-lg text-[var(--color-ivory)]">
                                {locale === "vi"
                                  ? room.meta?.nameVi || room.title
                                  : locale === "zh"
                                  ? room.meta?.nameZh || room.title
                                  : room.meta?.nameEn || room.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-2 mt-1.5 font-sans text-xs text-[var(--color-ivory-dim)]">
                                <span className="border border-[var(--color-border)] px-2 py-0.5">
                                  {t("maxGuests", { count: room.occ_adults })}
                                </span>
                                <span className="border border-[var(--color-gold)]/40 text-[var(--color-gold)] px-2 py-0.5">
                                  {t("roomAvailable", { count: room.quantity })}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Price & Action */}
                          <div className="w-full md:w-auto flex items-center justify-between md:flex-col md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[var(--color-border)]">
                            <div className="text-left md:text-right">
                              <span className="font-serif text-lg sm:text-xl text-[var(--color-gold)] font-medium block">
                                {formatPrice(totalEstimated)}
                              </span>
                              <span className="font-sans text-[11px] text-[var(--color-ivory-dim)] block">
                                ~{formatPrice(avgPerNight)} {t("perNight")} • {nights} {t("nights")}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleSelectRoom(room)}
                              className="
                                bg-[var(--color-gold)] text-[var(--color-charcoal)]
                                font-sans font-semibold text-xs tracking-[0.15em] uppercase
                                px-6 py-2.5 transition-all duration-300
                                hover:bg-[var(--color-gold-light)] hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]
                                active:scale-95 shrink-0
                              "
                            >
                              {t("selectRoom")} →
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ── State 3: Guest Information Form ── */}
            {step === "guest_form" && selectedRoom && (
              <div>
                {/* Back button */}
                <button
                  type="button"
                  onClick={() => setStep("select_room")}
                  className="font-sans text-xs text-[var(--color-gold)] hover:underline mb-4 inline-flex items-center gap-1.5"
                >
                  ← {t("changeRoom")}
                </button>

                {/* Selected Room Summary Card */}
                <div className="border border-[var(--color-gold)]/40 bg-[var(--color-charcoal-50)] p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-[var(--color-gold)] block">
                      Phòng đã chọn
                    </span>
                    <h4 className="font-serif text-base text-[var(--color-ivory)]">
                      {locale === "vi"
                        ? selectedRoom.meta?.nameVi || selectedRoom.title
                        : locale === "zh"
                        ? selectedRoom.meta?.nameZh || selectedRoom.title
                        : selectedRoom.meta?.nameEn || selectedRoom.title}
                    </h4>
                    <p className="font-sans text-xs text-[var(--color-ivory-dim)] mt-0.5">
                      {searchParams.checkIn} → {searchParams.checkOut} ({nights} {t("nights")})
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-[var(--color-ivory-dim)] block">
                      {t("totalEstimated")}
                    </span>
                    <span className="font-serif text-lg text-[var(--color-gold)] font-medium">
                      {formatPrice(selectedRoom.rate_plans?.[0]?.estimated_total_price || 0)}
                    </span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmitBooking} className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-serif text-lg text-[var(--color-ivory)] mb-1">
                      {t("guestInfoTitle")}
                    </h3>
                    <p className="font-sans text-xs text-[var(--color-ivory-dim)] mb-4">
                      {t("guestInfoSubtitle")}
                    </p>
                  </div>

                  {formError && (
                    <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 font-sans text-xs">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs text-[var(--color-ivory-dim)] mb-1.5">
                        {t("fullName")}
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t("fullNamePlaceholder")}
                        className="
                          w-full bg-[var(--color-charcoal-50)] border border-[var(--color-border)]
                          text-[var(--color-ivory)] px-3.5 py-2.5 font-sans text-sm
                          focus:border-[var(--color-gold)] focus:outline-none transition-colors
                        "
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-xs text-[var(--color-ivory-dim)] mb-1.5">
                        {t("phone")}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t("phonePlaceholder")}
                        className="
                          w-full bg-[var(--color-charcoal-50)] border border-[var(--color-border)]
                          text-[var(--color-ivory)] px-3.5 py-2.5 font-sans text-sm
                          focus:border-[var(--color-gold)] focus:outline-none transition-colors
                        "
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs text-[var(--color-ivory-dim)] mb-1.5">
                      {t("email")}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("emailPlaceholder")}
                      className="
                        w-full bg-[var(--color-charcoal-50)] border border-[var(--color-border)]
                        text-[var(--color-ivory)] px-3.5 py-2.5 font-sans text-sm
                        focus:border-[var(--color-gold)] focus:outline-none transition-colors
                      "
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs text-[var(--color-ivory-dim)] mb-1.5">
                      {t("notes")}
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t("notesPlaceholder")}
                      className="
                        w-full bg-[var(--color-charcoal-50)] border border-[var(--color-border)]
                        text-[var(--color-ivory)] px-3.5 py-2 font-sans text-sm
                        focus:border-[var(--color-gold)] focus:outline-none transition-colors resize-none
                      "
                    />
                  </div>

                  {/* Payment notice badge */}
                  <div className="border border-[var(--color-border)] bg-[#1a1a1a] p-3.5 flex items-start gap-3 my-1">
                    <span className="text-lg">💳</span>
                    <div>
                      <span className="font-sans text-xs font-semibold text-[var(--color-gold)] block">
                        {t("payAtProperty")}
                      </span>
                      <p className="font-sans text-[11px] text-[var(--color-ivory-dim)] leading-relaxed mt-0.5">
                        {t("payAtPropertyNotice")}
                      </p>
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="
                        w-full bg-[var(--color-gold)] text-[var(--color-charcoal)]
                        font-sans font-semibold text-xs tracking-[0.18em] uppercase
                        py-3.5 transition-all duration-300
                        hover:bg-[var(--color-gold-light)] hover:shadow-gold
                        active:scale-[0.98]
                      "
                    >
                      {t("confirmBooking")}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── State 4: Submitting ── */}
            {step === "submitting" && (
              <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-12 h-12 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin" />
                <p className="font-serif text-lg text-[var(--color-ivory)]">
                  {t("processing")}
                </p>
                <p className="font-sans text-xs text-[var(--color-ivory-dim)]">
                  Vui lòng không đóng trình duyệt...
                </p>
              </div>
            )}

            {/* ── State 5: Booking Success ── */}
            {step === "success" && (
              <div className="py-6 text-center flex flex-col items-center">
                {/* Checkmark icon */}
                <div className="w-16 h-16 rounded-full border-2 border-[var(--color-gold)] flex items-center justify-center text-3xl text-[var(--color-gold)] mb-4">
                  ✓
                </div>

                <h3 className="font-serif text-2xl text-[var(--color-ivory)] mb-2">
                  {t("bookingSuccess")}
                </h3>
                <p className="font-sans text-xs text-[var(--color-ivory-dim)] max-w-md mx-auto mb-6">
                  {t("bookingSuccessSub")}
                </p>

                {/* Booking Code Banner */}
                {createdBooking?.id && (
                  <div className="border border-[var(--color-gold)] bg-[var(--color-charcoal-50)] px-6 py-4 mb-6 inline-block">
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ivory-dim)] block mb-1">
                      {t("bookingCode")}
                    </span>
                    <span className="font-mono text-xl sm:text-2xl text-[var(--color-gold)] font-bold tracking-wider">
                      {createdBooking.id.slice(0, 8).toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Details summary box */}
                <div className="w-full border border-[var(--color-border)] bg-[#171717] p-4 text-left font-sans text-xs mb-6 flex flex-col gap-2">
                  <div className="flex justify-between py-1 border-b border-[var(--color-border)]">
                    <span className="text-[var(--color-ivory-dim)]">Khách sạn:</span>
                    <span className="text-[var(--color-ivory)] font-medium">SOHO Residence & Hotel (100 Cô Giang, Q1, TP.HCM)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--color-border)]">
                    <span className="text-[var(--color-ivory-dim)]">Khách hàng:</span>
                    <span className="text-[var(--color-ivory)] font-medium">{fullName} ({phone})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--color-border)]">
                    <span className="text-[var(--color-ivory-dim)]">Lịch lưu trú:</span>
                    <span className="text-[var(--color-ivory)] font-medium">{searchParams.checkIn} → {searchParams.checkOut} ({nights} {t("nights")})</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[var(--color-ivory-dim)]">Thanh toán khi nhận phòng:</span>
                    <span className="text-[var(--color-gold)] font-medium">
                      {formatPrice(selectedRoom?.rate_plans?.[0]?.estimated_total_price || 0)}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[var(--color-charcoal-50)] border border-[var(--color-border)] text-left font-sans text-xs text-[var(--color-ivory-dim)] mb-6 flex items-start gap-2.5">
                  <span className="text-[var(--color-gold)] text-sm">ℹ️</span>
                  <div>
                    <p className="text-[var(--color-ivory)] font-medium mb-0.5">
                      {t("receptionCall")}
                    </p>
                    <p>{t("checkInNotice")} • {t("checkOutNotice")}</p>
                    <p className="mt-1">{t("supportHotline")} <span className="text-[var(--color-gold)] font-semibold">(+84) 91 771 9966</span></p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="
                    bg-[var(--color-gold)] text-[var(--color-charcoal)]
                    font-sans font-semibold text-xs tracking-[0.18em] uppercase
                    px-10 py-3.5 transition-all duration-300
                    hover:bg-[var(--color-gold-light)] active:scale-95
                  "
                >
                  {t("close")}
                </button>
              </div>
            )}

            {/* ── State 6: Error ── */}
            {step === "error" && (
              <div className="py-12 text-center">
                <div className="w-12 h-12 rounded-full border border-red-500/40 text-red-400 flex items-center justify-center text-xl mx-auto mb-4">
                  ✕
                </div>
                <h3 className="font-serif text-lg text-red-400 mb-2">
                  Đã có lỗi xảy ra
                </h3>
                <p className="font-sans text-xs text-[var(--color-ivory-dim)] max-w-md mx-auto mb-6">
                  {errorMessage || "Không thể hoàn thành yêu cầu. Vui lòng thử lại hoặc gọi hotline (+84) 91 771 9966."}
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setStep("select_room")}
                    className="
                      border border-[var(--color-border)] text-[var(--color-ivory)]
                      px-6 py-2.5 text-xs font-sans tracking-[0.15em] uppercase
                      hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]
                    "
                  >
                    {t("back")}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="
                      bg-[var(--color-gold)] text-[var(--color-charcoal)]
                      px-6 py-2.5 text-xs font-sans font-semibold tracking-[0.15em] uppercase
                      hover:bg-[var(--color-gold-light)]
                    "
                  >
                    {t("close")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
