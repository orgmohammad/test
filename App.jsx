
// src/App.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaTelegramPlane, FaMoon, FaSun } from "react-icons/fa";

/*
  PXR Landing - Single file React component
  - Requires: Tailwind CSS (dark mode = 'class'), framer-motion, react-icons
  - Image: place your uploaded image at public/photo_2025-10-22_10-57-52.jpg
*/

const TRANSLATIONS = {
  fa: {
    label: "فارسی",
    dir: "rtl",
    heroTitle: "محمد امین اسماعیلی — بنیان‌گذار سبک معاملاتی PXR",
    heroSubtitle:
      "PXR ترکیبی از Smart Money، ICT و Liquidity Insight است؛ الگوهایی ساده و قدرتمند برای درک پشت‌صحنهٔ بازار.",
    aboutTitle: "دربارهٔ من",
    aboutText:
      `من محمد امین اسماعیلی هستم — بنیان‌گذار سبک معاملاتی PXR. بیش از ۳ سال تجربه در بازار فارکس دارم و در طول این مسیر، با تحقیق، آزمون و ترکیب چندین سبک تحلیلی مختلف، توانستم سیستمی منحصر‌به‌فرد طراحی کنم که نتیجه‌ی ادغام Smart Money + ICT + Liquidity Insight است.\n\n` +
      `PXR همهٔ مفاهیم پیچیده را به الگوهای ساده و قابل‌اجرا تبدیل می‌کند. شما با ترندلاین اختصاصی PXR پس از شکست وارد معامله می‌شوید و نسبت ریسک به ریوارد (R/R) بالای ۶ یا بیشتر می‌گیرید؛ در حالی که پشت پرده آن MSS و برخورد با Order Block بوده است.\n\n` +
      `تمام مسیر ۳ سالهٔ تجربهٔ من را در قالب یک سیستم آموزشی سه‌ماهه خلاصه کرده‌ام تا بدون اتلاف وقت به درک و سودآوری منطقی برسید.`,
    pxrTitle: "PXR چیست؟",
    pxrBullets: [
      "ترکیب ICT، Smart Money و Liquidity",
      "الگوهای قابل تکرار (Patternization)",
      "ورودهای با منطق و مدیریت ریسک روشن",
    ],
    coursesTitle: "دوره‌ها",
    contactTitle: "تماس",
    instagram: "https://instagram.com/mohammadamin.fx",
    telegram: "https://t.me/mohammadaminfxx",
    ctaPrimary: "شروع مسیر PXR",
    ctaSecondary: "مشاهده دوره‌ها",
  },
  en: {
    label: "English",
    dir: "ltr",
    heroTitle: "Mohamad Amin Esmaeili — Founder of PXR",
    heroSubtitle:
      "PXR blends Smart Money, ICT and Liquidity Insight into simple, powerful patterns to read the market's backstage.",
    aboutTitle: "About Me",
    aboutText:
      `I'm Mohamad Amin Esmaeili — founder of PXR. With 3+ years in Forex, I designed PXR by combining Smart Money, ICT and Liquidity Insight into a unique, practice-ready system.\n\n` +
      `PXR turns complex concepts into repeatable patterns. Using a PXR-specific trendline you learn to enter after a break and achieve R/R > 6, while behind the break an MSS and OB interaction often exist.\n\n` +
      `I condensed 3 years of experience into an intensive 3-month program so you can reach clarity and consistent execution faster.`,
    pxrTitle: "What is PXR?",
    pxrBullets: [
      "Combines ICT, Smart Money & Liquidity",
      "Pattern-based repeatable setups",
      "Rule-based entries and risk-first approach",
    ],
    coursesTitle: "Courses",
    contactTitle: "Contact",
    instagram: "https://instagram.com/mohammadamin.fx",
    telegram: "https://t.me/mohammadaminfxx",
    ctaPrimary: "Start PXR Journey",
    ctaSecondary: "View Courses",
  },
  ar: {
    label: "العربية",
    dir: "rtl",
    heroTitle: "محمد أمين إسماعيلي — مؤسس PXR",
    heroSubtitle:
      "PXR يجمع Smart Money وICT وفهم السيولة في أنماط بسيطة وقوية لقراءة خلفية السوق.",
    aboutTitle: "عني",
    aboutText:
      `أنا محمد أمين إسماعيلي — مؤسس PXR. بخبرة أكثر من 3 سنوات في الفوركس، طورت PXR بدمج Smart Money وICT وفهم السيولة في نظام عملي فريد.\n\n` +
      `PXR يحول المفاهيم المعقدة إلى أنماط قابلة للتكرار. باستخدام ترندلاين مميز من PXR تتعلم الدخول بعد الكسر والحصول على R/R أكبر من 6، بينما وراء الكسر غالبًا ما يكون هناك MSS وتفاعل مع Order Block.\n\n` +
      `لخصت 3 سنوات من التجربة في برنامج مكثف خلال 3 أشهر لتصل إلى الوضوح والتنفيذ المنهجي أسرع.`,
    pxrTitle: "ما هو PXR؟",
    pxrBullets: [
      "يجمع ICT وSmart Money والسيولة",
      "إعدادات قابلة للتكرار على شكل أنماط",
      "قواعد دخول وإدارة مخاطرة واضحة",
    ],
    coursesTitle: "الدورات",
    contactTitle: "اتصل",
    instagram: "https://instagram.com/mohammadamin.fx",
    telegram: "https://t.me/mohammadaminfxx",
    ctaPrimary: "ابدأ الآن",
    ctaSecondary: "شاهد الدورات",
  },
};

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("pxr_lang") || "fa");
  const [theme, setTheme] = useState(() => localStorage.getItem("pxr_theme") || "dark");
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    // set dir and persist language
    document.documentElement.dir = t.dir || "ltr";
    localStorage.setItem("pxr_lang", lang);
  }, [lang, t.dir]);

  useEffect(() => {
    // apply theme class on html
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("pxr_theme", theme);
  }, [theme]);

  // small animation variants
  const fadeInUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };
  const float = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } } };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-black transition-colors duration-700 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Header */}
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white font-extrabold shadow-lg">PXR</div>
            <div>
              <div className="text-sm font-semibold">Mohamad</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Founder — PXR</div>
            </div>
          </div>

          <nav className="flex items-center gap-3">
            {/* language switch */}
            <div className="flex items-center gap-1 bg-white/60 dark:bg-black/30 backdrop-blur-sm rounded-full p-1 border border-gray-200 dark:border-gray-800">
              {Object.keys(TRANSLATIONS).map((k) => (
                <button
                  key={k}
                  onClick={() => setLang(k)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${lang === k ? "bg-indigo-600 text-white shadow-md" : "text-gray-600 dark:text-gray-200"}`}
                >
                  {TRANSLATIONS[k].label}
                </button>
              ))}
            </div>

            {/* theme toggle */}
            <button
              onClick={() => setTheme((s) => (s === "dark" ? "light" : "dark"))}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-black/30 backdrop-blur-sm"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.span key="moon" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}>
                    <FaMoon />
                  </motion.span>
                ) : (
                  <motion.span key="sun" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}>
                    <FaSun />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </nav>
        </header>

        {/* Hero */}
        <main className="mt-10">
          <section className="grid md:grid-cols-2 gap-10 items-center">
            {/* left: text */}
            <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
              <motion.h1 variants={fadeInUp} className="text-3xl md:text-5xl font-extrabold leading-tight">
                {t.heroTitle}
              </motion.h1>
              <motion.p variants={fadeInUp} className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl whitespace-pre-line">
                {t.heroSubtitle}
              </motion.p>

              <motion.div variants={fadeInUp} className="mt-6 flex gap-4">
                <a href="#courses" className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform hover:scale-[1.03] transition">
                  {t.ctaPrimary}
                </a>
                <a href="#pxr" className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-white/4 backdrop-blur-sm">
                  {t.ctaSecondary}
                </a>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-8 grid grid-cols-3 gap-3 max-w-lg">
                <div className="col-span-1 p-3 rounded-xl bg-white/60 dark:bg-white/4 backdrop-blur-sm border border-gray-100 dark:border-gray-700 text-sm">Patternized Edge</div>
                <div className="col-span-1 p-3 rounded-xl bg-white/60 dark:bg-white/4 backdrop-blur-sm border border-gray-100 dark:border-gray-700 text-sm">High Conviction Entries</div>
                <div className="col-span-1 p-3 rounded-xl bg-white/60 dark:bg-white/4 backdrop-blur-sm border border-gray-100 dark:border-gray-700 text-sm">Risk-First Rules</div>
              </motion.div>
            </motion.div>

            {/* right: image with effects */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 90 }} className="relative flex justify-center">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">
                <img
                  src="/photo_2025-10-22_10-57-52.jpg"
                  alt="Mohamad Amin Esmaeili"
                  className="w-[360px] h-[360px] object-cover"
                />
                {/* overlay gradient */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent mix-blend-overlay" />
              </div>

              {/* floating cards */}
              <motion.div initial="hidden" animate="show" variants={float} className="absolute -left-8 -bottom-8 w-44 p-3 rounded-2xl bg-white/80 dark:bg-gray-800/70 border border-gray-100 dark:border-gray-700 shadow-lg">
                <div className="text-xs font-semibold">Order Block</div>
                <div className="text-xs text-gray-500">High-probability zone</div>
              </motion.div>

              <motion.div initial="hidden" animate={{ opacity: 1, y: -6 }} transition={{ delay: 0.2 }} className="absolute -right-8 -bottom-6 w-44 p-3 rounded-2xl bg-white/80 dark:bg-gray-800/70 border border-gray-100 dark:border-gray-700 shadow-lg">
                <div className="text-xs font-semibold">MSS</div>
                <div className="text-xs text-gray-500">Structure shift signal</div>
              </motion.div>
            </motion.div>
          </section>

          {/* Links row (animated buttons) */}
          <section className="mt-10 flex justify-center md:justify-start gap-4">
            <motion.a
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              href={t.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-pink-600 to-indigo-600 text-white shadow-lg"
            >
              <FaInstagram /> <span className="font-medium">Instagram</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              href={t.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg"
            >
              <FaTelegramPlane /> <span className="font-medium">Telegram</span>
            </motion.a>
          </section>

          {/* About & PXR sections */}
          <section id="about" className="mt-14 grid md:grid-cols-2 gap-6">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-semibold">{t.aboutTitle}</h3>
              <p className="mt-3 text-gray-600 dark:text-gray-300 whitespace-pre-line">{t.aboutText}</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-semibold">{t.pxrTitle}</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                {t.pxrBullets.map((b, i) => (
                  <li key={i}>• {b}</li>
                ))}
              </ul>
            </motion.div>
          </section>

          {/* Courses */}
          <section id="courses" className="mt-10">
            <motion.h4 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-lg font-semibold"> {t.coursesTitle} </motion.h4>
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div className="text-lg font-semibold">Foundations</div>
                <div className="text-sm text-gray-500 mt-2">Market structure, liquidity basics, OB intro.</div>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div className="text-lg font-semibold">Patternization</div>
                <div className="text-sm text-gray-500 mt-2">Turning concepts into PXR setups and live examples.</div>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div className="text-lg font-semibold">Execution</div>
                <div className="text-sm text-gray-500 mt-2">Entries, risk management and journaling.</div>
              </div>
            </motion.div>
          </section>

          {/* Contact */}
          <section id="contact" className="mt-10 mb-20">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold">{t.contactTitle}</h4>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Contact: <a href={`mailto:info@mohamad.cfd`} className="underline">info@mohamad.cfd</a></p>
                  <div className="mt-4 text-sm">
                    <div>Instagram: <a href={t.instagram} target="_blank" rel="noreferrer" className="text-pink-500">@mohammadamin.fx</a></div>
                    <div className="mt-1">Telegram: <a href={t.telegram} target="_blank" rel="noreferrer" className="text-blue-500">@mohammadaminfxx</a></div>
                  </div>
                </div>

                <form className="p-4 rounded-xl bg-white/60 dark:bg-white/4 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                  <div className="grid gap-3">
                    <input placeholder={lang === "fa" ? "نام شما" : lang === "ar" ? "اسمك" : "Your name"} className="p-3 rounded border border-gray-200 dark:border-gray-700 bg-transparent" />
                    <input placeholder={lang === "fa" ? "ایمیل" : lang === "ar" ? "البريد" : "Email"} className="p-3 rounded border border-gray-200 dark:border-gray-700 bg-transparent" />
                    <textarea placeholder={lang === "fa" ? "پیام شما" : lang === "ar" ? "رسالتك" : "Your message"} rows={4} className="p-3 rounded border border-gray-200 dark:border-gray-700 bg-transparent" />
                    <button type="button" className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">Send</button>
                  </div>
                </form>
              </div>
            </motion.div>
          </section>
        </main>

        <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Mohamad — PXR. All rights reserved.</footer>
      </div>
    </div>
  );
}
