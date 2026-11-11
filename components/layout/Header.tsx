"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

const NAV_LINKS = [
  { key: "home",      href: "/",          page: true  },
  { key: "rooms",     href: "/rooms",     page: true  },
  { key: "amenities", href: "/#amenities",page: false },
  { key: "location",  href: "/#location", page: false },
  { key: "contact",   href: "/contact",   page: true  },
] as const;

export default function Header() {
  const t      = useTranslations("nav");
  const locale = useLocale();

  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // ── Scroll detection ─────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section tracker ────────────────────────────────────────────────
  useEffect(() => {
    const sections = ["home", "rooms", "amenities", "location", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id || "home");
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ── Locale-aware href ─────────────────────────────────────────────────────
  const localePath = (href: string) =>
    locale === "en" ? href : `/${locale}${href}`;

  // ── Smooth scroll helper ─────────────────────────────────────────────────
  // If the target section exists on the current page → smooth scroll.
  // If not (e.g. clicking Amenities from /rooms) → let browser navigate to the hash URL.
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.split("#")[1];
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      e.preventDefault();
      setMobileOpen(false);
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      setMobileOpen(false);
    }
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500
          ${scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[#e9ecef] shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
            : "bg-white/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link
              href={localePath("/")}
              className="flex-shrink-0 group"
              aria-label="SOHO Residence & Hotel"
            >
              <Image
                src="/images/soho-logo-remove-background.png"
                alt="SOHO Residence & Hotel"
                width={120}
                height={48}
                className="h-9 sm:h-10 w-auto object-contain brightness-100 group-hover:brightness-110 transition-all duration-300"
                priority
                fetchPriority="high"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS.map(({ key, href, page }) => {
                const hash     = href.split("#")[1];
                const isActive = hash
                  ? activeSection === hash
                  : key === "home" ? activeSection === "home" : false;
                const Tag      = page ? Link : "a";
                return (
                  <Tag
                    key={key}
                    href={localePath(href)}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, href)}
                    className={`
                      relative text-xs font-sans font-medium tracking-[0.15em] uppercase
                      transition-colors duration-300 py-1
                      ${isActive ? "text-[var(--color-gold)] font-semibold" : "text-[#495057] hover:text-[#1e2022]"}
                    `}
                  >
                    {t(key)}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-[var(--color-gold)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Tag>
                );
              })}
            </nav>

            {/* Right side: language + mobile toggle */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden flex flex-col gap-1.5 p-2 group"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <span className={`
                  block h-0.5 w-6 bg-[#1e2022] origin-center
                  transition-all duration-300
                  ${mobileOpen ? "rotate-45 translate-y-[4px]" : ""}
                `} />
                <span className={`
                  block h-0.5 w-6 bg-[#1e2022]
                  transition-all duration-300
                  ${mobileOpen ? "opacity-0 scale-x-0" : ""}
                `} />
                <span className={`
                  block h-0.5 w-6 bg-[#1e2022] origin-center
                  transition-all duration-300
                  ${mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""}
                `} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: EASE }}
            className="
              fixed inset-0 z-40 bg-white
              flex flex-col justify-center px-10
              lg:hidden
            "
          >
            {/* Close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 p-2"
              aria-label="Close menu"
            >
              <span className="block h-0.5 w-6 bg-[#1e2022] rotate-45 translate-y-px" />
              <span className="block h-0.5 w-6 bg-[#1e2022] -rotate-45 -translate-y-px" />
            </button>

            <nav className="flex flex-col gap-8">
              {NAV_LINKS.map(({ key, href, page }, i) => {
                const MTag = page ? motion(Link) : motion.a;
                return (
                  <MTag
                    key={key}
                    href={localePath(href)}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, href)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="font-serif text-3xl text-[#1e2022] hover:text-[var(--color-gold)] transition-colors duration-300"
                  >
                    {t(key)}
                  </MTag>
                );
              })}
            </nav>

            <div className="mt-16 text-sm text-[#6c757d] font-sans tracking-widest uppercase">
              booking@sohoresidencehotel.vn
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
