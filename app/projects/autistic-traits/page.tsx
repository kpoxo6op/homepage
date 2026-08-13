import Image from '@/components/Image'
import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'

const assessmentUrl = 'https://autism.soyspray.vip'

export const metadata = genPageMetadata({
  title: 'Autistic Traits',
  description: 'A detailed questionnaire for exploring autistic traits.',
})

export default function AutisticTraits() {
  return (
    <div className="py-10 sm:py-16">
      <section className="relative overflow-hidden rounded-[2rem] bg-[#dcebe3] text-[#17372d] dark:bg-[#17372d] dark:text-[#edf7f1]">
        <div className="grid items-center gap-2 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 px-7 pt-9 pb-4 sm:px-12 sm:pt-14 lg:py-20 lg:pr-4">
            <h1 className="max-w-2xl text-4xl leading-[0.98] font-bold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Explore your autistic traits.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 opacity-80">
              A detailed questionnaire for exploring autistic traits across communication, masking,
              routines, sensory processing, daily capacity, and childhood history.
            </p>
            <div className="mt-8">
              <Link
                href={assessmentUrl}
                className="rounded-full bg-[#17372d] px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 dark:bg-[#d8f0e3] dark:text-[#17372d]"
              >
                Open the assessment
              </Link>
            </div>
          </div>

          <div className="relative min-h-72 sm:min-h-96 lg:min-h-[34rem]">
            <Image
              src="/static/images/autism-traits.svg"
              alt="An abstract map of varied traits forming one profile"
              fill
              priority
              className="object-cover object-center"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
