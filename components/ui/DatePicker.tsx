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
    <div ref={ref} className="relative flex flex-col gap-1 flex-1 min-w-[140px]">
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
          group flex items-center justify-between gap-3 w-full
          border-b py-1.5 text-left
          font-sans text-sm transition-colors duration-200
          ${open
            ? "border-[var(--color-gold)] text-[var(--color-ivory)]"
            : "border-[var(--color-border)] text-[var(--color-ivory)] hover:border-[rgba(201,168,76,0.5)]"
          }
          ${!value ? "text-[var(--color-ivory-dim)]" : ""}
          bg-transparent outline-none
        `}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span>{value ? formatDisplay(value) : placeholder}</span>
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
          <motion.div
            role="dialog"
            aria-label={`${label} calendar`}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: -8,  scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="
              absolute top-full left-0 z-[60] mt-2
              bg-[#141414] border border-[var(--color-border)]
              shadow-[0_25px_60px_rgba(0,0,0,0.7)]
              p-4 min-w-[280px]
            "
            style={{ "--rdp-accent-color": "#c9a84c" } as React.CSSProperties}
          >
            <style>{`
              .rdp-root {
                --rdp-accent-color: #c9a84c;
                --rdp-accent-background-color: rgba(201,168,76,0.12);
                --rdp-day-height: 2.2rem;
                --rdp-day-width: 2.2rem;
                --rdp-font-family: var(--font-inter), sans-serif;
                color: #f5f0e8;
              }
              .rdp-month_caption {
                font-family: var(--font-playfair), serif;
                font-size: 1rem;
                font-weight: 400;
                color: #f5f0e8;
                letter-spacing: 0.02em;
                padding-bottom: 0.75rem;
              }
              .rdp-weekday {
                font-size: 0.65rem;
                font-weight: 500;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                color: #8a6a28;
              }
              .rdp-day_button {
                font-size: 0.8rem;
                color: #d4cfc6;
                border-radius: 0 !important;
                transition: all 0.15s;
              }
              .rdp-day_button:hover:not(:disabled) {
                background: rgba(201,168,76,0.15) !important;
                color: #e8d5a0 !important;
              }
              .rdp-selected .rdp-day_button {
                background: #c9a84c !important;
                color: #0e0e0e !important;
                font-weight: 600;
                border-radius: 0 !important;
              }
              .rdp-today .rdp-day_button {
                border: 1px solid rgba(201,168,76,0.5) !important;
                color: #c9a84c !important;
                border-radius: 0 !important;
              }
              .rdp-outside .rdp-day_button { color: #2a2a2a !important; }
              .rdp-disabled .rdp-day_button { color: #2a2a2a !important; cursor: not-allowed; }
              .rdp-nav button {
                color: #a09a90;
                border-radius: 0;
                transition: color 0.15s;
              }
              .rdp-nav button:hover { color: #c9a84c; }
              .rdp-month_caption { justify-content: center; }
              .rdp-caption_label {
                font-family: var(--font-playfair), serif;
                font-size: 0.95rem;
                font-weight: 400;
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
