"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import type { AvailableRoomType } from "@/lib/gohost";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const WISE_CURRENCIES = [
  {
    code: "SGD",
    name: "Đô la Singapore (SGD)",
    method: "FAST / PayNow",
    bank: "Wise Asia-Pacific Pte. Ltd.",
    accountNumber: "337-134-96",
    codeLabel: "Mã ngân hàng (Bank Code)",
    codeValue: "0516",
  },
  {
    code: "GBP",
    name: "Bảng Anh (GBP)",
    method: "Faster Payments",
    bank: "Wise Payments Limited",
    accountNumber: "67509291",
    codeLabel: "Sort Code",
    codeValue: "60-84-64",
  },
  {
    code: "CAD",
    name: "Đô la Canada (CAD)",
    method: "EFT",
    bank: "Wise Payments Canada Inc.",
    accountNumber: "104260989",
    codeLabel: "Institution / Branch",
    codeValue: "Institution: 705 | Branch: 00001",
  },
  {
    code: "PHP",
    name: "Peso Philippines (PHP)",
    method: "InstaPay",
    bank: "Wise Pilipinas Inc.",
    accountNumber: "2012265198",
    codeLabel: "BRSTN",
    codeValue: "01828-001-6",
  },
  {
    code: "NZD",
    name: "Đô la New Zealand (NZD)",
    method: "Local Bank Transfer",
    bank: "Wise Payments New Zealand Ltd.",
    accountNumber: "04-2021-0438828-89",
  },
  {
    code: "EUR",
    name: "Euro (EUR)",
    method: "SEPA Instant",
    bank: "Wise Europe SA",
    accountNumber: "BE73 9030 5992 7760",
    codeLabel: "IBAN",
    codeValue: "BE73 9030 5992 7760",
  },
];

