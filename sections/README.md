# Hướng dẫn nhúng mã code từng Section vào Hostinger

## 📋 Cách sử dụng

Mỗi section có 3 phần:
1. **HTML** - Cấu trúc nội dung
2. **CSS** - Kiểu dáng giao diện  
3. **JS** - Chức năng tương tác (nếu có)

### Bước 1: Thêm CSS vào `<head>`
Sao chép nội dung CSS vào phần `<head>` của trang hoặc file CSS chung.

### Bước 2: Thêm HTML vào vị trí mong muốn
Dán HTML vào nơi bạn muốn hiển thị section.

### Bước 3: Thêm JS vào cuối `<body>` (nếu có)
Dán JavaScript trước thẻ đóng `</body>`.

---

## 📁 Danh sách Sections

| File | Section | Mô tả |
|------|---------|-------|
| `01-hero.html` | Hero Section | Banner chính với CTA |
| `02-pain-points.html` | Pain Points | Vấn đề khách hàng gặp phải |
| `03-comparison.html` | Comparison | So sánh với agency |
| `04-solution.html` | Solution + Popup | Giải pháp với popup chi tiết |
| `05-process.html` | Process | Quy trình làm việc 4 bước |
| `06-pricing.html` | Pricing | Bảng giá 3 gói |
| `07-portfolio.html` | Portfolio | Dự án đã thực hiện |
| `08-testimonials.html` | Testimonials | Đánh giá khách hàng |
| `09-faq.html` | FAQ | Câu hỏi thường gặp |
| `10-cta.html` | CTA Section | Kêu gọi hành động |
| `11-contact.html` | Contact | Form liên hệ |
| `base-styles.css` | CSS cơ bản | Variables & Typography |

---

## ⚡ Mẹo Hostinger

1. **Sử dụng Custom HTML Block**: Trong trình chỉnh sửa Hostinger, thêm block "Custom HTML" và dán code vào.

2. **CSS riêng**: Vào **Settings > Custom Code > CSS** để thêm CSS.

3. **JS riêng**: Vào **Settings > Custom Code > Footer Scripts** để thêm JavaScript.

4. **Font Inter**: Thêm dòng này vào `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

---

## 🎨 CSS Variables (Bắt buộc)

Thêm vào đầu CSS của bạn để các section hoạt động:

```css
:root {
    --primary: #6366f1;
    --primary-dark: #4f46e5;
    --secondary: #0ea5e9;
    --accent: #f59e0b;
    --success: #10b981;
    --danger: #ef4444;
    --dark: #0f172a;
    --gray-500: #6b7280;
    --gray-100: #f3f4f6;
    --white: #ffffff;
    --gradient: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
}
```
