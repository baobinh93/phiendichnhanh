# Phiên Dịch Nhanh — React + Tailwind PWA

## Chạy local
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Cấu trúc chính
- `src/App.tsx`: state và ghép các component.
- `src/components/`: Header, chọn ngôn ngữ, translation card, source card, carousel danh mục và carousel cụm từ.
- `public/data/`: các file JSON ngôn ngữ/cụm từ.
- Tailwind CSS v3.
- Giao diện cố định trong một viewport điện thoại (`h-dvh`, `overflow-hidden`); chỉ danh mục và cụm từ cuộn ngang.
- Đã loại bỏ các chức năng nhập giọng nói và đọc âm thanh.
