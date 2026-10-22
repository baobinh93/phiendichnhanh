import { useEffect, useMemo, useState } from "react";
import { Search, X, Heart } from "lucide-react";

import { Header } from "./components/Header";
import { TranslationCard } from "./components/TranslationCard";
import { SourceCard } from "./components/SourceCard";
import { CategoryCarousel } from "./components/CategoryCarousel";
import { PhraseCarousel } from "./components/PhraseCarousel";

export type Lang = "vi" | "th" | "en" | "zh" | "ja" | "ko";

export type Phrase = {
  id: number;
  icon: string;
  category: string;
  vi: string;
  th: string;
  en: string;
  zh: string;
  ja: string;
  ko: string;
  roman: string;
  roman_vi?: string;
  roman_th?: string;
  roman_en?: string;
  roman_zh?: string;
  roman_ja?: string;
  roman_ko?: string;
};

export type Language = {
  code: Lang;
  label: string;
  native: string;
  speech: string;
};

const codes: Lang[] = ["vi", "th", "en", "zh", "ja", "ko"];

const fallback: Language[] = [
  { code: "vi", label: "Tiếng Việt", native: "VI", speech: "vi-VN" },
  { code: "th", label: "Tiếng Thái", native: "TH", speech: "th-TH" },
  { code: "en", label: "Tiếng Anh", native: "EN", speech: "en-US" },
  { code: "zh", label: "Tiếng Trung", native: "ZH", speech: "zh-CN" },
  { code: "ja", label: "Tiếng Nhật", native: "JA", speech: "ja-JP" },
  { code: "ko", label: "Tiếng Hàn", native: "KO", speech: "ko-KR" },
];

type PhrasePackItem = {
  id: number;
  icon: string;
  category: string;
  text: string;
  roman?: string;
  roman_vi?: string;
  roman_th?: string;
  roman_en?: string;
  roman_zh?: string;
  roman_ja?: string;
  roman_ko?: string;
};

async function loadData() {
  const [lr, ...prs] = await Promise.all([
    fetch("/data/languages.json"),
    ...codes.map((c) => fetch(`/data/phrases-${c}.json`)),
  ]);

  if (!lr.ok || prs.some((r) => !r.ok)) {
    throw Error("Không tải được dữ liệu");
  }

  const languages: Language[] = await lr.json();

  const packs = (await Promise.all(
    prs.map((r) => r.json()),
  )) as PhrasePackItem[][];

  const map = new Map<number, Record<string, any>>();

  codes.forEach((code, index) => {
    packs[index].forEach((item) => {
      const row = map.get(item.id) || {
        id: item.id,
        icon: item.icon,
        category: item.category,
      };

      // Nội dung câu theo ngôn ngữ
      row[code] = item.text;

      // Đọc phiên âm theo cấu trúc JSON mới
      const romanKey = `roman_${code}`;

      if (code === "vi") {
        row.roman_vi = item.roman_vi || "";
      } else {
        row[romanKey] =
          item[romanKey as keyof PhrasePackItem] || item.roman || "";
      }

      map.set(item.id, row);
    });
  });

  const phrases = [...map.values()].map((item) => ({
    ...item,
    vi: item.vi || "",
    th: item.th || "",
    en: item.en || "",
    zh: item.zh || "",
    ja: item.ja || "",
    ko: item.ko || "",
    roman: item.roman_th || "",
  })) as Phrase[];

  return { languages, phrases };
}

const categories = [
  "Tất cả",
  "Chào hỏi",
  "Mua sắm",
  "Sân bay",
  "Ăn uống",
  "Di chuyển",
  "Khẩn cấp",
  "Khách sạn",
];

