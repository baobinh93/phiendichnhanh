import { ArrowRight, Languages } from "lucide-react";
import type { Language } from "../App";
export function SourceCard({
  language,
  value,
  onChange,
  onTranslate,
}: {
  language: Language;
  value: string;
  onChange: (v: string) => void;
  onTranslate: () => void;
}) {
  return (
    <section className="rounded-[20px] border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wide text-slate-500">
          <span className="grid h-6 w-6 place-items-center rounded-lg bg-slate-100 text-[9px] text-slate-700">
            {language.native}
          </span>
          Tiếng gốc · {language.label}
        </span>
      </div>
      {/* <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        placeholder=""
        className="block w-full resize-none bg-transparent text-[15px] leading-snug outline-none placeholder:text-slate-300"
      /> */}
      <div className=" w-full resize-none bg-transparent text-[15px] leading-snug outline-none placeholder:text-slate-300">
        {value}
      </div>
    </section>
  );
}
