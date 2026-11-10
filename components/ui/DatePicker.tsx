"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { motion, AnimatePresence } from "framer-motion";
import "react-day-picker/style.css";

interface DatePickerProps {
  label:     string;
  id:        string;
  value:     string;        // YYYY-MM-DD
  minDate?:  Date;
  onChange:  (iso: string) => void;
  placeholder?: string;
  align?: "left" | "right";
}

function parseISO(iso: string): Date | undefined {
  if (!iso) return undefined;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDisplay(iso: string): string {
  if (!iso) return "";
  const date = parseISO(iso);
  if (!date) return "";
  return date.toLocaleDateString("en-GB", {
    day:   "2-digit",
    month: "short",
    year:  "numeric",
  });
}

export default function DatePicker({
  label,
  id,
  value,
  minDate,
  onChange,
  placeholder = "Select date",
  align = "left",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref  = useRef<HTMLDivElement>(null);
  const selected = parseISO(value);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    onChange(toISO(date));
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative flex flex-col gap-1 flex-1 min-w-[130px]">
      {/* Label */}
      <label
        htmlFor={id}
        className="text-[10px] font-sans font-medium tracking-[0.15em] uppercase text-[var(--color-ivory-dim)]"
      >
        {label}
      </label>

      {/* Trigger button */}
      <button
        id={id}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`
          group flex items-center justify-between gap-2 w-full
          border-b py-1.5 text-left
          font-sans text-xs sm:text-sm transition-colors duration-200
          ${open
            ? "border-[var(--color-gold)] text-[var(--color-ivory)]"
            : "border-[var(--color-border)] text-[var(--color-ivory)] hover:border-[rgba(201,168,76,0.5)]"
          }
          ${!value ? "text-[var(--color-ivory-dim)]" : ""}
          bg-transparent outline-none cursor-pointer
        `}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="truncate">{value ? formatDisplay(value) : placeholder}</span>
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          className={`flex-shrink-0 transition-colors duration-200 ${open ? "text-[var(--color-gold)]" : "text-[var(--color-ivory-dim)] group-hover:text-[var(--color-gold)]"}`}
        >
          <rect x="1" y="2" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M4 1v2M10 1v2M1 6h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Calendar popup */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop on mobile to easily tap outside and prevent background scroll */}
            <div 
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] sm:hidden"
              onClick={() => setOpen(false)}
            />

            <motion.div
              role="dialog"
              aria-label={`${label} calendar`}
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              exit={{   opacity: 0, y: -6,  scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className={`
                fixed sm:absolute top-[28%] sm:top-full 
                left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0
                ${align === "right" ? "sm:right-0 sm:left-auto" : "sm:left-0"}
                z-[70] sm:mt-2
                w-[90vw] max-w-[320px] sm:w-auto sm:min-w-[280px]
                bg-[#141414] border border-[var(--color-gold-muted)]
                shadow-[0_20px_60px_rgba(0,0,0,0.9)]
                p-3 sm:p-4 rounded-none
              `}
              style={{ "--rdp-accent-color": "#c9a84c" } as React.CSSProperties}
            >
              <style>{`
                .rdp-root {
                  --rdp-accent-color: #c9a84c;
                  --rdp-accent-background-color: rgba(201,168,76,0.15);
                  --rdp-day-height: 2.1rem;
                  --rdp-day-width: 2.1rem;
                  --rdp-font-family: var(--font-inter), sans-serif;
                  color: #f5f0e8;
                  margin: 0 auto;
                }
                .rdp-month_caption {
                  font-family: var(--font-playfair), serif;
                  font-size: 1rem;
                  font-weight: 500;
                  color: #f5f0e8;
                  letter-spacing: 0.02em;
                  padding-bottom: 0.5rem;
                  display: flex;
                  justify-content: center;
                }
                .rdp-weekday {
                  font-size: 0.65rem;
                  font-weight: 500;
                  letter-spacing: 0.1em;
                  text-transform: uppercase;
                  color: #c9a84c;
                  padding-bottom: 0.25rem;
                }
                .rdp-day_button {
                  font-size: 0.8rem;
                  color: #d4cfc6;
                  border-radius: 0 !important;
                  transition: all 0.15s;
                }
                .rdp-day_button:hover:not(:disabled) {
                  background: rgba(201,168,76,0.2) !important;
                  color: #ffffff !important;
                }
                .rdp-selected .rdp-day_button {
                  background: #c9a84c !important;
                  color: #0e0e0e !important;
                  font-weight: 600;
                  border-radius: 0 !important;
                }
                .rdp-today .rdp-day_button {
                  border: 1px solid rgba(201,168,76,0.6) !important;
                  color: #c9a84c !important;
                  border-radius: 0 !important;
                }
                .rdp-outside .rdp-day_button { color: #333333 !important; }
                .rdp-disabled .rdp-day_button { color: #333333 !important; cursor: not-allowed; }
                .rdp-nav {
                  display: flex;
                  gap: 0.25rem;
                }
                .rdp-nav button {
                  color: #c9a84c;
                  border-radius: 0;
                  transition: color 0.15s;
                  padding: 4px;
                }
                .rdp-nav button:hover { color: #f5f0e8; }
                .rdp-caption_label {
                  font-family: var(--font-playfair), serif;
                  font-size: 0.95rem;
                  font-weight: 500;
                  color: #f5f0e8;
                  letter-spacing: 0.04em;
                }
              `}</style>

              <DayPicker
                mode="single"
                selected={selected}
                onSelect={handleSelect}
                disabled={minDate ? { before: minDate } : undefined}
                defaultMonth={selected ?? minDate ?? new Date()}
                captionLayout="label"
              />

              {/* Close button for mobile */}
              <div className="mt-2 pt-2 border-t border-[var(--color-border)] flex justify-end sm:hidden">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-xs uppercase tracking-wider text-[var(--color-gold)] font-medium px-2 py-1"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
