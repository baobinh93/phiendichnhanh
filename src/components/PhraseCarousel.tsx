import { Check } from "lucide-react";
import type { Phrase, Lang } from "../App";

export function PhraseCarousel({
  phrases,
  selectedId,
  target,
  onSelect,
}: {
  phrases: Phrase[];
  selectedId?: number;
  target: Lang;
  onSelect: (p: Phrase) => void;
}) {
  const getRomanization = (phrase: Phrase): string => {
    const romanMap: Record<Lang, string | undefined> = {
      vi: phrase.roman_vi,
      th: phrase.roman_th,
      en: phrase.roman_en,
      zh: phrase.roman_zh,
      ja: phrase.roman_ja,
      ko: phrase.roman_ko,
    };

    return romanMap[target] || "";
  };

  return (
    <div className="no-scrollbar flex h-full snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden pb-1">
      {phrases.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect(p)}
          className={`relative flex h-full min-h-[132px] w-[148px] shrink-0 snap-start flex-col rounded-2xl border p-3 text-left transition active:scale-[.98] ${
            selectedId === p.id
              ? "border-teal-600 bg-teal-50 ring-1 ring-teal-600"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">{p.icon}</span>

            {selectedId === p.id && (
              <span className="grid h-5 w-5 place-items-center rounded-full bg-teal-700 text-white">
                <Check size={12} />
              </span>
            )}
          </div>

          <strong className="mt-2 line-clamp-2 text-[12px] leading-snug text-slate-800">
            {p.vi}
          </strong>

          <span className="mt-1 line-clamp-1 text-[10px] text-slate-400">
            {getRomanization(p)}
          </span>

          <span className="mt-auto line-clamp-2 pt-2 text-[12px] font-bold text-teal-800">
            {p[target] || ""}
          </span>
        </button>
      ))}
    </div>
  );
}
