import Image from '@/components/Image'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Get to know me',
  description: 'Boris, from the taiga to Kubernetes.',
  robots: { index: false, follow: false },
})

const img = (name: string) => `/static/images/about-me/${name}.webp`

const chapters = [
  {
    title: 'Origin',
    text: 'Born in Vostok-2, a small town in the taiga in Primorye, Russian Far East. Tigers walk through town. Still do.',
    photos: ['vostok-a', 'vostok-b', 'vostok-house', 'taiga'],
  },
  {
    title: 'Vladivostok, 16 to 25',
    text: 'University years. Hills, rubble, sea, one trip to China.',
    photos: ['university-1', 'university-2', 'university-3', 'vladivostok-2011', 'china'],
  },
  {
    title: 'Bashkortostan',
    text: 'Mom and dad moved from Primorye to Bashkortostan. Funny hats. Me right before New Zealand.',
    photos: ['bashkortostan-1', 'bashkortostan-2'],
  },
  {
    title: 'New Zealand',
    text: 'I got into New Zealand with automation: a PHP script checked the Silver Fern visa page for free spots and texted me. Then hiking, kiteboarding, wakeboarding, snowboarding.',
    photos: [
      'hike-1',
      'hike-2',
      'hike-3',
      'hike-4',
      'nz-2020',
      'kiteboarding',
      'snowboarding',
      'wakeboarding',
    ],
  },
  {
    title: 'Long COVID',
    text: 'February 2022. Still have it. The mountains moved to the desk.',
    photos: [],
  },
  {
    title: 'AI obsession',
    text: 'Soyspray cluster, AI designed 3D printed cases, SoyOS on an iPhone 4, a 3D model of my house, a garden bed with a worm farm, a meme recommender on 300k unfiltered memes, Errands.',
    photos: ['soyspray', 'printed-case', 'soyos', 'garden-bed', 'meme-fish'],
  },
  {
    title: 'Family',
    text: 'Me and my son.',
    photos: ['son-1', 'son-2', 'son-3', 'son-4'],
  },
  {
    title: 'Work',
    text: 'Evidence over status. Talk first, then write it down. Automate the boring parts.',
    photos: [],
  },
  {
    title: 'Dreams',
    text: 'Financial independence, then helping people.',
    photos: [],
  },
]

export default function AboutMe() {
  return (
    <div className="py-10">
      <h1 className="text-5xl font-bold">Get to know me</h1>
      <p className="mt-4 text-gray-500">Rough draft. Polished version coming.</p>
      {chapters.map((c) => (
        <section key={c.title} className="mt-16">
          <h2 className="text-3xl font-bold">{c.title}</h2>
          <p className="mt-3 text-lg">{c.text}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            {c.photos.map((p) => (
              <div key={p} className="relative aspect-square overflow-hidden rounded-lg">
                <Image src={img(p)} alt={p} fill className="object-cover" sizes="33vw" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
