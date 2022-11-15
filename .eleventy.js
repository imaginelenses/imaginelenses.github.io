const path = require('path')
const Image = require('@11ty/eleventy-img')
const sass = require('sass')
const fg = require('fast-glob')
const { DateTime } = require('luxon')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Search for images in sub dirs
const travel = fg.sync(['**/media/travel/*', '!*.ico'])
const people = fg.sync(['**/media/people/*', '!*.ico'])
const events = fg.sync(['**/media/events/*', '!*.ico'])
const life   = fg.sync(['**/media/life/*',   '!*.ico'])


module.exports = (config) => {

    config.addGlobalData('production', process.env.PRODUCTION)

    config.addPlugin(syntaxHighlight)
    
    config.addCollection('travel', (collection) => travel)
    config.addCollection('people', (collection) => people)
    config.addCollection('events', (collection) => events)
    config.addCollection('life',   (collection) => life)

    config.addNunjucksAsyncShortcode('image', 
    async (dir, file, cls="", sizes="100vw", index="", statsOnly=false, lazy=true) => {
        let src = dir + file

        let extension = path.extname(src)
        let name = path.basename(src, extension)
        
        let metadata = await Image(src, {
            statsOnly,
            widths: [1000, 1500, 2000],
            formats: ['webp', 'jpeg'],
            urlPath: '/media/',
            outputDir: './public/media/',
            filenameFormat: (id, src, width, format, options) => {
                return `${name}-${width}w.${format}`
            }
        })
        
        let lowSrc = metadata.jpeg[0]
        let highSrc = metadata.jpeg[metadata.jpeg.length - 1]

        let alt = name.replaceAll('-', ' ')

        return (
        '<picture>' +
          `${Object.values(metadata).map(imageFormat => (
            `<source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(', ')}" sizes="${sizes}">`
          )).join('')}` +
          `<img src="${lowSrc.url}" width="${highSrc.width}" height="${highSrc.height}" alt="${alt}" class="${cls}" data-index="${index}" ${(lazy) ? 'loading="lazy" decoding="async"' : ''}>` +
        '</picture>')
    })

    // lite-youtube-embed
    config.addPassthroughCopy({
        'node_modules/lite-youtube-embed/src/lite-yt-embed.css': 'css/lite-yt-embed.css',
        'node_modules/lite-youtube-embed/src/lite-yt-embed.js': 'js/lite-yt-embed.js'
    })
    config.addNunjucksShortcode('youtube', (id, title) => (
    `<lite-youtube videoid="${id}" style="background-image: url('https://i.ytimg.com/vi/${id}/maxresdefault.jpg'); max-width: unset !important;">` +
      `<button type="button" class="lty-playbtn">` +
        `<span class="lyt-visually-hidden">Play Video: ${title}</span>` +
      `</button>` +
    `</lite-youtube>`
    ))

    // Distinguish Nunjucks Strings and Objects apart
    config.addFilter('isString', (obj) => (typeof(obj) === 'string'))

    // Anchor titles
    config.addNunjucksShortcode('title', (title) => {
        let id = config.getFilter('slugify')(title)
        return (
        `${title}<a id="${id}" href="#${id}" role="button" aria-label="Link to ${title}.">` +
          `<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-link-45deg" viewBox="0 0 16 16"><path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/></svg>` +
        `</a>`
        ) 
    })

    // Link icons
    config.addNunjucksShortcode('link', (href, text) => {
        let url = encodeURIComponent(new URL(href).origin)
        return (
        `<a href="${href}" target="_blank" style="--icon: url('https://v1.indieweb-avatar.11ty.dev/${url}/');">${text}</a>`
        )
    })

    // Cache Key
    const cacheKey = DateTime.now().setZone('Asia/Kolkata').toISODate().replaceAll('-', '')
    config.addGlobalData('cacheKey', () => (cacheKey))
    
    // OpenGraph images
    config.addNunjucksShortcode('ogImage', (link, lazy=true) => {
        let url = encodeURIComponent(link)
        return (
        '<picture>' +
          `<source type="image/webp" srcset="https://v1.opengraph.11ty.dev/${url}/medium/webp/_${cacheKey}/">` +
          `<source type="image/webp" srcset="https://v1.opengraph.11ty.dev/${url}/medium/jpeg/_${cacheKey}/">` +
          `<img src="https://v1.opengraph.11ty.dev/${url}/small/jpeg/_${cacheKey}/" alt="Preview of ${link}" width="650" height="341" class="ogImage" ${(lazy) ? 'loading="lazy" decoding="async"' : ''}>` +
        '</picture>'
        )
    })

    // First n values
    config.addFilter('limit', (arr, n) => (arr.slice(0, n)))

    // Sort posts by year
    config.addCollection('postsByYear', (collection) => {
        let posts = collection.getFilteredByTag("posts");
        
        let yearPostsDict = {}
        let len = posts.length
        for (let i = 0; i < len; i++) {
            let year = DateTime.fromJSDate(posts[i].date, {zone: 'Asia/Kolkata'}).toFormat('yyyy')
            if (!(year in yearPostsDict)) {
                yearPostsDict[year] = []
            }
            yearPostsDict[year].push(posts[i])
        }

        return yearPostsDict
    })
    
    // SASS
    config.addWatchTarget('./src/css')
    config.addNunjucksShortcode('scss', (src) => {
        let result = sass.compile(src, {style: "compressed"})
        return `<style>${result.css}</style>`
    })

    // Filter tags list
    const filterTagList = (tags) => (
        (tags || []).filter((tag) => ['all', 'nav', 'posts', 'projects'].indexOf(tag) === -1)
    )
    config.addFilter('filterTags', filterTagList)
    
    // Collection of all tags
    config.addCollection('allTags', (collection) => {
        let tags = new Set()
        collection.getAll().forEach((item) => {
            (item.data.tags || []).forEach((tag) => (tags.add(tag)))
        })

        return filterTagList([...tags])
    })

    config.addPassthroughCopy('./src/media/favicon.ico')
    config.addPassthroughCopy('./src/CNAME')
    
    // Scripts
    config.addPassthroughCopy('./src/js')
    config.addWatchTarget('./src/js')

    // Dates
    config.addFilter('htmlDate', (date) => (
        DateTime.fromJSDate(date, {zone: 'Asia/Kolkata'}).toFormat('yyyy-LL-dd')
    ))
    config.addFilter('date', (date) => (
        DateTime.fromJSDate(date, {zone: 'Asia/Kolkata'}).toFormat('dd LLL yyyy')
    ))
    config.addShortcode('year', () => `${new Date().getFullYear()}`)

    return {
        dir: {
            input: 'src',
            output: 'public'
        },
        templateFormats: ['html', 'md', 'njk'],
        dataTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk'
    }
}