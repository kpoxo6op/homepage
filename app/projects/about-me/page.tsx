import { CSSProperties, ReactNode } from 'react'
import { Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import Image from '@/components/Image'
import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'
import Stage, { ChapterLink, Theme } from './stage'
import Loop from './loop'
import VostokMap from './map'
import s from './about.module.css'

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata = genPageMetadata({
  title: 'Get to know me',
  description: 'Boris, from the taiga to Kubernetes.',
  robots: { index: false, follow: false },
})

const chapters: ChapterLink[] = [
  { id: 'hello', label: 'Hello' },
  { id: 'origin', label: 'Origin' },
  { id: 'vladivostok', label: 'Vladivostok' },
  { id: 'bashkortostan', label: 'Bashkortostan' },
  { id: 'new-zealand', label: 'New Zealand' },
  { id: 'long-covid', label: 'Long COVID' },
  { id: 'ai', label: 'AI' },
  { id: 'family', label: 'Family' },
  { id: 'work', label: 'Work' },
  { id: 'dreams', label: 'Dreams' },
  { id: 'thanks', label: 'Thanks' },
]

// Each chapter repaints the whole page as it reaches the middle of the screen.
const themes = {
  paper: { bg: '#efebe3', ink: '#151412', soft: '#6b665d', accent: '#d9481c' },
  taiga: { bg: '#0f1913', ink: '#e8eee5', soft: '#8fa092', accent: '#a9cf5f' },
  sea: { bg: '#dde3e6', ink: '#13202a', soft: '#5b6b75', accent: '#2563b8' },
  wood: { bg: '#efe3cf', ink: '#2b1d12', soft: '#7c6652', accent: '#b8401c' },
  ocean: { bg: '#0b1a22', ink: '#e6f0f2', soft: '#86a1ab', accent: '#3fd0c0' },
  quiet: { bg: '#e7e5e1', ink: '#2a2927', soft: '#86827b', accent: '#9a7f66' },
  terminal: { bg: '#0b0c0e', ink: '#edf0ea', soft: '#8a9088', accent: '#c8f03c' },
  sun: { bg: '#f5ead7', ink: '#24190e', soft: '#7f6c56', accent: '#e2622b' },
  white: { bg: '#f6f5f1', ink: '#121212', soft: '#6c6a64', accent: '#2350e6' },
  dawn: { bg: '#16122a', ink: '#f2edf8', soft: '#a59ebb', accent: '#ff9a68' },
} satisfies Record<string, Theme>

const paint = (t: Theme) => ({
  'data-bg': t.bg,
  'data-ink': t.ink,
  'data-soft': t.soft,
  'data-accent': t.accent,
})

const img = (name: string) => `/static/images/about-me/${name}.webp`
const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(' ')
const vars = (values: Record<string, string | number>) => values as CSSProperties

// Long COVID started in February 2022. Counted at build time.
const covid = (() => {
  const now = new Date()
  const months = (now.getFullYear() - 2022) * 12 + now.getMonth() - 1
  const years = Math.floor(months / 12)
  const rest = months % 12
  return `${years} years${rest ? `, ${rest} month${rest === 1 ? '' : 's'}` : ''}`
})()

const whoami: [string, string][] = [
  ['name', 'Boris Khasanov'],
  ['age', '40'],
  ['home', 'Auckland, New Zealand'],
  ['job', 'SRE at ASB'],
  ['brain', 'autistic, diagnosed at 39'],
  ['health', 'long COVID since 2022'],
  ['hobby', 'AI, basically an obsession'],
]

const interests = [
  'Kubernetes',
  'Home Assistant',
  'a wake word called GI',
  '3D printing',
  'Blender',
  'Linux on an iPhone 4',
  '300k memes',
  'Trade Me hunts',
  'Kafka',
  'Terraform',
  'voice notes',
]

function Kicker({ n, children }: { n: string; children: ReactNode }) {
  return (
    <p className={cx(s.kicker, s.reveal)}>
      <b>{n}</b>
      {children}
    </p>
  )
}

interface PhotoProps {
  name: string
  alt: string
  caption?: ReactNode
  ar?: string
  sizes?: string
  position?: string
  delay?: number
}

function Photo({ name, alt, caption, ar = '4 / 3', sizes, position, delay = 0 }: PhotoProps) {
  return (
    <figure className={cx(s.photo, s.reveal)} style={vars({ '--d': `${delay}ms` })}>
      <div className={s.frame} style={vars({ '--ar': ar })}>
        <Image
          src={img(name)}
          alt={alt}
          fill
          sizes={sizes ?? '(min-width: 900px) 33vw, 100vw'}
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
      {caption && <figcaption className={s.caption}>{caption}</figcaption>}
    </figure>
  )
}

function Print({ name, alt, caption, ar = '4 / 3', turn }: PhotoProps & { turn: string }) {
  return (
    <figure className={cx(s.print, s.reveal)} style={vars({ '--r': turn })}>
      <div className={s.frame} style={vars({ '--ar': ar })}>
        <Image src={img(name)} alt={alt} fill sizes="(min-width: 760px) 50vw, 100vw" />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

interface TileProps {
  photo?: string
  loop?: string
  alt: string
  label: string
  className?: string
  position?: string
}

function Tile({ photo, loop, alt, label, className, position }: TileProps) {
  return (
    <figure className={cx(s.tile, s.reveal, className)}>
      {loop && <Loop name={loop} label={alt} />}
      {photo && (
        <Image
          src={img(photo)}
          alt={alt}
          fill
          sizes="(min-width: 900px) 50vw, 100vw"
          style={position ? { objectPosition: position } : undefined}
        />
      )}
      <figcaption>{loop ? <span className={s.live}>{label}</span> : label}</figcaption>
    </figure>
  )
}

interface CardProps {
  tag: string
  title: string
  span: string
  media: ReactNode
  children: ReactNode
  more?: { href: string; label: string }
}

function Card({ tag, title, span, media, children, more }: CardProps) {
  return (
    <article className={cx(s.card, s.reveal, span)}>
      {media}
      <div className={s.cardBody}>
        <p className={s.tag}>{tag}</p>
        <h3>{title}</h3>
        {children}
        {more && (
          <Link href={more.href} className={s.more}>
            {more.label} →
          </Link>
        )}
      </div>
    </article>
  )
}

function CardPhoto({ name, alt, position, ar = '4 / 3' }: PhotoProps) {
  return (
    <div className={s.frame} style={vars({ '--ar': ar })}>
      <Image
        src={img(name)}
        alt={alt}
        fill
        sizes="(min-width: 1150px) 40vw, (min-width: 760px) 50vw, 100vw"
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  )
}

export default function AboutMe() {
  return (
    <Stage
      chapters={chapters}
      initial={themes.paper}
      className={`${display.variable} ${mono.variable}`}
    >
      {/* 00 Hello */}
      <section id="hello" className={s.cover} {...paint(themes.paper)}>
        <div className={s.wrap}>
          <p className={cx(s.kicker, s.fadeIn)} style={vars({ '--d': '150ms' })}>
            <b>00</b>Get to know me
          </p>
          <h1 className={cx(s.display, s.giant)} aria-label="Boris">
            {'Boris'.split('').map((letter, i) => (
              <span key={i} className={s.rise} aria-hidden="true">
                <span style={vars({ '--i': i })}>{letter}</span>
              </span>
            ))}
          </h1>
          <p className={cx(s.display, s.subtitle, s.fadeIn)} style={vars({ '--d': '650ms' })}>
            From the taiga to <em>Kubernetes</em>.
          </p>

          <div className={cx(s.coverGrid, s.fadeIn)} style={vars({ '--d': '950ms' })}>
            <ol className={s.journey}>
              <li>
                <small>Age 0 to 16</small>
                <strong>Vostok-2</strong>
                <span>Taiga, Russian Far East</span>
              </li>
              <li>
                <small>16 to 25</small>
                <strong>Vladivostok</strong>
                <span>University and the sea</span>
              </li>
              <li>
                <small>25</small>
                <strong>Bashkortostan</strong>
                <span>Mom and dad moved here</span>
              </li>
              <li>
                <small>25 to now</small>
                <strong>New Zealand</strong>
                <span>Since 2012</span>
              </li>
            </ol>

            <pre className={s.terminal} aria-label="whoami">
              <span className={s.prompt}>$</span> whoami{'\n'}
              {whoami.map(([key, value]) => (
                <span key={key}>
                  <span className={s.key}>{key.padEnd(8)}</span>
                  {value}
                  {'\n'}
                </span>
              ))}
              <span className={s.prompt}>$</span> <span className={s.cursor} />
            </pre>
          </div>

          <p className={cx(s.hint, s.fadeIn)} style={vars({ '--d': '1400ms' })}>
            Scroll <i>↓</i>
          </p>
        </div>
      </section>

      {/* 01 Origin */}
      <section id="origin" className={s.chapter} {...paint(themes.taiga)}>
        <div className={s.wrap}>
          <Kicker n="01">Origin</Kicker>
          <h2 className={cx(s.display, s.title, s.reveal)}>
            Born in the <em>taiga</em>.
          </h2>
          <div className={s.split}>
            <p className={cx(s.lead, s.reveal)}>
              I was born in Vostok-2, a small town in Primorye, in the Russian Far East.
            </p>
            <p className={cx(s.body, s.reveal)}>
              The town sits inside the taiga, the largest forest in the world. Endless hills, long
              winters, and tigers.
            </p>
          </div>

          <VostokMap />
        </div>

        <figure className={s.unfold}>
          <Image src={img('taiga')} alt="Green hills of taiga to the horizon" fill sizes="100vw" />
          <figcaption>The taiga. It does not end.</figcaption>
        </figure>

        <div className={s.wrap}>
          <div className={s.trio}>
            <Photo
              name="vostok-b"
              alt="Vostok-2 in winter, a small town in a valley under snowy hills"
              caption="Vostok-2."
            />
            <Photo
              name="vostok-house"
              alt="A snowy street with wooden houses in Vostok-2"
              caption="My house is in this photo. Not the painted one on the right."
              delay={120}
            />
            <Photo
              name="vostok-a"
              alt="Wooden houses and a greenhouse in deep snow"
              caption="Winter."
              delay={240}
            />
          </div>

          <div className={cx(s.fact, s.reveal)}>
            <p className={s.kicker}>I checked the news</p>
            <p>
              Nothing has changed. <em>Tigers</em>, here and there.
            </p>
          </div>

          <div className={s.pair}>
            <Photo
              name="amur-tiger"
              alt="An Amur tiger lying in the snow, showing its teeth"
              caption="An Amur tiger. Photo: Dave Pape, public domain."
              ar="6 / 5"
              sizes="(min-width: 800px) 50vw, 100vw"
            />
            <Photo
              name="tiger-news"
              alt="A tiger lying in the snow next to people’s boots"
              caption="From the news."
              sizes="(min-width: 800px) 50vw, 100vw"
              delay={120}
            />
          </div>
        </div>
      </section>

      {/* 02 Vladivostok */}
      <section id="vladivostok" className={s.chapter} {...paint(themes.sea)}>
        <div className={s.wrap}>
          <Kicker n="02">Vladivostok</Kicker>
          <h2 className={cx(s.display, s.title, s.reveal)}>
            Vladivostok, <em>16 to 25</em>.
          </h2>
          <div className={s.split}>
            <p className={cx(s.lead, s.reveal)}>
              At 16 I moved to Vladivostok, a port city on the Pacific, and stayed until 25.
            </p>
            <p className={cx(s.body, s.reveal)}>
              University, hills, the sea, a lot of rubble, and many trips to China.
            </p>
          </div>

          <div className={s.table}>
            <Print
              name="university-2"
              alt="Vladivostok from a hill, roofs and the bay in winter haze"
              caption="The view near my university."
              turn="-1.6deg"
            />
            <Print
              name="university-1"
              alt="Boris on a swing frame in the middle of rubble"
              caption="Also near my university."
              ar="3 / 4"
              turn="1.8deg"
            />
            <Print
              name="university-3"
              alt="Boris sitting on a chair on top of a pile of rubble"
              caption="Still near my university."
              turn="-2.2deg"
            />
            <Print
              name="vladivostok-2011"
              alt="Boris in a winter hat with friends in central Vladivostok"
              caption="Downtown, winter."
              turn="1.2deg"
            />
            <Print
              name="china"
              alt="Boris and a friend cooking hot pot at a table"
              caption="One of many trips to China. Hot pot."
              turn="-1deg"
            />
          </div>
        </div>
      </section>

      {/* 03 Bashkortostan */}
      <section id="bashkortostan" className={s.chapter} {...paint(themes.wood)}>
        <div className={s.wrap}>
          <Kicker n="03">Bashkortostan</Kicker>
          <h2 className={cx(s.display, s.title, s.reveal)}>
            Mom and dad moved <em>west</em>.
          </h2>
          <div className={s.split}>
            <p className={cx(s.lead, s.reveal)}>
              My parents moved from Primorye to Bashkortostan, over 5,000 km west.
            </p>
            <p className={cx(s.body, s.reveal)}>
              It’s a Muslim region, which explains the funny hats. The second photo is me right
              before I left for New Zealand.
            </p>
          </div>

          <div className={s.pair}>
            <Photo
              name="bashkortostan-1"
              alt="Four men in traditional skullcaps standing by a pine wall"
              caption="Funny hats."
              ar="3 / 2"
              sizes="(min-width: 800px) 50vw, 100vw"
            />
            <Photo
              name="bashkortostan-2"
              alt="Boris with his parents and a relative in a wooden room"
              caption="Me, just before New Zealand."
              ar="3 / 2"
              sizes="(min-width: 800px) 50vw, 100vw"
              delay={120}
            />
          </div>

          <p className={cx(s.spot, s.reveal)}>
            Next stop: <em>New Zealand</em>.
          </p>
        </div>
      </section>

      {/* 04 New Zealand */}
      <section id="new-zealand" className={s.chapter} {...paint(themes.ocean)}>
        <div className={s.wrap}>
          <Kicker n="04">New Zealand</Kicker>
          <h2 className={cx(s.display, s.title, s.reveal)}>
            I got into New Zealand with <em>automation</em>.
          </h2>
          <div className={s.split}>
            <div className={s.reveal}>
              <p className={s.lead}>
                I wrote a PHP script that checked the Silver Fern visa page for free spots and sent
                me a text message when one appeared.
              </p>
              <p className={cx(s.body, s.spaced)}>
                Silver Fern was a job search visa with a small yearly quota. The script worked, and
                in 2012 I moved to New Zealand.
              </p>
            </div>
            <div className={s.reveal} style={vars({ '--d': '150ms' })}>
              <pre className={s.code}>
                <span className={s.c}>{'<?php'}</span>
                {'\n'}
                <span className={s.c}>
                  {'// silver-fern.php, reconstructed. The original is long gone.'}
                </span>
                {'\n\n'}
                <span className={s.k}>while</span> (true) {'{'}
                {'\n'}
                {'    $page = file_get_contents($silverFernPage);\n\n'}
                {'    '}
                <span className={s.k}>if</span>
                {" (strpos($page, 'no places available') === false) {\n"}
                {"        send_sms($me, 'Silver Fern is open. Go!');\n"}
                {'        '}
                <span className={s.k}>break</span>
                {';\n    }\n\n    sleep(60);\n}'}
              </pre>
              <p className={s.codeNote}>Not the real code. The idea was about this simple.</p>
            </div>
          </div>

          <div className={s.outside}>
            <Kicker n="04">Outside</Kicker>
            <h3 className={cx(s.display, s.outsideTitle, s.reveal)}>
              Basic <em>hobbies</em>.
            </h3>
            <p className={cx(s.lead, s.narrow, s.reveal)}>
              Hiking, kiteboarding, wakeboarding, snowboarding and cycling.
            </p>

            <div className={s.bento}>
              <Tile
                loop="hike"
                alt="Hikers walking across a rocky alpine slope"
                label="Hiking"
                className={cx(s.w2, s.w3, s.h2)}
              />
              <Tile
                photo="hike-1"
                alt="Boris in Crocs, holding one foot above his head on a mountain pass"
                label="Yoga on a pass, in Crocs"
                className={s.h2}
                position="42% 50%"
              />
              <Tile
                photo="hike-2"
                alt="Boris lying face down on a patch of snow"
                label="Resting"
                className={s.dw2}
              />
              <Tile
                photo="hike-3"
                alt="Boris and a friend licking snow from a cup by an alpine lake"
                label="Fresh snow, served in a cup"
                className={s.dw2}
              />
              <Tile
                loop="kite"
                alt="Kiteboarding along a beach, seen from the board"
                label="Kiteboarding, St Heliers"
                className={cx(s.w2, s.w4, s.h2)}
              />
              <Tile
                photo="kiteboarding"
                alt="Boris kiteboarding on choppy water"
                label="Kiteboarding"
                className={s.dw2}
              />
              <Tile
                photo="wakeboarding"
                alt="Boris wakeboarding behind a boat"
                label="Wakeboarding"
                className={s.dw2}
              />
              <Tile
                photo="snowboarding"
                alt="Boris with friends at a ski field"
                label="Snowboarding"
                className={s.dw2}
              />
              <Tile
                loop="cycle"
                alt="Mountain biking down a forest trail, seen from the handlebars"
                label="Cycling"
                className={cx(s.w2, s.w4, s.h2)}
              />
              <Tile
                photo="hike-4"
                alt="A group of hikers with backpacks at a trailhead"
                label="The hiking crew"
                className={s.dw2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 05 Long COVID */}
      <section id="long-covid" className={cx(s.chapter, s.quiet)} {...paint(themes.quiet)}>
        <div className={s.wrap}>
          <div className={s.quietGrid}>
            <div>
              <Kicker n="05">Long COVID</Kicker>
              <h2 className={cx(s.display, s.title, s.reveal)}>
                February 2022. <em>Still here.</em>
              </h2>
              <p className={cx(s.lead, s.reveal)}>
                I caught COVID in February 2022, and I still have it.
              </p>
              <p className={cx(s.body, s.spaced, s.reveal)}>
                My hobbies after long COVID look quite different. They are the next chapter.
              </p>
              <p className={cx(s.counter, s.reveal)}>
                {covid}
                <small>and counting</small>
              </p>
            </div>
            <div className={cx(s.breathWrap, s.reveal)}>
              <div className={s.breath} aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* 06 AI */}
      <section id="ai" className={s.chapter} {...paint(themes.terminal)}>
        <div className={s.wrap}>
          <Kicker n="06">AI</Kicker>
          <h2 className={cx(s.display, s.title, s.reveal)}>
            Basically, an <em>AI obsession</em>.
          </h2>
          <div className={s.split}>
            <p className={cx(s.lead, s.reveal)}>
              I give AI real jobs at home: run my cluster, model my house, haggle on Trade Me.
            </p>
            <p className={cx(s.body, s.reveal)}>
              My main lesson so far: if you can’t say clearly what you want, even the best model
              will average everything into a safe grey middle.
            </p>
          </div>

          <div className={s.cards}>
            <Card
              tag="Home lab"
              title="Soyspray"
              span={s.c7}
              media={
                <CardPhoto
                  name="soyspray"
                  alt="Three Lenovo mini PCs stacked in a black 3D printed rack"
                  position="50% 62%"
                  ar="16 / 10"
                />
              }
              more={{ href: '/blog/soyspray-series', label: 'The Soyspray series' }}
            >
              <p>
                My home Kubernetes cluster, because every tutorial stopped at hello world. It
                started on three fanless $120 mini PCs from AliExpress.
              </p>
            </Card>
            <Card
              tag="3D printing"
              title="An AI-designed rack"
              span={s.c5}
              media={
                <div className={s.frame} style={vars({ '--ar': '1 / 1' })}>
                  <Loop
                    name="rack"
                    label="Animated assembly guide: mini PCs slide into a printed rack"
                  />
                </div>
              }
            >
              <p>
                AI designed the case for the cluster and drew this assembly guide. I printed it.
              </p>
            </Card>
            <Card
              tag="Hardware"
              title="SoyOS on an iPhone 4"
              span={s.c4}
              media={
                <CardPhoto
                  name="soyos"
                  alt="An old iPhone 4 showing a page of text in a terminal font"
                  position="50% 74%"
                />
              }
            >
              <p>
                My old iPhone 4 runs Linux now. AI draws every screen and there are no apps. Here it
                shows one of my Telegram posts.
              </p>
            </Card>
            <Card
              tag="Blender"
              title="My house in 3D"
              span={s.c4}
              media={
                <CardPhoto
                  name="house-model"
                  alt="A 3D render of a living room with a sofa and a table"
                />
              }
            >
              <p>
                I walked around the house with my phone and a laser measure, talking. AI turned the
                video into a Blender model.
              </p>
            </Card>
            <Card
              tag="Garden"
              title="A bed with a worm farm"
              span={s.c4}
              media={
                <CardPhoto
                  name="garden-bed"
                  alt="A 3D render of a small yard with a raised garden bed"
                />
              }
            >
              <p>A 3D model of a raised garden bed with a worm farm built in.</p>
            </Card>
            <Card
              tag="Private"
              title="Meme recommender"
              span={s.c5}
              media={
                <div className={s.browser}>
                  <div className={s.browserBar}>
                    <i />
                    <i />
                    <i />
                    <span>memes, 300,000 of them</span>
                  </div>
                  <div className={s.frame} style={vars({ '--ar': '898 / 480', '--radius': '0' })}>
                    <Image
                      src={img('meme-fish')}
                      alt="A meme: a green cartoon fish with the caption be me, fish"
                      fill
                      sizes="(min-width: 1150px) 40vw, 100vw"
                    />
                  </div>
                </div>
              }
            >
              <p>
                My private project on my 300k unfiltered memes. I want to check if my algorithm is
                better than random.
              </p>
            </Card>
            <Card
              tag="AI skill"
              title="Errands"
              span={cx(s.c7, s.wide)}
              media={
                <p className={s.steps} aria-hidden="true">
                  <span>Scout.</span>
                  <span>Pick.</span>
                  <span>Offer.</span>
                  <span>Report.</span>
                </p>
              }
            >
              <p>
                The latest skill I built with AI. It hunts second-hand things on Trade Me and
                Facebook Marketplace: finds listings, picks the best one, makes an offer and reports
                to me on Telegram.
              </p>
              <p>First win: a 65-inch Sony TV for $690.</p>
            </Card>
          </div>
        </div>
      </section>

      <div className={s.band} aria-hidden="true">
        <div className={s.marquee}>
          {[...interests, ...interests].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* 07 Family */}
      <section id="family" className={s.chapter} {...paint(themes.sun)}>
        <div className={s.wrap}>
          <Kicker n="07">Family</Kicker>
          <h2 className={cx(s.display, s.title, s.reveal)}>
            Me and my <em>son</em>.
          </h2>
          <p className={cx(s.lead, s.narrow, s.reveal)}>
            Bubbles on the lawn, fountains, paddleboarding and ice cream.
          </p>

          <div className={s.familyGrid}>
            <Photo
              name="son-1"
              alt="Boris crouching on a lawn while kids blow giant soap bubbles"
              caption="Bubbles on the lawn."
              ar="16 / 9"
              sizes="100vw"
              position="50% 70%"
            />
            <Photo
              name="son-2"
              alt="Boris holding his son at the edge of a fountain"
              caption="Fountain inspection."
              ar="3 / 4"
              position="60% 60%"
            />
            <Photo
              name="son-3"
              alt="Boris paddleboarding with his son"
              caption="Paddleboarding."
              ar="3 / 4"
              position="56% 50%"
              delay={120}
            />
            <Photo
              name="son-4"
              alt="Boris and his son eating ice cream at a cafe table"
              caption="Ice cream."
              ar="3 / 4"
              delay={240}
            />
          </div>
        </div>
      </section>

      {/* 08 Work */}
      <section id="work" className={s.chapter} {...paint(themes.white)}>
        <div className={s.wrap}>
          <Kicker n="08">Work</Kicker>
          <h2 className={cx(s.display, s.title, s.reveal)}>
            How to work with <em>me</em>.
          </h2>

          <dl className={s.faq}>
            <div className={s.reveal}>
              <dt>Talk to me</dt>
              <dd>
                In person first, then in writing. Text loses the non-verbal part, and talk without
                notes gets lost, so everything should be written down by AI.
              </dd>
            </div>
            <div className={s.reveal}>
              <dt>Convince me</dt>
              <dd>
                With data: experiments and success metrics agreed in advance. I’m autistic, so job
                titles mean little to me. Show me{' '}
                <strong>fewer failures, faster delivery or less manual work</strong> and I’ll take
                your idea over mine.
              </dd>
            </div>
            <div className={s.reveal}>
              <dt>Motivation</dt>
              <dd>
                Automating away boring, repetitive work, and using AI so engineers spend their time
                on work they enjoy.
              </dd>
            </div>
            <div className={s.reveal}>
              <dt>Annoys me</dt>
              <dd>
                Nothing at work for about five years. I did delete Teams from my phone: too many
                sign-in prompts.
              </dd>
            </div>
            <div className={s.reveal}>
              <dt>Hours</dt>
              <dd>
                Standard hours. Sometimes a 40-minute nap at lunch, often an hour or two online in
                the evening.
              </dd>
            </div>
            <div className={s.reveal}>
              <dt>Stress</dt>
              <dd>I’m 40. I don’t take work or life seriously enough to get stressed.</dd>
            </div>
            <div className={s.reveal}>
              <dt>Feedback</dt>
              <dd>In person, then a short written follow-up. Facts work best.</dd>
            </div>
            <div className={s.reveal}>
              <dt>Also useful</dt>
              <dd>
                Diagnosed autistic at 39. Try my{' '}
                <Link href="/projects/autistic-traits">autistic traits questionnaire</Link>.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 09 Dreams */}
      <section id="dreams" className={cx(s.chapter, s.dawn)} {...paint(themes.dawn)}>
        <div className={cx(s.wrap, s.dreams)}>
          <Kicker n="09">Dreams</Kicker>
          <h2 className={cx(s.display, s.dreamTitle, s.reveal)}>
            Financial independence. Then <em>helping people</em>.
          </h2>
          <p className={cx(s.lead, s.mission, s.reveal)}>
            I also have a personal mission. I’ll tell you about it once I start.
          </p>

          <div className={s.quotes}>
            <blockquote className={s.reveal}>
              <p>
                “Maybe your place is a farm with three cows, and you’ll love it. The point is not
                status. The point is not to live against your own nature.”
              </p>
              <footer>My Telegram channel, July 2026</footer>
            </blockquote>
            <blockquote className={s.reveal} style={vars({ '--d': '150ms' })}>
              <p>
                “You can do almost anything, within the law. ‘It’s shameful’, ‘it’s dangerous’,
                ‘nobody does this’ is just ordinary fear.”
              </p>
              <footer>My Telegram channel, September 2026</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* 10 Thanks */}
      <section id="thanks" className={s.thanks} {...paint(themes.paper)}>
        <div className={s.wrap}>
          <Kicker n="10">Thanks</Kicker>
          <h2 className={cx(s.display, s.thanksTitle, s.reveal)}>
            Questions<em>?</em>
          </h2>
          <nav className={cx(s.links, s.reveal)} aria-label="More about me">
            <Link href="/">borisascode.com</Link>
            <Link href="/blog">Blog</Link>
            <Link href="https://github.com/kpoxo6op">GitHub</Link>
            <Link href="https://linkedin.com/in/kpoxo6op">LinkedIn</Link>
            <Link href="/projects/autistic-traits">Autistic traits</Link>
          </nav>
          <p className={cx(s.footnote, s.reveal)}>
            Built overnight by AI from my voice notes, my Telegram channel and my photos.
          </p>
        </div>
      </section>
    </Stage>
  )
}
