import assert from 'node:assert/strict'

const response = await fetch('http://localhost:3000/blog/soyspray/installing-the-os/')
assert.equal(response.status, 200)

const html = await response.text()
assert.match(html, /Installing the OS/)
assert.match(html, /HandleLidSwitch/)
assert.match(html, /silent-reader-cn\/yt6801/)
assert.match(html, /static\/images\/003-soyspray-series\/installing-the-os\//)

const seriesResponse = await fetch('http://localhost:3000/blog/soyspray-series/')
assert.equal(seriesResponse.status, 200)

const seriesHtml = await seriesResponse.text()
assert.match(seriesHtml, /href="\/blog\/soyspray\/installing-the-os\/"/)

console.log('Installing the OS is available locally and linked from the Soyspray series page.')
