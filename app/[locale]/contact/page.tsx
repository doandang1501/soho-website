import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AnimateInView from "@/components/ui/AnimateInView";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact SOHO Residence & Hotel in District 1, Ho Chi Minh City. Reach us via email, phone, WhatsApp, Zalo, or Telegram. 24/7 response.",
  openGraph: {
    title: "Contact | SOHO Residence & Hotel",
    images: [{ url: "/images/hero_3.jpg" }],
  },
};

const CONTACT_CHANNELS = [
  { icon: "✉",  label: "Email",                  value: "booking@sohoresidencehotel.vn", href: "mailto:booking@sohoresidencehotel.vn" },
  { icon: "📞", label: "Phone / Zalo",            value: "(+84) 91 771 9966",             href: "tel:+84917719966"                    },
  { icon: "💬", label: "WhatsApp / Viber",        value: "(+84) 91 771 9966",             href: "https://wa.me/84917719966"           },
  { icon: "🌐", label: "WeChat / KakaoTalk",      value: "@sohoresidencehotel",           href: "https://t.me/sohoresidencehotel"     },
  { icon: "📍", label: "Address",                 value: "100 Cô Giang, Cầu Ông Lãnh, HCMC", href: "https://maps.google.com/?q=QM7V%2BFR+Cau+Ong+Lanh,+Ho+Chi+Minh,+Vietnam" },
] as const;

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="pt-4 pb-24">

      {/* ── Page header ───────────────────────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full pt-16 pb-14">
        <AnimateInView direction="up">
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-7 h-px bg-[var(--color-gold)]" />
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)]">
              Reach Us
            </span>
          </div>
        </AnimateInView>
        <AnimateInView delay={0.1} direction="up">
          <h1 className="font-serif text-[clamp(2rem,5vw,4rem)] text-[var(--color-ivory)] mb-4">
            {t("title")}
          </h1>
        </AnimateInView>
        <AnimateInView delay={0.18} direction="up">
          <p className="font-sans text-sm text-[var(--color-ivory-dim)] max-w-lg leading-relaxed">
            {t("subtitle")}
          </p>
        </AnimateInView>
      </div>

      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── Contact cards (col-span-2) ─────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {CONTACT_CHANNELS.map(({ icon, label, value, href }, i) => (
              <AnimateInView key={label} delay={i * 0.08} direction="left">
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="
                    group flex items-start gap-5 p-6
                    border border-[var(--color-border)] bg-[var(--color-charcoal-50)]
                    hover:border-[rgba(201,168,76,0.45)] hover:bg-[rgba(201,168,76,0.04)]
                    transition-all duration-300
                  "
                >
                  <span className="text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    {icon}
                  </span>
                  <div>
                    <span className="block font-sans text-[10px] tracking-[0.18em] uppercase text-[var(--color-ivory-dim)] mb-1">
                      {label}
                    </span>
                    <span className="block font-sans text-sm text-[var(--color-ivory)] group-hover:text-[var(--color-gold)] transition-colors duration-300">
                      {value}
                    </span>
                  </div>
                  <span className="ml-auto self-center text-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                    →
                  </span>
                </a>
              </AnimateInView>
            ))}
          </div>

          {/* ── Map (col-span-3) ──────────────────────────────────────── */}
          <AnimateInView direction="right" delay={0.15} className="lg:col-span-3">
            <div className="relative w-full h-full min-h-[420px] border border-[var(--color-border)] overflow-hidden">
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[var(--color-gold)] z-10 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[var(--color-gold)] z-10 pointer-events-none" />
              <iframe
                title="SOHO Residence & Hotel — map"
                src="https://maps.google.com/maps?q=100+C%C3%B4+Giang%2C+C%E1%BA%A7u+%C3%94ng+L%C3%A3nh%2C+H%E1%BB%93+Ch%C3%AD+Minh+700000%2C+Vietnam&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.5) invert(0.15) contrast(1.1)", position: "absolute", inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimateInView>

        </div>

        {/* ── FAQ strip ─────────────────────────────────────────────────── */}
        <div className="mt-20">
          <AnimateInView direction="up">
            <div className="flex items-center gap-3 mb-10">
              <span className="block w-7 h-px bg-[var(--color-gold)]" />
              <h2 className="font-serif text-2xl text-[var(--color-ivory)]">Frequently Asked</h2>
            </div>
          </AnimateInView>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: "What time is check-in?",               a: "Check-in is available 24 hours a day, 7 days a week. There is no fixed check-in time — arrive whenever suits you." },
              { q: "Is there parking available?",          a: "Street parking is available nearby. Please contact us in advance and we can advise on the best options close to the property." },
              { q: "Do you accept long-term bookings?",    a: "Yes — we welcome stays from one night to several months. Please contact us directly for monthly rate enquiries." },
              { q: "Is airport transfer available?",       a: "We can arrange airport transfers on request. Please message us via WhatsApp or email at least 24 hours in advance." },
              { q: "Are pets allowed?",                    a: "We are a pet-friendly property for small pets. Please inform us at the time of booking." },
              { q: "How do I pay for my booking?",         a: "Payment can be made via bank transfer, credit card, or cash on arrival. Contact us for details after booking." },
            ].map(({ q, a }, i) => (
              <AnimateInView key={q} delay={i * 0.07} direction="up">
                <div className="border border-[var(--color-border)] bg-[var(--color-charcoal-50)] p-6">
                  <h3 className="font-sans font-semibold text-sm text-[var(--color-ivory)] mb-3 flex items-start gap-2">
                    <span className="text-[var(--color-gold)] flex-shrink-0">Q.</span>
                    {q}
                  </h3>
                  <p className="font-sans text-sm text-[var(--color-ivory-dim)] leading-relaxed pl-5">{a}</p>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
