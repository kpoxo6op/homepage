import assert from 'node:assert/strict'

const response = await fetch('http://localhost:3000/blog/soyspray-series/')
assert.equal(response.status, 200)

const html = await response.text()
const visibleText = html.replace(/<[^>]+>/g, '')
assert.match(visibleText, /Last updated July 21, 2026/)

console.log('Last-updated marker is visible on a local blog post.')
