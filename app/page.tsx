"use client";

import FooterSection from "@/components/FooterSection";
import LimitationsSection from "@/components/LimitationSection";
import MethodsSection from "@/components/MethodSection";
import { Navigation } from "@/components/Navigation";
import TrainingProcess from "@/components/TrainingProgress";
import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";

type TabKey = "Enrollment" | "Campus Info" | "Requirements" | "Offices";

const TABS: TabKey[] = ["Enrollment", "Campus Info", "Requirements", "Offices"];

const SAMPLE_CONVERSATIONS: Record<TabKey, { user: string; bot: string }[]> = {
  Enrollment: [
    {
      user: "What are the requirements for new freshmen?",
      bot: "Freshmen must submit Form 138, PSA Birth Certificate, Good Moral Certificate, and their Admission Slip.",
    },
    {
      user: "When is the enrollment period for the next semester?",
      bot: "The enrollment period for the next semester is scheduled from June 1 to June 15, 2026.",
    },
  ],
  "Campus Info": [
    {
      user: "Where is the Registrar’s Office located?",
      bot: "The Registrar’s Office is located on the 2nd Floor of the Administration Building at SorSU Bulan Campus.",
    },
    {
      user: "How many campuses does SorSU have?",
      bot: "Sorsogon State University has three campuses: Bulan Campus, Castilla Campus, and Magallanes Campus.",
    },
  ],
  Requirements: [
    {
      user: "Do I need a Good Moral Certificate?",
      bot: "Yes, most programs require a Good Moral Certificate during enrollment and document verification.",
    },
    {
      user: "What are the document requirements for transfer students?",
      bot: "The document requirements for transfer students include Form 138, Transcript of Records, Certificate of Transfer, and PSA Birth Certificate.",
    },
  ],
  Offices: [
    {
      user: "What office handles student IDs?",
      bot: "Student ID processing is handled by the Management Information System (MIS) Office.",
    },
    {
      user: "Until what time does the Registrar's Office operate?",
      bot: "The Registrar's Office operates from 8:00 AM to 5:00 PM, Monday to Friday.",
    },
  ],
};

type FadeInSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

