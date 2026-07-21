import assert from 'node:assert/strict'

const response = await fetch('http://localhost:3000/')
assert.equal(response.status, 200)

const html = await response.text()
assert.match(html, /aria-label="bc_ logo"/)
assert.match(html, />bc_</)

console.log('Approved bc_ logo is rendered on the local homepage.')
