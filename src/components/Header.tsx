import { useState } from 'react';
import { Download, MessageCircle, ChevronDown, Check } from 'lucide-react';

type LangCode = 'vi' | 'th' | 'en' | 'zh' | 'ja' | 'ko';
type HeaderProps = {
  onInstall: () => void;
  sourceLanguage: LangCode;
  targetLanguage: LangCode;
  onSourceLanguageChange: (code: LangCode) => void;
  onTargetLanguageChange: (code: LangCode) => void;
};

const LANGUAGES: { code: LangCode; label: string }[] = [
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'th', label: 'Tiếng Thái' },
  { code: 'en', label: 'Tiếng Anh' },
  { code: 'zh', label: 'Tiếng Trung' },
  { code: 'ja', label: 'Tiếng Nhật' },
  { code: 'ko', label: 'Tiếng Hàn' },
];

export function Header({ onInstall, sourceLanguage, targetLanguage, onSourceLanguageChange, onTargetLanguageChange }: HeaderProps) {
  const [openDropdown, setOpenDropdown] = useState<'source' | 'target' | null>(null);
  const source = LANGUAGES.find((lang) => lang.code === sourceLanguage) ?? LANGUAGES[0];
  const target = LANGUAGES.find((lang) => lang.code === targetLanguage) ?? LANGUAGES[1];

  const renderDropdown = (type: 'source' | 'target', selectedCode: LangCode) => {
    if (openDropdown !== type) return null;
    const onSelect = type === 'source' ? onSourceLanguageChange : onTargetLanguageChange;
    return (
      <>
        <button type="button" aria-label="Đóng danh sách ngôn ngữ" className="fixed inset-0 z-40 cursor-default" onClick={() => setOpenDropdown(null)} />
        <div className="absolute left-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
          {LANGUAGES.map((lang) => (
            <button key={lang.code} type="button" onClick={() => { onSelect(lang.code); setOpenDropdown(null); }} className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs font-semibold ${selectedCode === lang.code ? 'bg-teal-50 text-teal-700' : 'text-slate-700 hover:bg-slate-50'}`}>
              <span>{lang.label}</span>{selectedCode === lang.code && <Check size={14} className="shrink-0" />}
            </button>
          ))}
        </div>
      </>
    );
  };

  return (
    <header className="flex shrink-0 items-center gap-3 pb-1">
      <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-teal-700 text-white shadow-sm">
        <MessageCircle size={23} fill="currentColor" />
        <span className="absolute text-[9px] font-black tracking-widest text-teal-700">•••</span>
      </div>
      <div className="min-w-0 flex-1">
        <h1 className="text-[18px] font-black leading-tight tracking-tight">Phiên Dịch Nhanh</h1>
        <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold">
          <div className="relative">
            <button type="button" aria-expanded={openDropdown === 'source'} onClick={() => setOpenDropdown((prev) => prev === 'source' ? null : 'source')} className="inline-flex max-w-[112px] items-center gap-1 rounded-md py-1 text-teal-700">
              <span className="truncate">{source.label}</span><ChevronDown size={12} className="shrink-0" />
            </button>
            {renderDropdown('source', source.code)}
          </div>
          <span className="shrink-0 text-slate-400">→</span>
          <div className="relative">
            <button type="button" aria-expanded={openDropdown === 'target'} onClick={() => setOpenDropdown((prev) => prev === 'target' ? null : 'target')} className="inline-flex max-w-[112px] items-center gap-1 rounded-md py-1 text-teal-700">
              <span className="truncate">{target.label}</span><ChevronDown size={12} className="shrink-0" />
            </button>
            {renderDropdown('target', target.code)}
          </div>
        </div>
      </div>
      <button type="button" onClick={onInstall} aria-label="Cài ứng dụng" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 active:bg-slate-50"><Download size={18} /></button>
    </header>
  );
}
