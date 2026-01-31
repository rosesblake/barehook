"use client";

import { useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  cubicBezier,
  type Variants,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "process", label: "Session flow" },
  { key: "contact", label: "Contact" },
] as const;

const easePrimary = cubicBezier(0.22, 1, 0.36, 1);
const easeRibbon = cubicBezier(0.16, 1, 0.3, 1);

export default function Page() {
  const [active, setActive] =
    useState<(typeof tabs)[number]["key"]>("overview");

  const prefersReduced = useReducedMotion();

  const fade: Variants = {
    initial: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12 },
    animate: prefersReduced
      ? { opacity: 1, transition: { duration: 0.25 } }
      : { opacity: 1, y: 0, transition: { duration: 0.45, ease: easePrimary } },
    exit: prefersReduced
      ? { opacity: 0 }
      : { opacity: 0, y: -8, transition: { duration: 0.25 } },
  };

  const [calendlyReady, setCalendlyReady] = useState(false);

  const loadCalendly = useCallback(() => {
    if (calendlyReady) return;

    if (!document.getElementById("calendly-widget-css")) {
      const link = document.createElement("link");
      link.id = "calendly-widget-css";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    if (!document.getElementById("calendly-widget-js")) {
      const s = document.createElement("script");
      s.id = "calendly-widget-js";
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      s.onload = () => setCalendlyReady(true);
      document.body.appendChild(s);
    } else {
      setCalendlyReady(true);
    }
  }, [calendlyReady]);

  const openCalendly = useCallback(() => {
    loadCalendly();
    const tryOpen = () => {
      // @ts-ignore
      if (window.Calendly?.initPopupWidget) {
        // @ts-ignore
        window.Calendly.initPopupWidget({
          url: "https://calendly.com/barehook/barehook-intro-call",
        });
      } else {
        requestAnimationFrame(tryOpen);
      }
    };
    tryOpen();
  }, [loadCalendly]);

  const handleTabKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const order = ["overview", "process", "contact"] as const;
    const i = order.indexOf(active);
    if (e.key === "ArrowRight") {
      setActive(order[(i + 1) % order.length]);
    }
    if (e.key === "ArrowLeft") {
      setActive(order[(i - 1 + order.length) % order.length]);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-50 antialiased">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(80rem_50rem_at_50%_-10%,rgba(255,255,255,0.06),transparent),radial-gradient(90rem_60rem_at_50%_120%,rgba(56,189,248,0.06),transparent)]" />
        <div className="absolute inset-0 opacity-[0.08] [background:repeating-linear-gradient(90deg,transparent_0,transparent_39px,rgba(255,255,255,0.12)_40px),repeating-linear-gradient(0deg,transparent_0,transparent_39px,rgba(255,255,255,0.12)_40px)] [mask-image:radial-gradient(65rem_40rem_at_50%_10%,#000_55%,transparent_75%)]" />
        <div className="absolute -top-40 left-1/2 h-[48rem] w-[48rem] -translate-x-1/2 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,rgba(99,102,241,0.2),rgba(16,185,129,0.18),rgba(56,189,248,0.2),rgba(99,102,241,0.2))] blur-3xl animate-[slowspin_18s_linear_infinite]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(60rem_40rem_at_50%_0%,#000_45%,transparent_70%)]" />
      </div>

      <header className="fixed top-0 z-30 w-full border-b border-white/5 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <a
            href="#"
            className="font-extrabold tracking-tight text-lg text-white"
          >
            Barehook
          </a>
        </div>
      </header>

      <section className="relative mx-auto max-w-4xl px-6 pt-24 md:pt-28 pb-8 text-center">
        <motion.h1
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easePrimary }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[0.95]"
        >
          <span className="bg-clip-text text-transparent bg-[linear-gradient(180deg,#fff,rgba(255,255,255,0.85))]">
            Real sessions. Real songs.
          </span>
        </motion.h1>
        <motion.p
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5 }}
          className="mx-auto mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-zinc-300"
        >
          One-on-one sessions focused on making songs better. We work in real
          time and leave with something clearer, stronger, or finished.
        </motion.p>

        <motion.div
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.5, ease: easePrimary }}
          className="mx-auto mt-8"
        >
          <button
            type="button"
            onClick={openCalendly}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-black/10 transition hover:translate-y-[-1px] cursor-pointer"
          >
            <span>Book an intro call</span>
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              className="transition group-hover:translate-x-0.5"
              fill="currentColor"
            >
              <path d="M5 12h11.17l-4.58-4.59L13 6l7 7-7 7-1.41-1.41L16.17 13H5z" />
            </svg>
          </button>
          <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Image
                src="/profile-image.jpg"
                alt="Blake Roses"
                width={28}
                height={28}
                className="rounded-full ring-1 ring-white/10 shrink-0"
                priority
              />
              <span>
                <span className="font-semibold text-zinc-200">Blake Roses</span>{" "}
              </span>
            </div>

            <span className="hidden sm:inline select-none text-zinc-600">
              •
            </span>
            <a
              href="https://credits.muso.ai/profile/70099920-e044-4530-a5aa-ab7749582fe0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-zinc-100 underline-offset-4 hover:underline"
              aria-label="See Blake Roses credits on Muso.AI (opens in a new tab)"
            >
              <span>See credits</span>
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                className="opacity-70"
              >
                <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
                <path d="M5 5h7v2H7v10h10v-5h2v7H5z" />
              </svg>
            </a>
            <span className="hidden sm:inline select-none text-zinc-600">
              •
            </span>
            <a
              href="https://instagram.com/dazyfacemusic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-300 underline-offset-4 hover:underline"
            >
              <Image
                src="/instagram-logo.svg"
                alt="Instagram"
                width={24}
                height={24}
                className="rounded-full ring-1 ring-white/10 shrink-0"
                priority
              />
              <span>@dazyfacemusic</span>
            </a>
          </div>
        </motion.div>
      </section>

      <section
        id="about"
        className="relative isolate mx-auto max-w-5xl px-6 pb-16"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <motion.div
            initial={
              prefersReduced
                ? { opacity: 0.95 }
                : { scale: 1.05, opacity: 0.95 }
            }
            whileInView={
              prefersReduced ? { opacity: 1 } : { scale: 1, opacity: 1 }
            }
            viewport={{ once: true, margin: "-10% 0%" }}
            transition={{ duration: 0.9, ease: easeRibbon }}
            className="group relative h-[18rem] md:h-[24rem] overflow-hidden"
          >
            <Image
              src="/blake-studio.jpg"
              alt="Blake Roses in studio"
              fill
              sizes="(max-width: 768px) 100vw, 960px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/55 via-zinc-950/15 to-zinc-950/55" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </motion.div>

          <div className="-mt-10 px-4 pb-6 md:px-8">
            <div className="mx-auto max-w-3xl rounded-2xl bg-zinc-900/70 p-6 backdrop-blur-md ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <h3 className="text-2xl font-semibold">
                Write first. Produce when it serves the song.
              </h3>
              <p className="mt-3 text-zinc-300">
                We start wherever you are. No pressure, no expectations, just
                working toward something better than where you started.{" "}
              </p>

              <p className="mt-3 text-zinc-300">
                You don’t need experience. You just need a reason to make music.
              </p>

              <p className="mt-3 text-zinc-300">
                I’m <span className="font-semibold">Blake Roses</span>, a Los
                Angeles producer and songwriter. Mentored by Jon Lundin (Point
                North). Former singer of Oh, Weatherly (15M+ streams). Credits
                include Plain White T’s, We The Kings, SiM, and As It Is.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-4xl px-6 pb-28">
        {/* Accessible Tablist */}
        <div
          role="tablist"
          aria-label="Barehook sections"
          className="mx-auto flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900/40 p-2 ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          onKeyDown={handleTabKey}
        >
          {tabs.map((t) => {
            const selected = active === t.key;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={selected}
                aria-controls={`${t.key}-panel`}
                id={`${t.key}-tab`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(t.key)}
                className={`relative rounded-xl px-4 py-2 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 transition cursor-pointer ${
                  selected
                    ? "text-zinc-900"
                    : "text-zinc-300 hover:text-zinc-100"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-white to-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            );
          })}
        </div>

        <div className="relative mt-8 overflow-hidden rounded-3xl bg-zinc-900/40 ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <AnimatePresence mode="wait">
            {active === "overview" && (
              <motion.div
                role="tabpanel"
                id="overview-panel"
                aria-labelledby="overview-tab"
                key="overview"
                variants={fade}
                initial="initial"
                animate="animate"
                exit="exit"
                className="p-8"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl bg-zinc-900/60 p-6 backdrop-blur-sm ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                    <h3 className="text-xl font-semibold">Songwriting</h3>
                    <p className="mt-2 text-zinc-300">
                      Melody, lyrics, and structure. Figuring out what the song
                      wants to be and helping it get there.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-zinc-900/60 p-6 backdrop-blur-sm ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                    <h3 className="text-xl font-semibold">
                      Songwriting + Production
                    </h3>
                    <p className="mt-2 text-zinc-300">
                      Using production only when it helps the song. Building
                      around the writing instead of covering it up.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {active === "process" && (
              <motion.div
                role="tabpanel"
                id="process-panel"
                aria-labelledby="process-tab"
                key="process"
                variants={fade}
                initial="initial"
                animate="animate"
                exit="exit"
                className="p-8"
              >
                <h2 id="curriculum" className="text-center text-2xl font-bold">
                  Session flow
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-300">
                  Sessions feel like real studio time. We listen, make choices,
                  and move the song forward.
                </p>
                <div className="mx-auto mt-8 grid max-w-3xl gap-4">
                  {[
                    {
                      t: "Find the block in your writing",
                      b: "Sometimes it’s the writing. Sometimes it’s the arrangement. Sometimes it’s just uncertainty. We identify the real issue.",
                    },
                    {
                      t: "Work on the song, not around it",
                      b: "Lyrics, melody, chords, structure, or sound. We focus on the part that will change the song the most right now.",
                    },
                    {
                      t: "Commit",
                      b: "We make choices and live with them long enough for the song to take shape.",
                    },
                    {
                      t: "Leave with direction",
                      b: "You leave knowing what to work on next and why.",
                    },
                  ].map((s, i) => (
                    <motion.div
                      key={s.t}
                      initial={
                        prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12 }
                      }
                      whileInView={
                        prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }
                      }
                      viewport={{ once: true, margin: "-10% 0%" }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="rounded-2xl bg-zinc-900/60 p-5 ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    >
                      <div className="text-lg font-semibold">{s.t}</div>
                      <p className="mt-1 text-zinc-300">{s.b}</p>
                    </motion.div>
                  ))}
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-zinc-400">
                  Whether you’re just starting or already writing, the goal is
                  the same: make something honest and better than it was before.
                </p>
              </motion.div>
            )}

            {active === "contact" && (
              <motion.div
                role="tabpanel"
                id="contact-panel"
                aria-labelledby="contact-tab"
                key="contact"
                variants={fade}
                initial="initial"
                animate="animate"
                exit="exit"
                className="p-8 text-center"
              >
                <h2 id="contact" className="text-2xl font-bold">
                  Start a conversation
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-zinc-300">
                  Tell me what you’re trying to make and where you feel stuck.
                  We’ll go from there.
                </p>
                <a
                  href="mailto:rosesblake@yahoo.com?subject=Barehook"
                  className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-black/10 transition hover:translate-y-[-1px]"
                >
                  <span>Email Barehook</span>
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    className="transition group-hover:translate-x-0.5"
                    fill="currentColor"
                  >
                    <path d="M5 12h11.17l-4.58-4.59L13 6l7 7-7 7-1.41-1.41L16.17 13H5z" />
                  </svg>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-zinc-950/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-6 py-8 text-center md:flex-row md:text-left">
          <div className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Barehook • Site by Blake Roses
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/dazyfacemusic"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram: @dazyfacemusic"
              className="transition"
            >
              <Image
                src="/instagram-icon.svg"
                alt=""
                width={28}
                height={28}
                className="opacity-80 hover:opacity-100 transition"
              />
            </a>
            <a
              href="mailto:rosesblake@yahoo.com?subject=Barehook"
              aria-label="Email Barehook"
              className="transition"
            >
              <Image
                src="/mail-icon.svg"
                alt=""
                width={28}
                height={28}
                className="opacity-80 hover:opacity-100 transition"
              />
            </a>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes slowspin {
          to {
            transform: rotate(1turn);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-[slowspin_18s_linear_infinite] {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
