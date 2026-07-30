import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000'

const projectsResponse = await fetch(`${baseUrl}/projects/`)
assert.equal(projectsResponse.status, 200)

const projectsHtml = await projectsResponse.text()
assert.match(projectsHtml, /YEETer/)
assert.match(projectsHtml, /href="\/blog\/yeeter\/"/)
assert.doesNotMatch(projectsHtml, /yeeter-bqw\.pages\.dev/)
assert.match(projectsHtml, /Dead project/)

const graveyardResponse = await fetch(`${baseUrl}/blog/yeeter/`)
assert.equal(graveyardResponse.status, 200)

const graveyardHtml = await graveyardResponse.text()
assert.match(graveyardHtml, /enthusiastic about artificial intelligence/)
assert.match(graveyardHtml, /colleagues sometimes share/)
assert.doesNotMatch(graveyardHtml, /people who are obsessed with artificial intelligence/)
assert.doesNotMatch(graveyardHtml, /Let me try to remember what they made/)
assert.match(graveyardHtml, /Some of the ideas are quite good/)
assert.doesNotMatch(graveyardHtml, /There is a working Shopify integration/)
assert.match(graveyardHtml, /least failed attempt/)
assert.match(graveyardHtml, /cried over the verdict/)
assert.match(graveyardHtml, /<h1[^>]*>My Least Failed Product<\/h1>/)
assert.doesNotMatch(graveyardHtml, /<h1[^>]*>[^<]*(?:YEETer:|Vibe-Coded)[^<]*<\/h1>/)
assert.match(graveyardHtml, /Table of Contents/)
assert.doesNotMatch(graveyardHtml, /seven-listings-by-hand|Seven listings by hand/)
assert.match(graveyardHtml, /href="#making-yeeter"/)
assert.doesNotMatch(graveyardHtml, /href="#ai-psychosis-finds-a-practical-use"/)
assert.match(graveyardHtml, /href="#taking-yeeter-outside"/)
assert.match(graveyardHtml, /href="#the-end"/)

const articleSource = await readFile('data/blog/yeeter.mdx', 'utf8')
assert.match(articleSource, /^draft: false$/m)
assert.match(articleSource, /^## Table of Contents$/m)
assert.ok(articleSource.indexOf('## Table of Contents') < articleSource.indexOf('At work we have'))
assert.doesNotMatch(articleSource, /FUTURE VIDEO|Frame from the future/)
assert.doesNotMatch(articleSource, /YEETer was an experiment from April 2026/)
assert.doesNotMatch(articleSource, /The app worked, but it could not become a real product/)
assert.doesNotMatch(articleSource, /long COVID|kiteboarding|Excel spreadsheet|seven items/)
assert.doesNotMatch(
  articleSource,
  /deconstruction prompts|felt-tip drawings|Microsoft Paint pictures/
)
assert.doesNotMatch(
  articleSource,
  /state of AI psychosis for several years|AI news on Telegram|Figma was apparently|you already know what this story/
)
assert.match(
  articleSource,
  /AI image processing and each person's saved preferences could automate/
)
assert.match(articleSource, /GPT Image 2/)
assert.match(articleSource, /21 April 2026/)
assert.match(articleSource, /give it a real task/)
assert.match(articleSource, /I live in a sketchy area where people leave random shit outside/)
assert.match(articleSource, /YEETer had plenty of test inventory/)
assert.match(
  articleSource,
  /My favourite: putting an old towel that had already been run over a few times up for sale/
)
assert.match(articleSource, /Maybe Trade Me will build it themselves one day/)
assert.match(articleSource, /their similar system only works for cars/)
assert.match(articleSource, /Everything else is still listed the old way/)
assert.match(articleSource, /Clash Royale addict/)
assert.doesNotMatch(articleSource, /And that is what happened\. Or perhaps what will happen later/)
assert.doesNotMatch(articleSource, /96% confidence|prices were placeholders/)
assert.doesNotMatch(articleSource, /reversible photo capture|overlapping footer|redo any stage/)

const videoNames = [
  'screen-20260426-105534-1777157708744.mp4',
  'screen-20260426-105957-1777157964139.mp4',
  'screen-20260426-112008-1777159181978.mp4',
  'screen-20260426-131448-1777166062285.mp4',
  'trademe-headset-obs-trimmed.mp4',
]

for (const videoName of videoNames) {
  assert.match(graveyardHtml, new RegExp(`static/videos/yeeter/${videoName}`))
  const response = await fetch(`${baseUrl}/static/videos/yeeter/${videoName}`)
  assert.equal(response.status, 200)
  assert.match(response.headers.get('content-type') ?? '', /video\/mp4/)
  assert.match(response.headers.get('content-security-policy') ?? '', /media-src[^;]*'self'/)
}

const imageNames = [
  'desk-headphones-listing.webp',
  'desk-travel-cup-listing.webp',
  'intended-listing-flow.webp',
  'openai-ui-review-1.webp',
  'openai-ui-review-2.webp',
  'openai-ui-review-3.webp',
  'openai-ui-review-4.webp',
]

for (const imageName of imageNames) {
  assert.match(graveyardHtml, new RegExp(`static/images/yeeter/${imageName}`))
  const response = await fetch(`${baseUrl}/static/images/yeeter/${imageName}`)
  assert.equal(response.status, 200)
  assert.match(response.headers.get('content-type') ?? '', /image\/webp/)
}

console.log('The published YEETer post renders with every video and design image.')
