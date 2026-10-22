import { Copy, Languages, Check } from "lucide-react";
import type { Language } from "../App";
export function TranslationCard({
  language,
  text,
  roman,
  onCopy,
}: {
  language: Language;
  text: string;
  roman: string;
  onCopy: () => void;
}) {
  return (
    <section className="flex min-h-[180px] flex-col rounded-[22px] bg-gradient-to-br from-teal-800 to-teal-700 p-4 text-white shadow-md shadow-teal-900/10">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
          {language.label} · BẢN DỊCH
        </span>
        <button
          onClick={onCopy}
          aria-label="Sao chép bản dịch"
          className="grid h-8 w-8 place-items-center rounded-lg bg-white/10"
        >
          <Copy size={16} />
        </button>
      </div>
      <div
        className="mt-3 min-h-9 text-[25px] font-bold leading-tight tracking-tight"
        lang={language.speech}
      >
        {text || "Chọn một cụm từ bên dưới"}
      </div>
      {roman && (
        <div className="mt-1 truncate text-xs text-teal-100/90">{roman}</div>
      )}
    </section>
  );
}
