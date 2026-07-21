import assert from 'node:assert/strict'

const projectsResponse = await fetch('http://localhost:3000/projects/')
assert.equal(projectsResponse.status, 200)

const projectsHtml = await projectsResponse.text()
assert.match(projectsHtml, /YEETer/)
assert.match(projectsHtml, /href="\/blog\/yeeter\/"/)
assert.doesNotMatch(projectsHtml, /yeeter-bqw\.pages\.dev/)
assert.match(projectsHtml, /Dead project/)

const graveyardResponse = await fetch('http://localhost:3000/blog/yeeter/')
assert.equal(graveyardResponse.status, 200)

const graveyardHtml = await graveyardResponse.text()
assert.match(graveyardHtml, /Status: Dead/)
assert.match(graveyardHtml, /April 2026/)
assert.match(graveyardHtml, /production API application was marked as declined/)
assert.match(graveyardHtml, /real Trade Me test listing/)
assert.match(graveyardHtml, /Screen recordings/)
assert.match(graveyardHtml, /static\/videos\/yeeter\/screen-20260426-105534/)
assert.match(graveyardHtml, /Completely vibecoded/)
assert.match(graveyardHtml, /scrcpy/)
assert.match(graveyardHtml, /static\/images\/yeeter\/openai-ui-review-4\.webp/)

const videoResponse = await fetch(
  'http://localhost:3000/static/videos/yeeter/screen-20260426-105534-1777157708744.mp4'
)
assert.equal(videoResponse.status, 200)
assert.match(videoResponse.headers.get('content-type') ?? '', /video\/mp4/)
assert.match(videoResponse.headers.get('content-security-policy') ?? '', /media-src[^;]*'self'/)

console.log('YEETer is marked dead and its project card links to the local graveyard page.')