// ── Copyable Field Component ──────────────────────────────────────────────────
function CopyableField({
  text,
  valueToCopy,
  label,
  className = "",
}: {
  text: string;
  valueToCopy?: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const toCopy = valueToCopy || text;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(toCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Bấm để sao chép"
      className={`
        group inline-flex items-center gap-1.5 px-2 py-0.5 rounded
        bg-[#f8f9fa] border border-[#dee2e6]
        hover:border-[#c99a2c] transition-all cursor-pointer text-left
        ${className}
      `}
    >
      <span className="font-mono text-[#1e2022] group-hover:text-[#c99a2c] font-semibold transition-colors select-all">
        {text}
      </span>
      {copied ? (
        <span className="text-[10px] text-emerald-600 font-sans font-semibold flex items-center gap-0.5 shrink-0">
          ✓ Đã chép
        </span>
      ) : (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--color-gold)] opacity-70 group-hover:opacity-100 shrink-0"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

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
  const [paymentMethod, setPaymentMethod] = useState<"property" | "wise" | "zelle">("property");
  const [selectedCurrency, setSelectedCurrency] = useState("SGD");
  const [formError, setFormError] = useState("");

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " VNĐ";
  };

  const calculateNights = (inDate: string, outDate: string) => {
    if (!inDate || !outDate) return 1;
    const start = new Date(inDate).getTime();
    const end = new Date(outDate).getTime();
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights(searchParams.checkIn, searchParams.checkOut);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setStep("loading");
    setErrorMessage("");
    setSelectedRoom(null);

    const fetchAvailability = async () => {
      try {
        const query = new URLSearchParams({
          checkIn: searchParams.checkIn,
          checkOut: searchParams.checkOut,
          adults: String(searchParams.adults || 1),
          children: String(searchParams.children || 0),
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
      const paymentNote = paymentMethod === "wise" 
        ? `[Phương thức TT: Wise (${selectedCurrency})]`
        : paymentMethod === "zelle"
        ? `[Phương thức TT: Zelle (USD)]`
        : `[Phương thức TT: Tại chỗ]`;

      const fullNotes = [notes.trim(), paymentNote].filter(Boolean).join(" - ");

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
        notes: fullNotes || undefined,
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

  const currentWiseInfo = WISE_CURRENCIES.find((c) => c.code === selectedCurrency) || WISE_CURRENCIES[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.28, ease: EASE }}
          className="
            relative w-full max-w-3xl max-h-[90vh] overflow-y-auto
            bg-white border border-[#e9ecef] rounded-2xl
            shadow-2xl z-10 text-[#1e2022]
          "
        >
          {/* Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-[#e9ecef] bg-white/95 backdrop-blur-sm">
            <div>
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#c99a2c] font-bold block">
                SOHO Residence & Hotel
              </span>
              <h2 className="font-serif text-xl sm:text-2xl text-[#1e2022]">
                {t("modalTitle")}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-[#dee2e6] flex items-center justify-center text-[#6c757d] hover:text-[#1e2022] hover:border-[#1e2022] transition-colors cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Search dates reminder strip */}
          <div className="px-6 py-3 bg-[#f8f9fa] border-b border-[#e9ecef] flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-[#495057]">
            <div className="flex items-center gap-3">
              <span className="text-[#c99a2c]">📅</span>
              <span>
                <strong>{searchParams.checkIn}</strong> → <strong>{searchParams.checkOut}</strong> ({nights} {t("nights")})
              </span>
              <span className="text-[#ced4da]">•</span>
              <span>
                {searchParams.adults} {t("adults")}{searchParams.children > 0 ? `, ${searchParams.children} ${t("children")}` : ""}
              </span>
            </div>
            {step === "guest_form" && (
              <button
                type="button"
                onClick={() => setStep("select_room")}
                className="text-[#c99a2c] font-semibold underline hover:text-[#a77b1b] cursor-pointer text-xs"
              >
                ← {t("changeRoom")}
              </button>
            )}
          </div>

          <div className="p-6">
            {/* ── State 1: Loading ── */}
            {step === "loading" && (
              <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-10 h-10 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin" />
                <p className="font-sans text-sm text-[#6c757d]">
                  {t("searching")}
                </p>
              </div>
            )}

            {/* ── State 2: Select Room ── */}
            {step === "select_room" && (
              <div>
                {rooms.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="font-sans text-sm text-[#6c757d] max-w-md mx-auto mb-6 leading-relaxed">
                      {t("noRooms")}
                    </p>
                    <a
                      href="tel:+84917719966"
                      className="inline-flex items-center gap-2 border border-[var(--color-gold)] text-[var(--color-gold)] px-6 py-2.5 font-sans text-xs uppercase tracking-wider hover:bg-[var(--color-gold)] hover:text-[var(--color-charcoal)] transition-colors"
                    >
                      Gọi Hotline: (+84) 91 771 9966
                    </a>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="font-sans text-xs uppercase tracking-wider text-[#6c757d] mb-2">
                      Chọn loại căn hộ phù hợp:
                    </p>
                    {rooms.map((room) => {
                      const rate = room.rate_plans?.[0];
                      const totalPrice = rate?.estimated_total_price || 0;
                      const pricePerNight = Math.round(totalPrice / nights);

                      return (
                        <div
                          key={room.id}
                          className="
                            border border-[#e9ecef] bg-[#f8f9fa]
                            p-4 sm:p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4
                            hover:border-[var(--color-gold)]/60 transition-all duration-300
                          "
                        >
                          <div className="flex gap-4 items-center">
                            <div className="relative w-24 h-20 sm:w-28 sm:h-24 shrink-0 overflow-hidden bg-black/40">
                              <Image
                                src={room.meta?.image || "/images/type_1.jpg"}
                                alt={room.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 96px, 112px"
                              />
                            </div>
                            <div>
                              <h3 className="font-serif text-lg text-[#1e2022]">
                                {locale === "vi"
                                  ? room.meta?.nameVi || room.title
                                  : locale === "zh"
                                  ? room.meta?.nameZh || room.title
                                  : room.meta?.nameEn || room.title}
                              </h3>
                              <div className="flex items-center gap-3 text-xs font-sans text-[#6c757d] mt-1">
                                <span>{t("maxGuests", { count: room.meta?.maxOccupancy || room.occ_adults })}</span>
                                <span>•</span>
                                <span className="text-[var(--color-gold)]">{t("roomAvailable", { count: room.quantity })}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-[#e9ecef] pt-3 sm:pt-0">
                            <div>
                              <span className="font-serif text-xl text-[var(--color-gold)] font-medium">
                                {formatPrice(totalPrice)}
                              </span>
                              <span className="block text-[10px] text-[#6c757d] text-right">
                                {formatPrice(pricePerNight)} {t("perNight")}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleSelectRoom(room)}
                              className="
                                mt-2 bg-[var(--color-gold)] text-[var(--color-charcoal)]
                                font-sans font-semibold text-xs tracking-[0.15em] uppercase
                                px-6 py-2.5 transition-all duration-200
                                hover:bg-[var(--color-gold-light)] active:scale-95 cursor-pointer
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

            {/* ── State 3: Guest Info Form & Payment Methods ── */}
            {step === "guest_form" && selectedRoom && (
              <div>
                {/* Selected Room Summary */}
                <div className="bg-[#f8f9fa] border border-[#e9ecef] p-4 mb-6 flex justify-between items-center">
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-wider text-[var(--color-gold)] block">
                      Phòng đã chọn:
                    </span>
                    <h4 className="font-serif text-lg text-[#1e2022]">
                      {locale === "vi" ? selectedRoom.meta?.nameVi : selectedRoom.title}
                    </h4>
                    <span className="font-sans text-xs text-[#6c757d]">
                      Tổng chi phí: <strong className="text-[var(--color-gold)]">{formatPrice(selectedRoom.rate_plans?.[0]?.estimated_total_price || 0)}</strong> ({nights} đêm)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep("select_room")}
                    className="font-sans text-xs text-[#6c757d] hover:text-[var(--color-gold)] underline cursor-pointer"
                  >
                    {t("changeRoom")}
                  </button>
                </div>

                <form onSubmit={handleSubmitBooking} className="space-y-4">
                  <div className="border-b border-[#e9ecef] pb-2 mb-4">
                    <h3 className="font-serif text-lg text-[#1e2022]">
                      {t("guestInfoTitle")}
                    </h3>
                    <p className="font-sans text-xs text-[#6c757d]">
                      {t("guestInfoSubtitle")}
                    </p>
                  </div>

                  {formError && (
                    <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs font-sans">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs text-[#6c757d] mb-1.5">
                        {t("fullName")}
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t("fullNamePlaceholder")}
                        className="
                          w-full bg-[#f8f9fa] border border-[#e9ecef]
                          text-[#1e2022] px-3.5 py-2.5 font-sans text-sm
                          focus:border-[var(--color-gold)] focus:outline-none transition-colors
                        "
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-xs text-[#6c757d] mb-1.5">
                        {t("phone")}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t("phonePlaceholder")}
                        className="
                          w-full bg-[#f8f9fa] border border-[#e9ecef]
                          text-[#1e2022] px-3.5 py-2.5 font-sans text-sm
                          focus:border-[var(--color-gold)] focus:outline-none transition-colors
                        "
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs text-[#6c757d] mb-1.5">
                      {t("email")}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("emailPlaceholder")}
                      className="
                        w-full bg-[#f8f9fa] border border-[#e9ecef]
                        text-[#1e2022] px-3.5 py-2.5 font-sans text-sm
                        focus:border-[var(--color-gold)] focus:outline-none transition-colors
                      "
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs text-[#6c757d] mb-1.5">
                      {t("notes")}
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t("notesPlaceholder")}
                      className="
                        w-full bg-[#f8f9fa] border border-[#e9ecef]
                        text-[#1e2022] px-3.5 py-2 font-sans text-sm
                        focus:border-[var(--color-gold)] focus:outline-none transition-colors resize-none
                      "
                    />
                  </div>

                  {/* ── Payment Methods Selector ── */}
                  <div className="pt-2">
                    <label className="block font-sans text-xs text-[#1e2022] font-medium mb-2.5">
                      {t("paymentMethod")}
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
                      {/* 1: Pay at property */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("property")}
                        className={`
                          p-3 border text-left transition-all cursor-pointer flex flex-col justify-between
                          ${paymentMethod === "property"
                            ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10"
                            : "border-[#e9ecef] bg-[#f8f9fa] hover:border-[var(--color-gold)]/40"
                          }
                        `}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base">🏨</span>
                          <span className="font-sans text-xs font-semibold text-[#1e2022]">
                            Tại khách sạn
                          </span>
                        </div>
                        <span className="font-sans text-[11px] text-[#6c757d]">
                          Tiền mặt / Thẻ / QR khi nhận phòng
                        </span>
                      </button>

                      {/* 2: Wise Transfer */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("wise")}
                        className={`
                          p-3 border text-left transition-all cursor-pointer flex flex-col justify-between
                          ${paymentMethod === "wise"
                            ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10"
                            : "border-[#e9ecef] bg-[#f8f9fa] hover:border-[var(--color-gold)]/40"
                          }
                        `}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base">🌐</span>
                          <span className="font-sans text-xs font-semibold text-[#1e2022]">
                            Wise Transfer
                          </span>
                        </div>
                        <span className="font-sans text-[11px] text-[#6c757d]">
                          Chuyển khoản quốc tế (SGD, GBP, CAD, EUR...)
                        </span>
                      </button>

                      {/* 3: Zelle */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("zelle")}
                        className={`
                          p-3 border text-left transition-all cursor-pointer flex flex-col justify-between
                          ${paymentMethod === "zelle"
                            ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10"
                            : "border-[#e9ecef] bg-[#f8f9fa] hover:border-[var(--color-gold)]/40"
                          }
                        `}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base">⚡</span>
                          <span className="font-sans text-xs font-semibold text-[#1e2022]">
                            Zelle (USD)
                          </span>
                        </div>
                        <span className="font-sans text-[11px] text-[#6c757d]">
                          Dành cho khách hàng ngân hàng tại Mỹ
                        </span>
                      </button>
                    </div>

                    {/* Details for Selected Payment */}
                    {paymentMethod === "property" && (
                      <div className="border border-[#e9ecef] bg-[#f8f9fa] p-3.5 flex items-start gap-3">
                        <span className="text-lg">💳</span>
                        <div>
                          <span className="font-sans text-xs font-semibold text-[var(--color-gold)] block">
                            {t("payAtProperty")}
                          </span>
                          <p className="font-sans text-[11px] text-[#6c757d] leading-relaxed mt-0.5">
                            {t("payAtPropertyNotice")}
                          </p>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "zelle" && (
                      <div className="border border-[var(--color-gold)]/60 bg-[#f8f9fa] p-4">
                        <div className="flex items-center justify-between mb-3 border-b border-[#e9ecef] pb-2">
                          <span className="font-sans text-xs font-semibold text-[var(--color-gold)] uppercase tracking-wider">
                            Thông tin thanh toán Zelle (USD)
                          </span>
                          <span className="text-xs bg-[var(--color-gold)]/20 text-[var(--color-gold)] px-2 py-0.5">
                            US Direct
                          </span>
                        </div>
                        <div className="space-y-2 font-sans text-xs">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className="text-[#6c757d]">Số điện thoại Zelle:</span>
                            <CopyableField text="6562141655" />
                          </div>
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className="text-[#6c757d]">Người nhận (Recipient):</span>
                            <CopyableField text="Ngan Vu" />
                          </div>
                          <p className="text-[11px] text-[#6c757d] italic pt-2 border-t border-[#e9ecef] mt-2">
                            * Sau khi gửi yêu cầu đặt phòng, quý khách có thể chuyển khoản qua Zelle với nội dung: <strong>[Tên của bạn] - [Số điện thoại]</strong>.
                          </p>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "wise" && (
                      <div className="border border-[var(--color-gold)]/60 bg-[#f8f9fa] p-4">
                        <div className="flex items-center justify-between mb-3 border-b border-[#e9ecef] pb-2 flex-wrap gap-2">
                          <span className="font-sans text-xs font-semibold text-[var(--color-gold)] uppercase tracking-wider">
                            Thông tin thanh toán Wise
                          </span>
                          <div className="flex items-center gap-1.5 text-xs text-[#6c757d]">
                            <span>Chủ tài khoản:</span>
                            <CopyableField text="Ngan Thi Thu Vu" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                          {/* QR Code */}
                          <div className="flex flex-col items-center justify-center p-3 border border-[#e9ecef] bg-black/40">
                            <div className="relative w-36 h-36">
                              <Image
                                src="/images/wise-qr.jpg"
                                alt="Wise Payment QR"
                                fill
                                className="object-contain"
                                sizes="144px"
                              />
                            </div>
                            <span className="font-sans text-[10px] text-[#6c757d] mt-2 tracking-wider uppercase">
                              Quét mã Wise
                            </span>
                          </div>

                          {/* Currency Selector & Bank Details */}
                          <div className="md:col-span-2 space-y-3 font-sans text-xs">
                            <div>
                              <span className="block text-[11px] text-[#6c757d] mb-1">
                                Chọn loại tiền tệ chuyển khoản:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {WISE_CURRENCIES.map((c) => (
                                  <button
                                    key={c.code}
                                    type="button"
                                    onClick={() => setSelectedCurrency(c.code)}
                                    className={`
                                      px-2.5 py-1 text-xs border font-medium cursor-pointer transition-colors
                                      ${selectedCurrency === c.code
                                        ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-charcoal)] font-semibold"
                                        : "border-[#e9ecef] text-[#6c757d] hover:border-[var(--color-gold)]/50"
                                      }
                                    `}
                                  >
                                    {c.code}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="border border-[#e9ecef] p-3 bg-black/30 space-y-2">
                              <div className="flex items-center justify-between flex-wrap gap-1.5">
                                <span className="text-[#6c757d]">Phương thức:</span>
                                <span className="text-[var(--color-gold)] font-medium">{currentWiseInfo.method}</span>
                              </div>
                              <div className="flex items-center justify-between flex-wrap gap-1.5">
                                <span className="text-[#6c757d]">Ngân hàng:</span>
                                <span className="text-[#1e2022]">{currentWiseInfo.bank}</span>
                              </div>
                              <div className="flex items-center justify-between flex-wrap gap-1.5">
                                <span className="text-[#6c757d]">Số tài khoản / IBAN:</span>
                                <CopyableField text={currentWiseInfo.accountNumber} />
                              </div>
                              {currentWiseInfo.codeLabel && (
                                <div className="flex items-center justify-between flex-wrap gap-1.5">
                                  <span className="text-[#6c757d]">{currentWiseInfo.codeLabel}:</span>
                                  <CopyableField 
                                    text={currentWiseInfo.codeValue} 
                                    valueToCopy={
                                      currentWiseInfo.code === "CAD"
                                        ? "705-00001"
                                        : currentWiseInfo.codeValue
                                    }
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      className="
                        w-full bg-[var(--color-gold)] text-[var(--color-charcoal)]
                        font-sans font-semibold text-xs tracking-[0.18em] uppercase
                        py-3.5 transition-all duration-300
                        hover:bg-[var(--color-gold-light)] hover:shadow-gold
                        active:scale-[0.98] cursor-pointer
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
                <p className="font-serif text-lg text-[#1e2022]">
                  {t("processing")}
                </p>
                <p className="font-sans text-xs text-[#6c757d]">
                  Vui lòng không đóng trình duyệt...
                </p>
              </div>
            )}

            {/* ── State 5: Booking Success ── */}
            {step === "success" && (
              <div className="py-6 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-[var(--color-gold)] flex items-center justify-center text-3xl text-[var(--color-gold)] mb-4">
                  ✓
                </div>

                <h3 className="font-serif text-2xl text-[#1e2022] mb-2">
                  {t("bookingSuccess")}
                </h3>
                <p className="font-sans text-xs text-[#6c757d] max-w-md mx-auto mb-6">
                  {t("bookingSuccessSub")}
                </p>

                {createdBooking?.id && (
                  <div className="border border-[var(--color-gold)] bg-[#f8f9fa] px-6 py-4 mb-6 inline-block">
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#6c757d] block mb-1">
                      {t("bookingCode")}
                    </span>
                    <div className="flex items-center gap-2 justify-center">
                      <CopyableField 
                        text={createdBooking.id.slice(0, 8).toUpperCase()} 
                        className="text-lg sm:text-xl font-bold py-1 px-3 border-[var(--color-gold)]"
                      />
                    </div>
                  </div>
                )}

                <div className="w-full border border-[#e9ecef] bg-[#171717] p-4 text-left font-sans text-xs mb-6 flex flex-col gap-2">
                  <div className="flex justify-between py-1 border-b border-[#e9ecef]">
                    <span className="text-[#6c757d]">Khách sạn:</span>
                    <span className="text-[#1e2022] font-medium">SOHO Residence & Hotel (100 Cô Giang, Q1, TP.HCM)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#e9ecef]">
                    <span className="text-[#6c757d]">Khách hàng:</span>
                    <span className="text-[#1e2022] font-medium">{fullName} ({phone})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#e9ecef]">
                    <span className="text-[#6c757d]">Lịch lưu trú:</span>
                    <span className="text-[#1e2022] font-medium">{searchParams.checkIn} → {searchParams.checkOut} ({nights} {t("nights")})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#e9ecef]">
                    <span className="text-[#6c757d]">Phương thức thanh toán:</span>
                    <span className="text-[var(--color-gold)] font-medium">
                      {paymentMethod === "wise" ? `Wise Transfer (${selectedCurrency})` : paymentMethod === "zelle" ? "Zelle (USD)" : "Tại chỗ khi nhận phòng"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#6c757d]">Tổng tiền ước tính:</span>
                    <span className="text-[var(--color-gold)] font-medium">
                      {formatPrice(selectedRoom?.rate_plans?.[0]?.estimated_total_price || 0)}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#f8f9fa] border border-[#e9ecef] text-left font-sans text-xs text-[#6c757d] mb-6 flex items-start gap-2.5">
                  <span className="text-[var(--color-gold)] text-sm">ℹ️</span>
                  <div>
                    <p className="text-[#1e2022] font-medium mb-0.5">
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
                    hover:bg-[var(--color-gold-light)] active:scale-95 cursor-pointer
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
                <p className="font-sans text-xs text-[#6c757d] max-w-md mx-auto mb-6">
                  {errorMessage || "Không thể hoàn thành yêu cầu. Vui lòng thử lại hoặc gọi hotline (+84) 91 771 9966."}
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setStep("select_room")}
                    className="
                      border border-[#e9ecef] text-[#1e2022]
                      px-6 py-2.5 text-xs font-sans tracking-[0.15em] uppercase
                      hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] cursor-pointer
                    "
                  >
                    ← Thử chọn lại
                  </button>
                  <a
                    href="tel:+84917719966"
                    className="
                      bg-[var(--color-gold)] text-[var(--color-charcoal)]
                      px-6 py-2.5 text-xs font-sans font-semibold tracking-[0.15em] uppercase
                    "
                  >
                    Gọi Hotline
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
