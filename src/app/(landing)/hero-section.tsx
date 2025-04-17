import { Wrapper } from "@/components/wrapper"
import { Heading } from "@/components/heading"
import brand from "@/lib/data/brand.json"
import features from "@/lib/data/features.json"
import { CTAButton } from "@/components/cta-button"
import { LuCircleCheck, LuSparkles } from "react-icons/lu"

export default function HeroSection() {
  return (
    <section className="relative py-24 sm:py-32 sm:pt-12 bg-brand-25 dark:bg-brand-950">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />

      <Wrapper>
        <div className="flex">
          {/* Left */}
          <div className="flex-grow md:basis-2/3">
            <div className="relative mx-auto flex flex-col items-center sm:items-start gap-8 sm:gap-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-300/30 dark:bg-brand-500/5">
                <LuSparkles className="size-4 text-brand-600 dark:text-brand-300" />
                <span className="text-sm font-medium text-brand-600 dark:text-brand-300">
                  Now with AI-powered citation detection
                </span>
              </div>

              {/* Heading */}
              <Heading className="flex flex-col gap-y-2 w-full text-center sm:text-left">
                <span className="text-3xl sm:text-5xl font-bold">
                  Smart Citation Management,
                </span>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center sm:items-baseline">
                  <span className="text-2xl sm:text-5xl bg-gradient-to-r from-brand-500 to-brand-800 dark:from-brand-200 dark:to-brand-400 text-transparent bg-clip-text pb-4">
                    Effortlessly Organized
                  </span>
                </div>
              </Heading>

              {/* Description */}
              <p className="text-base/7 text-gray-600 dark:text-gray-300 max-w-prose text-center sm:text-left">
                Stay on top of your research with {brand.BRAND}’s intelligent
                management system for{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-100">
                  articles, references, and bibliographies
                </span>
                . Sync across all your devices and integrate with Word, Google
                Docs, and more.
              </p>

              {/* Features grid - now a single column list on mobile */}
              <ul className="w-full max-w-[320px] space-y-4 sm:space-y-0 sm:max-w-2xl sm:grid sm:grid-cols-2 sm:gap-4 text-base/7 text-gray-600 dark:text-gray-300">
                {features.features.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 sm:justify-start"
                  >
                    <LuCircleCheck className="size-5 shrink-0 text-brand-700 dark:text-brand-300 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <CTAButton href="/sign-up" className="relative z-10">
                Start citing smarter today
              </CTAButton>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  )
}
