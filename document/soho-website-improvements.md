# Báo cáo cải thiện website sohoresidencehotel.vn

> Nguồn: kết quả check ngày 11/11/2026 từ 3 công cụ (Seobility, SEO Site Checkup, Google PageSpeed Insights – Mobile & Desktop).
> Mức ưu tiên: 🔴 Cao · 🟡 Trung bình · 🟢 Thấp

---

## 1. Seobility (seobility.net)

### Tổng quan
| Hạng mục | Điểm |
|---|---|
| **On-page score** | **63%** (4 lỗi critical) |
| Meta data | 84% |
| Page quality | 67% |
| Page structure | 100% |
| Links | 95% |
| Server | **0%** |
| External factors | **0%** |

Thông tin trang: status 200, Follow/Index, language EN, response time 0.80s, file size 98.6 kB, 890 từ.

### Việc cần cải thiện

#### 🔴 Lỗi (Error)
- [ ] **Redirect www ↔ non-www**: website đang truy cập được cả `www` và non-www → duplicate content. Cần 301 redirect về 1 phiên bản duy nhất (đang dùng canonical `https://sohoresidencehotel.vn/`).
- [ ] **Backlinks = 0**: không tìm thấy backlink nào trỏ về trang. Cần xây dựng backlink (Google Business Profile, Booking/Agoda/TripAdvisor, directory du lịch VN, báo/blog du lịch, đối tác…).

#### 🟡 Cảnh báo (Warning)
- [ ] **Title quá dài**: 619 px (giới hạn 580 px). Title hiện tại: `SOHO Residence & Hotel – Serviced Apartments in District 1, HCMC` → rút gọn.
- [ ] **Title chưa khớp nội dung**: một số từ trong title không xuất hiện trong nội dung trang.
- [ ] **H1 chưa khớp nội dung**: các từ trong H1 không có trong text. Lưu ý H1 đang bị **lỗi chính tả/thiếu khoảng trắng: "Comfortable living spacein the heart of Saigon"** → sửa thành "space in".
- [ ] **Anchor text internal link quá dài**: rút gọn anchor text.
- [ ] **Domain quá dài** (warning mức thấp).
- [ ] **Thiếu Apple touch icon** (Mobile optimization).
- [ ] **Ít social sharing option**: thêm nút chia sẻ mạng xã hội.
- [ ] **Header `X-Powered-By` đang bị lộ** → tắt để giảm lộ thông tin công nghệ (Next.js: `poweredByHeader: false`).
- [ ] **Response time 0.80s** (khuyến nghị ≤ 0.4s).

---

## 2. SEO Site Checkup (seositecheckup.com)

### Tổng quan
| Hạng mục | Điểm |
|---|---|
| **SEO Score** | **71/100** (trung bình top site: 75) |
| **AI Visibility** | **62/100** |
| Kết quả | 13 Failed · 4 Warnings · 46 Passed |
| Common SEO issues | 77 (3 failed) |
| Speed optimizations | 64 (5 failed) |
| Server & security | 68 (3 failed) |
| Mobile usability | 100 |
| Advanced SEO | 60 (2 failed) |

### Việc cần cải thiện

#### A. Common SEO
- [ ] 🟡 **Meta title 64 ký tự** → nên 20–60 ký tự.
- [ ] 🟡 **Meta description 149 ký tự** → nên 150–220 ký tự (thiếu 1 ký tự, nên viết lại dài và hấp dẫn hơn).
- [ ] 🔴 **Responsive images**: ảnh phục vụ lớn hơn kích thước viewport cần → dùng `srcset/sizes` đúng, resize ảnh theo breakpoint.
- [ ] 🟡 **Image aspect ratio**: kích thước hiển thị không khớp tỉ lệ gốc → ảnh bị méo; sửa width/height hoặc `object-fit`.
- [ ] 🟡 **Favicon** bị báo thiếu / tham chiếu sai (⚠️ Seobility báo favicon OK → nên kiểm tra lại `<link rel="icon">`, thêm `/favicon.ico` ở root).
- [ ] 🟢 **Keyword usage**: "balcony" có trong meta description nhưng không có trong title/headings; "check" không xuất hiện ở title/meta/headings.

