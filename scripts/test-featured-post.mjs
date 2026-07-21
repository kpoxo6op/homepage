import assert from 'node:assert/strict'

const response = await fetch('http://localhost:3000/')
assert.equal(response.status, 200)

const html = await response.text()
assert.match(html, />Featured</)
assert.match(html, /href="\/blog\/soyspray-series\/"/)
assert.match(html, /soyspray-xmas-2024\.jpg/)

console.log('Featured Soyspray Series card is visible on the local homepage.')