export default function App() {
  const [languages, setLanguages] = useState(fallback);
  const [phrases, setPhrases] = useState<Phrase[]>([]);

  const [from, setFrom] = useState<Lang>("vi");
  const [to, setTo] = useState<Lang>("th");
  const [source, setSource] = useState("Xin chào");

  const [selected, setSelected] = useState<Phrase | null>(null);
  const [category, setCategory] = useState("Tất cả");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    loadData()
      .then((data) => {
        setLanguages(data.languages);
        setPhrases(data.phrases);
        setSelected(data.phrases[0] || null);
      })
      .catch(() => {
        setNotice("Không tải được dữ liệu ngôn ngữ.");
      });
  }, []);

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => setNotice(""), 2200);

    return () => window.clearTimeout(timer);
  }, [notice]);

  const shown = useMemo(
    () =>
      phrases.filter(
        (phrase) =>
          (category === "Tất cả" || phrase.category === category) &&
          (!query ||
            [
              phrase.vi,
              phrase.th,
              phrase.en,
              phrase.zh,
              phrase.ja,
              phrase.ko,
            ].some((text) =>
              (text || "").toLowerCase().includes(query.toLowerCase()),
            )),
      ),
    [phrases, category, query],
  );

  const lang = (code: Lang) =>
    languages.find((language) => language.code === code) ||
    fallback.find((language) => language.code === code)!;

  // Lấy phiên âm đúng với ngôn ngữ đích đang chọn
  const roman = (phrase: Phrase | null) => {
    if (!phrase) return "";

    const romanByLanguage: Record<Lang, string | undefined> = {
      vi: phrase.roman_vi,
      th: phrase.roman_th,
      en: phrase.roman_en,
      zh: phrase.roman_zh,
      ja: phrase.roman_ja,
      ko: phrase.roman_ko,
    };

    return romanByLanguage[to] || "";
  };

  const translate = () => {
    const q = source.trim().toLowerCase();

    if (!q) {
      setNotice("Bạn hãy nhập câu cần tra cứu.");
      return;
    }

    const found =
      phrases.find((phrase) =>
        codes.some((code) => (phrase[code] || "").toLowerCase() === q),
      ) ||
      phrases.find((phrase) => (phrase[from] || "").toLowerCase().includes(q));

    setSelected(found || null);

    setNotice(
      found
        ? "Đã tìm thấy trong sổ tay offline"
        : "Chưa có câu này trong sổ tay offline",
    );
  };

  const choose = (phrase: Phrase) => {
    setSelected(phrase);
    setSource(phrase[from] || phrase.vi);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(selected?.[to] || "");
      setNotice("Đã sao chép bản dịch");
    } catch {
      setNotice("Không thể sao chép trên trình duyệt này");
    }
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setSource(selected?.[to] || "");
  };

  const [installEvent, setInstallEvent] = useState<any>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const install = async () => {
    if (installEvent) {
      await installEvent.prompt();
      setInstallEvent(null);
    } else {
      setNotice(
        "Trên iPhone: Chia sẻ → Thêm vào MH. Android: menu ⋮ → Cài đặt ứng dụng.",
      );
    }
  };

  return (
    <div className="h-dvh w-full overflow-hidden bg-[#f5f7f8] text-slate-900">
      <div className="mx-auto flex h-full w-full max-w-md flex-col px-4 pb-3 pt-[max(10px,env(safe-area-inset-top))]">
        <Header
          onInstall={install}
          sourceLanguage={from}
          targetLanguage={to}
          onSourceLanguageChange={(code) => setFrom(code as Lang)}
          onTargetLanguageChange={(code) => setTo(code as Lang)}
        />

        <div className="mt-3 shrink-0">
          <TranslationCard
            language={lang(to)}
            text={selected?.[to] || ""}
            roman={roman(selected)}
            onCopy={copy}
          />
        </div>

        <div className="mt-3 shrink-0">
          <SourceCard
            language={lang(from)}
            value={source}
            onChange={setSource}
            onTranslate={translate}
          />
        </div>

        <section className="mt-4 flex min-h-0 flex-1 flex-col">
          <div className="mb-2 flex shrink-0 items-center justify-between gap-2">
            <h2 className="text-sm font-extrabold tracking-tight">
              Cụm từ du lịch
            </h2>

            <span className="text-[11px] text-slate-500">
              {shown.length} câu
            </span>
          </div>

          <div className="relative mb-2 shrink-0">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm nhanh cụm từ..."
              className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-9 text-sm outline-none focus:border-teal-600"
            />

            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Xóa nội dung tìm kiếm"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <CategoryCarousel
            categories={categories}
            active={category}
            onChange={setCategory}
          />

          <div className="mt-2 min-h-0 flex-1">
            <PhraseCarousel
              phrases={shown}
              selectedId={selected?.id}
              target={to}
              onSelect={choose}
            />
          </div>
        </section>

        <div className="flex shrink-0 items-center justify-center gap-1 pt-2 text-[10px] text-slate-400">
          <Heart size={12} />
          From Bảo Bình With love
        </div>

        {notice && (
          <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-lg">
            {notice}
          </div>
        )}
      </div>
    </div>
  );
}