#### B. Speed optimizations
- [ ] 🔴 **Thời gian tải 5.46s** (đo từ N. Virginia, trung bình 5s).
- [ ] 🔴 **FCP 4.424s** (mục tiêu ≤ 1.8s).
- [ ] 🔴 **LCP 4.69s** (mục tiêu ≤ 2.5s). Element LCP là **ảnh logo** (`soho-logo-remove-back...`) qua `next/image` → thêm `priority`/`fetchpriority="high"`, preload, bỏ `decoding="async"` + `loading` lazy cho ảnh LCP, giảm kích thước.
- [ ] 🔴 **Quá nhiều HTTP requests**: 64 requests, 1.36 MB (khuyến nghị ≤ 20).
  - JavaScript chiếm **62.7% (872 KB)**, 28 requests JS.
  - `maps.googleapis.com` chiếm 27% dung lượng (375 KB), 16 requests → **lazy-load Google Maps** (chỉ tải khi user cuộn tới / click).
  - `googletagmanager` 178 KB.
  - Font: 7 requests, 229 KB → giảm số font/weight, dùng `next/font`.
- [ ] 🔴 **Render-blocking resources** → defer/async JS, inline critical CSS.
- [ ] 🟡 **CDN usage**: chưa phục vụ toàn bộ ảnh/JS/CSS qua CDN → dùng Cloudflare/CDN.
- ✅ Đã tốt: gzip (82% savings), minify JS/CSS, cache headers, ảnh định dạng hiện đại, TTFB 0.253s, CLS 0, DOM 532 nodes.

#### C. Server & security
- [ ] 🔴 **URL canonicalization**: `https://sohoresidencehotel.vn/` và `https://www.sohoresidencehotel.vn/` không cùng resolve về 1 URL → 301 redirect (trùng với lỗi bên Seobility).
- [ ] 🟡 **Thiếu HSTS** (`Strict-Transport-Security`).
- [ ] 🟡 **Email dạng plaintext** (1 email trong HTML) → ẩn/obfuscate hoặc dùng form liên hệ để tránh spam harvester.

#### D. Advanced SEO
- [ ] 🟡 **Thiếu custom 404 page** → tạo trang 404 riêng (Next.js: `app/not-found.tsx`) kèm link điều hướng.
- [ ] 🟡 **Thiếu SPF record** (DNS) → thêm TXT record SPF để chống giả mạo email domain.
- [ ] 🟢 **Thiếu `ads.txt`** → chỉ cần nếu chạy quảng cáo hiển thị, có thể bỏ qua.
- [ ] 🟢 **Robots.txt có `Disallow`** → kiểm tra các đường dẫn bị chặn có chủ đích không.

#### E. AI Insights / Nội dung (điểm yếu về độ tin cậy)
- Content Trust Score **58%** (Topical relevance 95%, Subject expertise 72%, **Credibility 45%**).
- Content Freshness: 74%.
- Điểm yếu nội dung: chiều sâu biên tập hạn chế, **thiếu tín hiệu tin cậy** (reviews, thông tin đội ngũ/công ty, chính sách chi tiết), **FAQ chưa đầy đủ**.
- [ ] 🟡 **Hoàn thiện câu trả lời cho các câu hỏi FAQ** hiện hiển thị trên trang.
- [ ] 🟡 **Thêm khối testimonials/reviews** có tên khách hoặc nguồn booking (Booking, Google, TripAdvisor).
- [ ] 🟡 **Thêm hướng dẫn khu vực District 1**: điểm tham quan gần, thời gian đi bộ (Bùi Viện, Chợ Bến Thành…).
- [ ] 🟢 Thêm thông tin công ty/đội ngũ, chính sách (hủy phòng, check-in/out…).

---

## 3. Google PageSpeed Insights – MOBILE

### Điểm số
| Performance | Accessibility | Best Practices | SEO | Agentic browsing |
|:---:|:---:|:---:|:---:|:---:|
| **76** 🟠 | **92** | 100 | 100 | **2/3** |