const FadeInSection = ({
  children,
  className = "",
  id,
}: FadeInSectionProps) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.25 }} // animate on scroll down AND up
    transition={{ duration: 0.6 }}
    className={className}
  >
    {children}
  </motion.section>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("Enrollment");
  const heroConversation = SAMPLE_CONVERSATIONS[activeTab][0];

  return (
    <main className="min-h-screen scroll-smooth bg-gradient-to-b from-slate-50 via-white to-amber-50 text-slate-900">
      <Navigation />

      {/* HERO */}
      <FadeInSection
        id="hero"
        className="pt-24 md:pt-28 pb-12 px-4 bg-gradient-to-b from-[#800000] via-[#800000] to-[#4b0000] text-white"
      >
        <div className="max-w-6xl mx-auto grid gap-10 lg:gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <p className="mb-3 text-xl font-medium tracking-wide uppercase text-amber-200/80">
              December 05, 2025 • Sorsogon State University
            </p>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[0.7rem] sm:text-xl font-medium backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-300" />
              Automated Campus Registrar Assistant
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight">
              Introducing{" "}
              <span className="text-[#FFD700] drop-shadow-sm">AskSorSU</span>
            </h1>

            <p className="mt-3 max-w-xl text-xl sm:text-xl md:text-base text-amber-50/90">
              AskSorSU is your AI-powered assistant for Sorsogon State
              University, ready 24/7 to help with enrollment, documents, campus
              information, and registrar-related concerns.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="/authentication"
                target="_blank"
                className="inline-flex items-center justify-center rounded-full bg-[#FFD700] px-5 py-2 text-xl sm:text-xl font-semibold text-[#800000] shadow-md hover:bg-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-[#800000]"
              >
                Try AskSorSU
              </motion.a>

              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-full border border-amber-100/60 bg-white/5 px-4 py-2 text-xl sm:text-xl font-medium text-amber-50 hover:bg-white/10 transition"
              >
                Learn more
              </a>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 text-[0.7rem] sm:text-xl text-amber-50/90">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                🎓 SSU-focused guidance
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                ⏰ Available 24/7
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                🧪 Preview phase • Free to use
              </span>
            </div>
          </div>

          {/* Hero chat preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="pointer-events-none absolute -inset-4 sm:-inset-6 rounded-3xl bg-gradient-to-br from-amber-300/25 via-transparent to-slate-900/10 blur-2xl" />
            <div className="relative rounded-2xl sm:rounded-3xl bg-white/95 p-4 sm:p-5 shadow-2xl border border-amber-100 text-xs sm:text-sm">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#800000] text-[0.7rem] sm:text-xs font-bold text-white">
                    AS
                  </span>
                  <div className="leading-tight">
                    <p className="text-[0.7rem] sm:text-xs font-semibold text-slate-900">
                      AskSorSU
                    </p>
                    <p className="text-[0.65rem] text-slate-500">
                      Registrar Assistant
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[0.6rem] sm:text-[0.7rem] font-medium text-emerald-700">
                  Online • 24/7
                </span>
              </div>

              <div className="mb-3 flex flex-wrap gap-1.5 sm:gap-2 text-[0.65rem] sm:text-[0.7rem]">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full border px-2.5 py-1 transition ${
                      activeTab === tab
                        ? "bg-[#800000] text-white border-[#800000]"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex gap-2 sm:gap-3">
                  <div className="mt-1 h-6 w-6 sm:h-7 sm:w-7 shrink-0 rounded-full bg-slate-200 text-center text-[0.65rem] font-semibold text-slate-700 flex items-center justify-center">
                    U
                  </div>
                  <div className="max-w-xs rounded-2xl bg-slate-100 px-3 py-2 text-slate-800">
                    {heroConversation.user}
                  </div>
                </div>

                <div className="flex gap-2 sm:gap-3 justify-end">
                  <div className="max-w-xs rounded-2xl bg-[#fceaea] px-3 py-2 text-slate-800 border border-[#800000]/20">
                    {heroConversation.bot}
                  </div>
                  <div className="mt-1 h-6 w-6 sm:h-7 sm:w-7 shrink-0 rounded-full bg-[#800000] text-center text-[0.65rem] font-semibold text-white flex items-center justify-center">
                    AS
                  </div>
                </div>
              </div>

              <p className="mt-3 text-[0.6rem] sm:text-[0.7rem] text-slate-500">
                Answers are based on SSU registrar guidelines. For final
                verification, always check official announcements.
              </p>
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* ABOUT SECTION */}
      <FadeInSection
        id="about"
        className="py-12 md:py-14 px-4 bg-white/80 scroll-mt-24"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-3xl font-semibold tracking-tight text-[#800000]">
              What is AskSorSU?
            </h2>
            <p className="mt-3 text-lg sm:text-lg md:text-lg text-slate-600">
              AskSorSU is built to make it easier for the SorSU community to
              navigate registrar-related processes — from enrollment and
              documents to campus policies — through a simple, conversational
              interface.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:gap-8 md:grid-cols-2 text-lg sm:text-lg md:text-lg text-slate-700 leading-relaxed">
            <p>
              We’ve built an AI assistant called{" "}
              <span className="font-semibold text-[#800000]">AskSorSU</span>,
              designed to help students, faculty, and staff of{" "}
              <span className="font-semibold text-[#800000]">
                Sorsogon State University
              </span>{" "}
              access information in a conversational and intuitive way. AskSorSU
              can answer questions, guide you through school processes, provide
              campus information, and assist with academic or administrative
              concerns.
            </p>
            <p>
              AskSorSU uses an advanced language model tuned for SorSU-related
              contexts, making it capable of handling follow-up questions,
              clarifying confusing steps, and providing clear and helpful
              responses while avoiding inappropriate or irrelevant requests.
            </p>
          </div>

          <div className="mt-5 grid gap-6 md:gap-8 md:grid-cols-2 text-g sm:text-lg md:text-lg text-slate-700 leading-relaxed">
            <p>
              It is part of SorSU’s initiative to enhance digital services and
              support a more connected and efficient campus. Instead of waiting
              in long lines or searching through multiple documents, students
              can quickly get guidance on what to do next.
            </p>
            <p>
              During this preview phase, AskSorSU is{" "}
              <span className="font-semibold text-[#800000]">free to use</span>{" "}
              for everyone in the SorSU community. We’re excited to learn from
              your feedback and continuously improve its accuracy, coverage, and
              usability.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm">
              <p className="text-xl font-semibold text-slate-900">
                Registrar-focused
              </p>
              <p className="mt-1 text-lg text-slate-600">
                Built around SSU’s registrar workflows — enrollment, records,
                credentials, clearances, and more.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm">
              <p className="text-xl font-semibold text-slate-900">
                SorSU Context-aware
              </p>
              <p className="mt-1 text-lg text-slate-600">
                Understands campus names, offices, and common terms used within
                the SorSU community.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm">
              <p className="text-xl font-semibold text-slate-900">
                Always improving
              </p>
              <p className="mt-1 text-lg text-slate-600">
                Feedback from users helps refine responses and keep information
                aligned with current policies.
              </p>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* FEATURES / SAMPLE CONVERSATIONS */}
      <FadeInSection
        id="features"
        className="py-12 md:py-14 px-4 bg-gradient-to-b from-white to-amber-50/60 scroll-mt-24"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#800000]">
              See AskSorSU in Action
            </h2>
            <p className="mt-3 text-xl sm:text-xl md:text-xl text-slate-600">
              Switch between categories to preview how AskSorSU can respond to
              different questions from students and staff.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full border px-3.5 py-1.5 text-[0.75rem] sm:text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-[#800000] text-white border-[#800000] shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-7 lg:gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
            <div className="space-y-4">
              {SAMPLE_CONVERSATIONS[activeTab].map((pair, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="space-y-2.5"
                >
                  {/* User message */}
                  <div className="flex gap-2.5 sm:gap-3">
                    <div className="mt-1 flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[0.7rem] sm:text-xs font-semibold text-slate-700">
                      U
                    </div>
                    <div className="flex-1 rounded-2xl bg-slate-100 px-3.5 py-2.5 shadow-sm">
                      <p className="text-[0.75rem] sm:text-sm font-semibold text-slate-800">
                        User
                      </p>
                      <p className="mt-1 text-[0.75rem] sm:text-sm text-slate-700">
                        {pair.user}
                      </p>
                    </div>
                  </div>

                  {/* AskSorSU message */}
                  <div className="flex gap-2.5 sm:gap-3 justify-end">
                    <div className="flex-1 rounded-2xl bg-[#fceaea] px-3.5 py-2.5 shadow-sm border border-[#800000]/30 max-w-[90%]">
                      <p className="text-[0.75rem] sm:text-sm font-semibold text-[#800000]">
                        AskSorSU
                      </p>
                      <p className="mt-1 text-[0.75rem] sm:text-sm text-slate-800 leading-relaxed">
                        {pair.bot}
                      </p>
                    </div>
                    <div className="mt-1 flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-[#800000] text-[0.7rem] sm:text-xs font-semibold text-white">
                      AS
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-amber-100 bg-white/90 p-5 shadow-sm text-xs sm:text-sm text-slate-700"
            >
              <h3 className="text-sm sm:text-base font-semibold text-[#800000]">
                What else can you ask?
              </h3>
              <p className="mt-2">
                AskSorSU can help with a wide range of registrar-related
                questions:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>Enrollment schedules, processes, and requirements.</li>
                <li>Document requests like TOR, certifications, and ID.</li>
                <li>Campus-specific offices and where to process requests.</li>
                <li>Policies on LOA, shifting, and student status.</li>
                <li>General campus information and registrar office hours.</li>
              </ul>
              <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-[0.7rem] text-[#654321]">
                Tip: Include your campus, program, and year level in your
                question to receive more specific guidance.
              </p>
              <a
                href="/authentication"
                target="_blank"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-[#800000] px-4 py-2 text-[0.8rem] font-semibold text-white shadow-sm hover:bg-[#5a0000] transition"
              >
                Start asking now
              </a>
            </motion.div>
          </div>
        </div>
      </FadeInSection>

      {/* EXISTING SECTIONS FROM YOUR COMPONENTS */}
      <div className="mt-6 space-y-12 md:space-y-14">
        <FadeInSection className="px-4">
          <div className="max-w-6xl mx-auto">
            <MethodsSection />
          </div>
        </FadeInSection>

        <FadeInSection className="px-4">
          <div className="max-w-6xl mx-auto">
            <TrainingProcess />
          </div>
        </FadeInSection>

        <FadeInSection className="px-4 pb-12 md:pb-14">
          <div className="max-w-6xl mx-auto">
            <LimitationsSection />
          </div>
        </FadeInSection>
      </div>

      <FooterSection />
    </main>
  );
}
