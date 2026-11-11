"use client";

import { useTranslations } from "next-intl";
import AnimateInView from "@/components/ui/AnimateInView";

const REVIEWS = [
  {
    name: "Michael Chen",
    country: "Singapore",
    source: "Booking.com",
    rating: "10/10",
    commentVi: "Căn hộ 2 phòng ngủ rất sạch sẽ và tiện nghi. Ban công có máy giặt riêng cực kỳ tiện lợi cho gia đình có con nhỏ. Vị trí ngay trung tâm, đi bộ ra Bùi Viện và chợ Bến Thành rất gần.",
    commentEn: "The 2-bedroom apartment was spotless and well equipped. Having a private washer on the balcony was a lifesaver for our family. Central location, easy walk to Bui Vien.",
    commentZh: "两居室公寓非常干净舒适。私人阳台上配有洗衣机，对带小孩的家庭来说太方便了。位置处于市中心，步行去范五老街很近。",
  },
  {
    name: "Sarah Jenkins",
    country: "Australia",
    source: "Agoda",
    rating: "9.8/10",
    commentVi: "Nhân viên hỗ trợ nhiệt tình, đón tiếp chu đáo khi đến nơi. Phòng studio rộng rãi, bếp đầy đủ đồ dùng, wifi nhanh và có smart TV xem Netflix mượt mà.",
    commentEn: "Staff was exceptionally welcoming and attentive. Spacious studio, kitchen fully stocked, high-speed Wi-Fi and seamless Netflix streaming.",
    commentZh: "工作人员热情周到。单间开间空间宽敞，厨房用品齐全，高速无线网络和智能电视体验极佳。",
  },
  {
    name: "Nguyễn Hoàng Nam",
    country: "Hà Nội, Việt Nam",
    source: "Google Review",
    rating: "5/5 ★",
    commentVi: "Chuyến công tác 5 ngày rất thoải mái. Không gian yên tĩnh, an ninh tòa nhà 24/7 tốt. Cảm giác riêng tư như ở nhà nhưng dịch vụ chuyên nghiệp.",
    commentEn: "A truly comfortable 5-day business stay. Quiet ambience, 24/7 building security, private apartment feel with professional hospitality.",
    commentZh: "五天的商务出差非常舒适。环境安静，24小时安保让人安心。既有家的私密舒适，又有专业的接待服务。",
  },
];

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
      <div className="mb-12 text-center">
        <AnimateInView direction="up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="block w-8 h-px bg-[var(--color-gold)]" />
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)] font-medium">
              {t("eyebrow")}
            </span>
            <span className="block w-8 h-px bg-[var(--color-gold)]" />
          </div>
        </AnimateInView>

        <AnimateInView delay={0.1} direction="up">
          <h2 className="font-serif text-[clamp(1.8rem,3.8vw,3.2rem)] text-[var(--color-ivory)] mb-3">
            {t("title")}
          </h2>
        </AnimateInView>

        <AnimateInView delay={0.18} direction="up">
          <p className="font-sans text-sm sm:text-base text-[var(--color-ivory-dim)] max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </AnimateInView>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((r, i) => (
          <AnimateInView key={i} delay={i * 0.08} direction="up">
            <div className="p-6 sm:p-7 border border-[var(--color-border)] bg-[var(--color-charcoal-50)] hover:border-[var(--color-gold)]/40 transition-all duration-300 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[var(--color-gold)] text-sm tracking-widest">
                    ★★★★★
                  </div>
                  <span className="font-sans text-[10px] uppercase tracking-wider text-[var(--color-gold)] bg-[var(--color-gold)]/10 px-2 py-0.5 border border-[var(--color-gold)]/20">
                    {r.source}
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[var(--color-ivory-muted)] leading-relaxed italic mb-6">
                  "{r.commentVi}"
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                <div>
                  <span className="font-serif text-sm font-semibold text-[var(--color-ivory)] block">
                    {r.name}
                  </span>
                  <span className="font-sans text-[11px] text-[var(--color-ivory-dim)]">
                    {r.country}
                  </span>
                </div>
                <span className="font-mono text-xs text-[var(--color-gold)] font-bold">
                  {r.rating}
                </span>
              </div>
            </div>
          </AnimateInView>
        ))}
      </div>
    </section>
  );
}

