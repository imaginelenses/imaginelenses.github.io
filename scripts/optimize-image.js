#!/usr/bin/env node
/**
 * Optimizes a JPEG image using Sharp (already installed via @11ty/eleventy-img).
 * Strips metadata, caps at 2000px wide, encodes at quality 82 with progressive JPEG.
 * Resolution (aspect ratio) is preserved.
 *
 * Usage:  node scripts/optimize-image.js src/media/nyc.jpg
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const input = process.argv[2]
if (!input) {
    console.error('Usage: node scripts/optimize-image.js <path-to-image>')
    process.exit(1)
}

const abs = path.resolve(input)
if (!fs.existsSync(abs)) {
    console.error('File not found:', abs)
    process.exit(1)
}

const beforeBytes = fs.statSync(abs).size

const tmp = abs + '.tmp'

sharp(abs)
    .rotate()                                           // auto-orient from EXIF
    .resize(2000, null, { withoutEnlargement: true })   // max 2000px wide, keep ratio
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(tmp)
    .then(() => {
        const afterBytes = fs.statSync(tmp).size
        fs.renameSync(tmp, abs)
        const saved = (((beforeBytes - afterBytes) / beforeBytes) * 100).toFixed(1)
        console.log(`✓  ${path.basename(abs)}`)
        console.log(`   Before: ${(beforeBytes / 1024).toFixed(0)} KB`)
        console.log(`   After:  ${(afterBytes / 1024).toFixed(0)} KB  (${saved}% smaller)`)
    })
    .catch(err => {
        if (fs.existsSync(tmp)) fs.unlinkSync(tmp)
        console.error('Error:', err.message)
        process.exit(1)
    })
