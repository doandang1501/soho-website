"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("contact");

  const CONTACT_ROWS = [
    { icon: "✉", labelKey: "email", value: tc("emailValue"), href: "mailto:booking@sohoresidencehotel.vn" },
    { icon: "📞", labelKey: "phone", value: tc("phoneValue"), href: "tel:+84917719966" },
    { icon: "💬", labelKey: "whatsapp", value: tc("phoneValue"), href: "https://wa.me/84917719966" },
    { icon: "🌐", labelKey: "social", value: tc("socialValue"), href: "https://t.me/sohoresidencehotel" },
  ] as const;

  const ROOM_LINKS = [
    { labelKey: "studioLink", href: "/studio" },
    { labelKey: "twobedLink", href: "/2-bedroom" },
    { labelKey: "threebedLink", href: "/3-bedroom" },
  ] as const;

  return (
    <footer className="bg-[#f8f9fa] border-t border-[#e9ecef] mt-auto">

      {/* Gold top accent line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#c99a2c] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/images/soho-logo-remove-background.png"
              alt="SOHO Residence & Hotel"
              width={110}
              height={44}
              className="h-10 w-auto object-contain mb-5"
            />
            <p className="font-sans text-sm text-[#6c757d] leading-relaxed mb-6">
              {t("tagline")}
            </p>
            {/* Social / contact icons */}
            <div className="flex gap-3">
              <a
                href="tel:+84917719966"
                aria-label="Call us"
                className="
                  w-9 h-9 rounded-full border border-[#dee2e6] bg-white
                  flex items-center justify-center
                  text-[#495057] hover:text-[#c99a2c]
                  hover:border-[#c99a2c] shadow-sm
                  transition-all duration-300 text-sm
                "
              >
                📞
              </a>
              <a
                href="https://wa.me/84917719966"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="
                  w-9 h-9 rounded-full border border-[#dee2e6] bg-white
                  flex items-center justify-center
                  text-[#495057] hover:text-[#c99a2c]
                  hover:border-[#c99a2c] shadow-sm
                  transition-all duration-300 text-sm
                "
              >
                💬
              </a>
              <a
                href="https://zalo.me/0917719966"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zalo"
                className="
                  w-9 h-9 rounded-full border border-[#dee2e6] bg-white
                  flex items-center justify-center
                  text-[#495057] hover:text-[#c99a2c]
                  hover:border-[#c99a2c] shadow-sm
                  transition-all duration-300 text-xs font-bold
                "
              >
                Z
              </a>
            </div>
          </div>

          {/* Col 2 — Rooms */}
          <div>
            <h3 className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#c99a2c] mb-5">
              {t("residences")}
            </h3>
            <ul className="space-y-3">
              {ROOM_LINKS.map(({ labelKey, href }) => (
                <li key={labelKey}>
                  <Link
                    href={href}
                    className="
                      font-sans text-sm text-[#6c757d]
                      hover:text-[#c99a2c]
                      transition-colors duration-200
                      flex items-center gap-2 group
                    "
                  >
                    <span className="
                      block w-3 h-px bg-[#dee2e6]
                      group-hover:bg-[#c99a2c] group-hover:w-5
                      transition-all duration-300
                    " />
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#c99a2c] mb-5">
              {t("contactHeading")}
            </h3>
            <ul className="space-y-3">
              {CONTACT_ROWS.map(({ icon, labelKey, value, href }) => (
                <li key={labelKey} className="flex items-start gap-3">
                  <span className="text-sm mt-0.5 text-[#6c757d]">{icon}</span>
                  <div>
                    <span className="block font-sans text-[10px] uppercase tracking-[0.12em] text-[#6c757d] mb-0.5 font-medium">
                      {tc(labelKey)}
                    </span>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="font-sans text-sm font-semibold text-[#1e2022] hover:text-[#c99a2c] transition-colors duration-200"
                    >
                      {value}
                    </a>
                  </div>
                </li>
              ))}

              {/* Address */}
              <li className="flex items-start gap-3 pt-1">
                <span className="text-sm mt-0.5 text-[#6c757d]">📍</span>
                <div>
                  <span className="block font-sans text-[10px] uppercase tracking-[0.12em] text-[#6c757d] mb-0.5 font-medium">
                    {tc("address")}
                  </span>
                  <span className="font-sans text-sm font-medium text-[#1e2022] leading-relaxed">
                    {tc("addressValue")}
                  </span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#e9ecef] bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-[#6c757d] tracking-wide">
            {t("rights")}
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-sans text-xs text-[#6c757d] hover:text-[#c99a2c] transition-colors duration-200">
              {t("links.privacy")}
            </a>
            <a href="#" className="font-sans text-xs text-[#6c757d] hover:text-[#c99a2c] transition-colors duration-200">
              {t("links.terms")}
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
