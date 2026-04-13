document.addEventListener('DOMContentLoaded', () => {

    // Set navbar height as CSS variable for layout calculations
    const nav = document.querySelector('nav')
    if (nav) {
        document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px')
    }

    // ─── HOME PAGE HANDLER ──────────────────────────────────────────────────────
    // Handles section-based navigation and hero image zoom effects
    const sectionImages = document.querySelectorAll('.sectionImage')
    const hasHomePageLayout = sectionImages.length > 0

    if (hasHomePageLayout) {
        initHomePageScroll(sectionImages)
    } else {
        // ─── OTHER PAGES HANDLER ──────────────────────────────────────────────────
        // Handles simple page scrolling for /projects, /blog, etc.
        initPageScroll()
    }
})

// ─── HOME PAGE: Section navigation & image zoom effects ───────────────────────
function initHomePageScroll(sectionImages) {
    let init = 1
    if (document.documentElement.clientHeight > sectionImages[0].height) {
        init = 1.1
    }

    const factor = 7000
    window.scrollTo(1, 1)

    // Image zoom on scroll
    document.addEventListener('scroll', (e) => {
        let scroll = window.scrollY
        if (scroll === 0) return

        const applyTransform = (img, scale) => {
            const flip = img.classList.contains('mirroredImage') ? 'scaleX(-1) ' : ''
            img.style.transform = `${flip}scale(${scale})`
        }

        let offset = 0
        applyTransform(sectionImages[0], init + ((scroll - offset) / factor))
        offset = offset + sectionImages[0].height

        for (let i = 1, len = sectionImages.length; i < len; i++) {
            applyTransform(sectionImages[i], init + ((scroll - offset) / factor))
            offset = offset + sectionImages[i].height
        }
    })

    // Home page scroll button: navigate to sections
    const scrollBtn = document.getElementById('scrollDown')
    const footer = document.querySelector('footer')

    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            if (scrollBtn.classList.contains('is-up')) {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                const sections = Array.from(document.querySelectorAll('.section'))
                const next = sections.find(s => s.getBoundingClientRect().top > 1)
                if (next) {
                    next.scrollIntoView({ behavior: 'smooth', block: 'start' })
                } else {
                    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
                }
            }
        })

        document.addEventListener('scroll', () => {
            const footerVisible = footer && footer.getBoundingClientRect().top < window.innerHeight

            if (footerVisible) {
                scrollBtn.classList.add('faded')
                scrollBtn.classList.add('is-up')
            } else {
                scrollBtn.classList.remove('faded')
                if (window.scrollY > 200) {
                    scrollBtn.classList.add('is-up')
                } else {
                    scrollBtn.classList.remove('is-up')
                }
            }
        }, { passive: true })
    }
}

// ─── OTHER PAGES: Simple scroll button for /projects, /blog, etc. ──────────
function initPageScroll() {
    const scrollBtn = document.getElementById('scrollDown')
    const footer = document.querySelector('footer')

    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            if (scrollBtn.classList.contains('is-up')) {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
            }
        })

        document.addEventListener('scroll', () => {
            const footerVisible = footer && footer.getBoundingClientRect().top < window.innerHeight

            if (footerVisible) {
                scrollBtn.classList.add('faded')
                scrollBtn.classList.add('is-up')
            } else {
                scrollBtn.classList.remove('faded')
                if (window.scrollY > 200) {
                    scrollBtn.classList.add('is-up')
                } else {
                    scrollBtn.classList.remove('is-up')
                }
            }
        }, { passive: true })
    }
}