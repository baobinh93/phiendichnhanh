const categoryLabels: Record<string, string> = {
  "Tất cả": "📋 Tất cả",
  "Chào hỏi": "👋 Chào hỏi",
  "Mua sắm": "🛍️ Mua sắm",
  "Sân bay": "✈️ Sân bay",
  "Ăn uống": "🍜 Ăn uống",
  "Di chuyển": "🧭 Di chuyển",
  "Khẩn cấp": "🆘 Khẩn cấp",
  "Khách sạn": "🏨 Khách sạn",
};

export function CategoryCarousel({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="no-scrollbar flex shrink-0 gap-2 overflow-x-auto pb-1">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`shrink-0 rounded-full px-3.5 py-2 text-[11px] font-bold transition ${
            active === category
              ? "bg-teal-700 text-white shadow-sm"
              : "border border-slate-200 bg-white text-slate-600"
          }`}
        >
          {categoryLabels[category] || category}
        </button>
      ))}
    </div>
  );
}