### Core metrics
| Metric | Giá trị | Đánh giá |
|---|---|---|
| FCP | 1.1 s | ✅ Tốt |
| **LCP** | **5.4 s** | 🔴 Kém |
| TBT | 90 ms | ✅ Tốt |
| CLS | 0 | ✅ Tốt |
| **Speed Index** | **4.7 s** | 🟠 Cần cải thiện |

### Việc cần cải thiện
**Performance**
- [ ] 🔴 **LCP 5.4s**: xử lý các insight liên quan — *LCP breakdown*, *LCP request discovery* (ảnh LCP phải được phát hiện sớm trong HTML, có `fetchpriority="high"`/preload, không lazy-load), *Network dependency tree* (giảm chuỗi request phụ thuộc).
- [ ] 🔴 **Render-blocking requests**: tiết kiệm ước tính **420 ms**.
- [ ] 🔴 **Legacy JavaScript**: tiết kiệm ~**14 KiB** (bỏ polyfill/transpile không cần thiết, cập nhật browserslist).
- [ ] 🟡 **Improve image delivery**: tiết kiệm ~**13 KiB** (nén, đúng kích thước, định dạng WebP/AVIF).
- [ ] 🔴 **Reduce unused JavaScript**: ~**124 KiB** (code splitting, dynamic import, lazy-load Maps/GTM).
- [ ] 🟡 **Long main-thread tasks**: 3 tasks.
- [ ] 🟢 Tối ưu DOM size, kiểm soát third-party scripts.

**Accessibility (92)**
- [ ] 🟡 **Contrast ratio** màu nền/chữ chưa đủ.
- [ ] 🟡 **Touch targets** chưa đủ kích thước/khoảng cách (chỉ báo ở mobile).
- [ ] 🟢 Các link giống nhau nên cùng mục đích (identical links).

**Best Practices (100) – gợi ý bảo mật thêm**
- [ ] 🟢 CSP hiệu quả chống XSS, HSTS mạnh, COOP, chống clickjacking (XFO/CSP), Trusted Types.

**Agentic browsing (2/3)**
- [ ] 🟢 `llms.txt` chưa theo khuyến nghị.

---

## 4. Google PageSpeed Insights – DESKTOP

### Điểm số
| Performance | Accessibility | Best Practices | SEO | Agentic browsing |
|:---:|:---:|:---:|:---:|:---:|
| **68** 🟠 | **96** | 100 | 100 | **2/4** |

### Core metrics
| Metric | Giá trị | Đánh giá |
|---|---|---|
| FCP | 0.5 s | ✅ Tốt |
| LCP | 1.9 s | 🟠 Cần cải thiện |
| **TBT** | **460 ms** | 🔴 Kém |
| CLS | 0 | ✅ Tốt |
| Speed Index | 1.9 s | 🟠 Cần cải thiện |

### Việc cần cải thiện
**Performance** (điểm yếu chính: JavaScript nặng)
- [ ] 🔴 **TBT 460 ms** & **Reduce JavaScript execution time: 1.3 s**.
- [ ] 🔴 **Reduce unused JavaScript**: ~**351 KiB** (nhiều hơn hẳn mobile → ưu tiên code splitting, lazy-load Google Maps, GTM, các thư viện UI/animation).
- [ ] 🔴 **Improve image delivery**: ~**86 KiB**.
- [ ] 🔴 **Legacy JavaScript**: ~14 KiB.
- [ ] 🔴 **Forced reflow**: tránh đọc layout (offsetHeight, getBoundingClientRect…) ngay sau khi ghi DOM.
- [ ] 🔴 **LCP request discovery** & **Network dependency tree**.
- [ ] 🟡 **Efficient cache lifetimes**: ~3 KiB.
- [ ] 🟡 **Render-blocking requests**.
- [ ] 🟡 **Long main-thread tasks**: **10 tasks** (chia nhỏ task, defer script không cần thiết).
- [ ] 🟢 Tối ưu DOM size, LCP breakdown, third-party.

**Accessibility (96)**
- [ ] 🟡 **Contrast ratio** chưa đủ (cần sửa chung với mobile).

**Agentic browsing (2/4)**
- [ ] 🟢 `llms.txt` chưa theo khuyến nghị.
- [ ] 🟢 `ai-catalog.json` không hợp lệ (*"Catalogue file could not be loaded for schema validation"*) → tạo/sửa file hoặc bỏ qua nếu không cần.

