"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { redirectToBooking, type BookingValidationError } from "@/lib/booking";
import DatePicker from "@/components/ui/DatePicker";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ── Sub-component: Counter (rooms / adults / children) ────────────────────────
function Counter({
  label,
  value,
  onChange,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-sans font-medium tracking-[0.15em] uppercase text-[var(--color-ivory-dim)]">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="
            w-7 h-7 rounded-full border border-[var(--color-border)]
            text-[var(--color-ivory)] text-sm font-medium
            hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]
            transition-all duration-200 flex items-center justify-center
            active:scale-95
          "
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <span className="w-6 text-center text-[var(--color-ivory)] font-sans font-medium text-sm">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="
            w-7 h-7 rounded-full border border-[var(--color-border)]
            text-[var(--color-ivory)] text-sm font-medium
            hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]
            transition-all duration-200 flex items-center justify-center
            active:scale-95
          "
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

// ── Main BookingBar ───────────────────────────────────────────────────────────
export default function BookingBar() {
  const t = useTranslations("booking");

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const [checkIn,  setCheckIn]  = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms,    setRooms]    = useState(1);
  const [adults,   setAdults]   = useState(1);
  const [children, setChildren] = useState(0);
  const [error,    setError]    = useState<BookingValidationError | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const handleCheckIn = (v: string) => {
    setCheckIn(v);
    if (checkOut && checkOut <= v) setCheckOut("");
    setError(null);
  };

  const handleSubmit = () => {
    const err = redirectToBooking({ checkIn, checkOut, rooms, adults, children });
    if (err) setError(err);
  };

  const minCheckOutDate = checkIn
    ? new Date(new Date(checkIn).getTime() + 86400000)
    : new Date(todayDate.getTime() + 86400000);

  return (
    <>
      {/* ── Desktop Booking Bar (always visible, sticky below header) ─── */}
      <div className="
        hidden lg:block
        sticky top-20 z-40
        bg-[rgba(10,10,10,0.88)] backdrop-blur-lg
        border-b border-[var(--color-border)]
        shadow-luxury
      ">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-end gap-6 flex-wrap">

            <DatePicker
              label={t("checkIn")}
              id="checkin-desktop"
              value={checkIn}
              minDate={todayDate}
              onChange={handleCheckIn}
              placeholder="DD Mon YYYY"
            />

            <DatePicker
              label={t("checkOut")}
              id="checkout-desktop"
              value={checkOut}
              minDate={minCheckOutDate}
              onChange={(v) => { setCheckOut(v); setError(null); }}
              placeholder="DD Mon YYYY"
            />

            {/* Divider */}
            <div className="hidden xl:block w-px h-10 bg-[var(--color-border)] self-end mb-1" />

            <Counter label={t("rooms")}    value={rooms}    onChange={setRooms}    min={1} />
            <Counter label={t("adults")}   value={adults}   onChange={setAdults}   min={1} />
            <Counter label={t("children")} value={children} onChange={setChildren} min={0} />

            {/* CTA */}
            <div className="flex flex-col gap-1 ml-auto">
              {error && (
                <p className="text-[10px] text-red-400 font-sans max-w-[200px] text-right">
                  {t(`errors.${error}`)}
                </p>
              )}
              <button
                onClick={handleSubmit}
                className="
                  relative overflow-hidden
                  bg-[var(--color-gold)] text-[var(--color-charcoal)]
                  font-sans font-semibold text-xs tracking-[0.15em] uppercase
                  px-8 py-3 rounded-none
                  transition-all duration-300
                  hover:bg-[var(--color-gold-light)] hover:shadow-gold
                  active:scale-95
                  group
                "
              >
                <span className="relative z-10">{t("cta")}</span>
                <span className="
                  absolute inset-0 bg-white/10
                  translate-x-[-100%] group-hover:translate-x-0
                  transition-transform duration-400
                " />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── Mobile Booking Bar (collapsible) ─────────────────────────────── */}
      <div className="lg:hidden sticky top-20 z-40">

        {/* Collapsed trigger */}
        <button
          onClick={() => setMobileExpanded((v) => !v)}
          className="
            w-full flex items-center justify-between px-5 py-3
            bg-[rgba(10,10,10,0.92)] backdrop-blur-lg
            border-b border-[var(--color-border)]
            text-[var(--color-ivory)] font-sans text-sm
          "
          aria-expanded={mobileExpanded}
        >
          <span className="text-xs tracking-[0.15em] uppercase text-[var(--color-ivory-dim)]">
            {t("cta")}
          </span>
          <motion.span
            animate={{ rotate: mobileExpanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-[var(--color-gold)]"
          >
            ▾
          </motion.span>
        </button>

        {/* Expanded panel */}
        <AnimatePresence>
          {mobileExpanded && (
            <motion.div
              key="mobile-booking"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden bg-[rgba(10,10,10,0.96)] border-b border-[var(--color-border)]"
            >
              <div className="px-5 py-5 flex flex-col gap-5">

                <div className="flex gap-4">
                  <DatePicker
                    label={t("checkIn")}
                    id="checkin-mobile"
                    value={checkIn}
                    minDate={todayDate}
                    onChange={handleCheckIn}
                    placeholder="DD Mon YYYY"
                  />
                  <DatePicker
                    label={t("checkOut")}
                    id="checkout-mobile"
                    value={checkOut}
                    minDate={minCheckOutDate}
                    onChange={(v) => { setCheckOut(v); setError(null); }}
                    placeholder="DD Mon YYYY"
                  />
                </div>

                <div className="flex gap-8">
                  <Counter label={t("rooms")}    value={rooms}    onChange={setRooms}    min={1} />
                  <Counter label={t("adults")}   value={adults}   onChange={setAdults}   min={1} />
                  <Counter label={t("children")} value={children} onChange={setChildren} min={0} />
                </div>

                {error && (
                  <p className="text-xs text-red-400 font-sans">{t(`errors.${error}`)}</p>
                )}

                <button
                  onClick={() => { handleSubmit(); setMobileExpanded(false); }}
                  className="
                    w-full bg-[var(--color-gold)] text-[var(--color-charcoal)]
                    font-sans font-semibold text-xs tracking-[0.15em] uppercase
                    py-3.5 transition-all duration-300
                    hover:bg-[var(--color-gold-light)] active:scale-[0.98]
                  "
                >
                  {t("cta")}
                </button>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
