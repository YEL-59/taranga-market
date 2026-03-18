"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

const GBFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-full h-full">
    <path fill="#012169" d="M0 0h640v480H0z"/>
    <path fill="#FFF" d="m75 0 245 180L565 0h75v55L400 240l240 175v65h-75L320 300 75 480H0v-55l240-175L0 75V0h75z"/>
    <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zM216 199 0 40V0l271 199h-55zm225 0L640 40V0L369 199h72zM0 440l216-159h55L0 480v-40z"/>
    <path fill="#FFF" d="M240 0h160v480H240zM0 160h640v160H0z"/>
    <path fill="#C8102E" d="M280 0h80v480h-80zM0 200h640v80H0z"/>
  </svg>
);

const FRFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-full h-full">
    <path fill="#fff" d="M0 0h640v480H0z"/>
    <path fill="#002395" d="M0 0h213.3v480H0z"/>
    <path fill="#ed2939" d="M426.7 0H640v480H426.7z"/>
  </svg>
);

const locales = [
  { code: "en", label: "ENGLISH", flag: <GBFlag /> },
  { code: "fr", label: "FRANÇAIS", flag: <FRFlag /> },
] as const;

type LocaleCode = (typeof locales)[number]["code"];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const active = locales.find((l) => l.code === locale) ?? locales[0];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSwitch = (code: LocaleCode) => {
    setIsOpen(false);
    if (code === locale || isPending) return;
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000; SameSite=Lax`;
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div ref={containerRef} className="relative" role="group" aria-label="Language switcher">

      {/* ── Trigger button ── */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`
          flex items-center gap-2
          pl-3 pr-2.5 py-2
          bg-white border border-gray-200
          rounded-full
          shadow-[0_1px_4px_rgba(0,0,0,0.07)]
          hover:border-[#227c85]/40 hover:shadow-[0_2px_8px_rgba(34,124,133,0.12)]
          transition-all duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#227c85]/40
          select-none
          ${isPending ? "opacity-60 cursor-wait" : "cursor-pointer"}
        `}
      >
        {/* Flag */}
        <div className="w-5 h-4 overflow-hidden shadow-sm shrink-0">
          {active.flag}
        </div>

        {/* Chevron */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className="flex items-center"
        >
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" strokeWidth={2.5} />
        </motion.span>
      </button>

      {/* ── Dropdown panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dropdown"
            role="listbox"
            aria-label="Select language"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="
              absolute top-[calc(100%+8px)] right-0 z-50
              min-w-[180px]
              bg-white
              border border-gray-100
              rounded-2xl
              shadow-[0_8px_30px_rgba(0,0,0,0.12)]
              py-2 overflow-hidden
            "
          >
            {locales.map(({ code, label, flag }) => {
              const isActive = locale === code;
              return (
                <button
                  key={code}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSwitch(code)}
                  className={`
                    w-full flex items-center gap-3
                    px-4 py-3
                    text-left
                    transition-colors duration-150
                    focus:outline-none
                    ${isActive
                      ? "bg-[#227c85]/5 text-[#1a5f66]"
                      : "text-gray-700 hover:bg-gray-50/80"
                    }
                  `}
                >
                  {/* Flag */}
                  <div className="w-6 h-4.5 rounded overflow-hidden shadow-sm shrink-0">
                    {flag}
                  </div>

                  {/* Language Name */}
                  <span className={`text-[13px] font-bold tracking-widest flex-1 ${isActive ? "text-[#1a5f66]" : "text-gray-700"}`}>
                    {label}
                  </span>

                  {/* Active checkmark */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        key="check"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 22 }}
                        className="shrink-0"
                      >
                        <Check className="w-4 h-4 text-[#227c85]" strokeWidth={2.5} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