---

## 5. Tổng hợp chung – các việc trùng lặp giữa nhiều công cụ

Những vấn đề được **nhiều công cụ cùng báo** nên ưu tiên xử lý trước:

| # | Vấn đề | Seobility | SEO Site Checkup | PSI Mobile | PSI Desktop |
|---|---|:---:|:---:|:---:|:---:|
| 1 | **LCP chậm** (ảnh logo/hero, request discovery) | – | ✔ 4.69s | ✔ 5.4s | ✔ 1.9s |
| 2 | **Render-blocking resources** | – | ✔ | ✔ | ✔ |
| 3 | **JavaScript thừa/nặng** (unused JS, legacy JS, quá nhiều request) | – | ✔ | ✔ 124 KiB | ✔ 351 KiB |
| 4 | **Ảnh chưa tối ưu** (kích thước, aspect ratio, delivery) | – | ✔ | ✔ 13 KiB | ✔ 86 KiB |
| 5 | **www / non-www chưa redirect 301** | ✔ | ✔ | – | – |
| 6 | **Thiếu HSTS / security headers** | – | ✔ | ✔ (gợi ý) | ✔ (gợi ý) |
| 7 | **Contrast ratio** | – | – | ✔ | ✔ |
| 8 | **Title quá dài** (619px / 64 ký tự) | ✔ | ✔ | – | – |
| 9 | **H1 lỗi "spacein" + chưa khớp nội dung** | ✔ | ✔ (hiển thị trong H1 tags) | – | – |
| 10 | **Thiếu backlinks** | ✔ | ✔ (upsell) | – | – |
| 11 | **Favicon** | ✔ (OK) | ✔ (báo lỗi) | – | – |
| 12 | **Thiếu `llms.txt` / `ai-catalog.json`** | – | – | ✔ | ✔ |

---

## 6. Checklist ưu tiên đề xuất

### 🔴 Làm ngay (ảnh hưởng lớn nhất)
1. 301 redirect `www` → non-www (hoặc ngược lại) + giữ canonical thống nhất.
2. Tối ưu LCP: preload/`priority` cho ảnh LCP, giảm kích thước logo/hero, không lazy-load ảnh above-the-fold.
3. Lazy-load Google Maps và GTM (giảm ~375 KB + 178 KB, giảm request).
4. Code splitting / dynamic import, loại bỏ unused + legacy JS; xử lý render-blocking.
5. Tối ưu ảnh: `srcset/sizes` đúng, WebP/AVIF, sửa aspect ratio.
6. Sửa H1 ("space in"), rút gọn title ≤ 60 ký tự / < 580 px.

### 🟡 Làm tiếp theo
7. Thêm HSTS, tắt `X-Powered-By`, ẩn plaintext email.
8. Tạo custom 404 page, kiểm tra favicon + Apple touch icon.
9. Viết lại meta description (150–220 ký tự).
10. Sửa contrast ratio và touch target.
11. Bổ sung FAQ đầy đủ, testimonials, trang/phần hướng dẫn khu vực District 1.
12. Thiết lập SPF record cho email domain.
13. Dùng CDN cho toàn bộ static assets; giảm thời gian response (≤ 0.4s).

### 🟢 Nice to have
14. Nút chia sẻ mạng xã hội, rút gọn anchor text dài.
15. Xây dựng backlink (GBP, OTA, directory, blog du lịch).
16. `llms.txt` / `ai-catalog.json`, CSP/COOP/XFO/Trusted Types.
17. Kiểm tra `Disallow` trong robots.txt; `ads.txt` (chỉ khi cần).

---

## Ghi chú
- Điểm PSI là lab data (Lighthouse), mô phỏng Moto G Power + 4G chậm cho mobile; **chưa có dữ liệu người dùng thật** ("No data" ở Field data).
- Các mục "Visual SEO Analysis", "LLM Visibility Checker", "Competitor Domains", "Related Keywords" của SEO Site Checkup bị khóa (cần gói trả phí), nên chưa có dữ liệu.
- Seobility và SEO Site Checkup mâu thuẫn ở mục favicon → nên tự kiểm tra bằng DevTools.
