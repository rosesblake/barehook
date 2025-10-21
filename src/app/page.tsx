"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  cubicBezier,
  type Variants,
} from "framer-motion";
import Image from "next/image";

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "process", label: "How we work" },
  { key: "deepdives", label: "Optional deep dives" },
  { key: "contact", label: "Contact" },
] as const;

const easePrimary = cubicBezier(0.22, 1, 0.36, 1);
const easeRibbon = cubicBezier(0.16, 1, 0.3, 1);

const fade: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easePrimary },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

export default function Page() {
  const [active, setActive] =
    useState<(typeof tabs)[number]["key"]>("overview");

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-50 antialiased">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(80rem_50rem_at_50%_-10%,rgba(255,255,255,0.06),transparent),radial-gradient(90rem_60rem_at_50%_120%,rgba(56,189,248,0.06),transparent)]" />
        <div className="absolute inset-0 opacity-[0.08] [background:repeating-linear-gradient(90deg,transparent_0,transparent_39px,rgba(255,255,255,0.12)_40px),repeating-linear-gradient(0deg,transparent_0,transparent_39px,rgba(255,255,255,0.12)_40px)] [mask-image:radial-gradient(65rem_40rem_at_50%_10%,#000_55%,transparent_75%)]" />
        <div className="absolute -top-40 left-1/2 h-[48rem] w-[48rem] -translate-x-1/2 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,rgba(99,102,241,0.2),rgba(16,185,129,0.18),rgba(56,189,248,0.2),rgba(99,102,241,0.2))] blur-3xl animate-[slowspin_18s_linear_infinite]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(60rem_40rem_at_50%_0%,#000_45%,transparent_70%)]" />
      </div>

      {/* Header (brand only, no nav) */}
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

      {/* Hero */}
      <section className="relative mx-auto max-w-4xl px-6 pt-24 md:pt-28 pb-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easePrimary }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[0.95]"
        >
          <span className="bg-clip-text text-transparent bg-[linear-gradient(180deg,#fff,rgba(255,255,255,0.85))]">
            Let's Write.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5, ease: easePrimary }}
          className="mx-auto mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-zinc-300"
        >
          This is one producer mentoring you 1:1. We will write the song you
          meant to write. If you want, we will also demo or fully produce it.
          The goal is a song you are proud of and a way to make the next one. No
          exams. Real studio methods.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.5, ease: easePrimary }}
          className="mx-auto mt-8"
        >
          <a
            href="mailto:rosesblake@yahoo.com?subject=Barehook"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-black/10 transition hover:translate-y-[-1px]"
          >
            <span>Free introductory call</span>
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
          <div className="mt-3 text-sm">
            <a
              href="https://credits.muso.ai/profile/70099920-e044-4530-a5aa-ab7749582fe0"
              target="_blank"
              className="inline-flex items-center gap-2 text-zinc-300 hover:text-zinc-100 underline-offset-4 hover:underline"
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
          </div>
        </motion.div>
      </section>

      {/* Studio ribbon */}
      <section
        id="about"
        className="relative isolate mx-auto max-w-5xl px-6 pb-16"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <motion.div
            initial={{ scale: 1.05, opacity: 0.95 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0%" }}
            transition={{ duration: 0.9, ease: easeRibbon }}
            className="group relative h-[18rem] md:h-[24rem] overflow-hidden"
          >
            <Image
              src="/blake-studio.jpg"
              alt=""
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
                I am a songwriter and producer from Los Angeles, mentored by Jon
                Lundin of Point North. Before producing I was the singer of Oh,
                Weatherly, a band that reached over 15 million streams. I have
                worked with artists including Plain White T’s, We The Kings, and
                As It Is.
              </p>
              <p className="mt-3 text-zinc-300">
                My focus is helping you channel how you feel into song and using
                recording or production only when it serves your goals. The aim
                is to finish work you are proud of.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="relative mx-auto max-w-4xl px-6 pb-28">
        <div className="mx-auto flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900/40 p-2 ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`relative rounded-xl px-4 py-2 text-sm font-semibold transition ${
                active === t.key
                  ? "text-zinc-900"
                  : "text-zinc-300 hover:text-zinc-100"
              }`}
            >
              {active === t.key && (
                <motion.span
                  layoutId="pill"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-white to-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>

        <div className="relative mt-8 overflow-hidden rounded-3xl bg-zinc-900/40 ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <AnimatePresence mode="wait">
            {active === "overview" && (
              <motion.div
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
                      How songs start, shaping verses and choruses, writing in a
                      way that feels like you.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-zinc-900/60 p-6 backdrop-blur-sm ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                    <h3 className="text-xl font-semibold">
                      Songwriting + Production
                    </h3>
                    <p className="mt-2 text-zinc-300">
                      Same writing focus, plus production. From simple demos to
                      advanced sessions. We expand only when it adds meaning.
                    </p>
                  </div>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-zinc-300">
                  You can blend both paths anytime. The song decides what it
                  needs.
                </p>
              </motion.div>
            )}

            {active === "process" && (
              <motion.div
                key="process"
                variants={fade}
                initial="initial"
                animate="animate"
                exit="exit"
                className="p-8"
              >
                <h2 className="text-center text-2xl font-bold">How we work</h2>
                <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-300">
                  It is just me mentoring you 1:1. You might come in with a full
                  song, a voice note, or only a feeling. We start where you are
                  and move at your pace. The shape below is typical, not a rule.
                </p>
                <div className="mx-auto mt-8 grid max-w-3xl gap-4">
                  {[
                    {
                      t: "Get your voice on the table",
                      b: "What moves you, what you want to say, and references that feel right. This anchors the writing.",
                    },
                    {
                      t: "Core writing skills",
                      b: "Melody, rhythm, chords, structure. If you already write, we refine instincts and make the page sing.",
                    },
                    {
                      t: "Shape the record",
                      b: "Arrangement and production choices that serve emotion. Add only what the song needs.",
                    },
                    {
                      t: "Finish with intention",
                      b: "Get to a real finish. Rough recording or full demo. Build repeatable habits so the next song comes easier.",
                    },
                  ].map((s, i) => (
                    <motion.div
                      key={s.t}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
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
                  Whether you have never opened a DAW or already produce, we
                  build toward songs that feel real and sound like you.
                </p>
              </motion.div>
            )}

            {active === "deepdives" && (
              <motion.div
                key="deepdives"
                variants={fade}
                initial="initial"
                animate="animate"
                exit="exit"
                className="p-8"
              >
                <h2 className="text-center text-2xl font-bold">
                  Optional deep dives
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-300">
                  Extras we can add if it helps your goals. These cover modern
                  tools, the science of why songs work, and advanced production.
                </p>

                <div className="mx-auto mt-8 grid max-w-3xl gap-4">
                  {[
                    {
                      t: "AI in songwriting and production",
                      b: "Co-writing prompts, idea mining from voice notes, stem separation for practice, arrangement assistants, and simple guardrails for credits, rights, and privacy.",
                    },
                    {
                      t: "Psychoacoustics and perception",
                      b: "Masking, loudness, spatial cues, and why certain intervals hit. Use this to shape hook focus and mix moves that land.",
                    },
                    {
                      t: "Advanced writing labs",
                      b: "Prosody, motif development, tension and release, harmonic rhythm, reharmonization, secondary dominance, and tasteful modal color.",
                    },
                    {
                      t: "Production master topics",
                      b: "Gain staging that translates, transient and space design, parallel chains, mid side choices, stereo field management, phase awareness, and bounce workflows.",
                    },
                    {
                      t: "Plugins and gear on a budget",
                      b: "Best value chains under 100, free tools that punch up, utilities that matter, monitoring basics, and smart upgrade paths.",
                    },
                    {
                      t: "Release pipeline",
                      b: "From demo to master, loudness targets, export settings, metadata habits, and checklists for collaborators and distributors.",
                    },
                  ].map((s, i) => (
                    <motion.div
                      key={s.t}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
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
                  Tell me what you want to prioritize in your intro email.
                </p>
              </motion.div>
            )}

            {active === "contact" && (
              <motion.div
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
                  Tell me where you are at and what you want to make. I will
                  reply with a short plan for the next few weeks.
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
      `}</style>
    </main>
  );
}
