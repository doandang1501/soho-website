import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-24 text-center">
      <span className="font-serif text-7xl sm:text-9xl text-[var(--color-gold)] font-light mb-4 tracking-wider">
        404
      </span>
      <h1 className="font-serif text-2xl sm:text-4xl text-[var(--color-ivory)] mb-4">
        Trang không tìm thấy • Page Not Found
      </h1>
      <p className="font-sans text-sm sm:text-base text-[var(--color-ivory-dim)] max-w-md mx-auto mb-8 leading-relaxed">
        Trang bạn đang tìm kiếm có thể đã bị di chuyển, xóa hoặc địa chỉ URL không tồn tại.
      </p>
      <Link
        href="/"
        className="
          inline-flex items-center gap-3
          bg-[var(--color-gold)] text-[var(--color-charcoal)]
          font-sans font-semibold text-xs tracking-[0.18em] uppercase
          px-8 py-4 transition-all duration-300
          hover:bg-[var(--color-gold-light)] hover:shadow-gold
          active:scale-95
        "
      >
        Về trang chủ • Back to Home →
      </Link>
    </div>
  );
}

