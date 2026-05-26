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
        initOtherPagesScroll()
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
    // Track whether user has scrolled to the end (footer visible)
    // Arrow only flips to up AFTER reaching the end, not just by scrolling
    let reachedEnd = false

    if (scrollBtn) {
        // Button visible from start with down arrow
        scrollBtn.classList.remove('is-up')
        scrollBtn.classList.remove('faded')

        scrollBtn.addEventListener('click', () => {
            if (scrollBtn.classList.contains('is-up')) {
                // Up arrow: scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                // Down arrow: scroll to next section image
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
                // Footer is visible: mark end reached, hide button
                reachedEnd = true
                scrollBtn.classList.add('faded')
            } else if (window.scrollY < 50) {
                // Back at top: reset state, show down arrow
                reachedEnd = false
                scrollBtn.classList.remove('faded')
                scrollBtn.classList.remove('is-up')
            } else if (reachedEnd) {
                // Footer gone but we already reached end — show up arrow
                scrollBtn.classList.remove('faded')
                scrollBtn.classList.add('is-up')
            } else {
                // Still navigating through sections — keep down arrow
                scrollBtn.classList.remove('faded')
                scrollBtn.classList.remove('is-up')
            }
        }, { passive: true })
    }
}

// ─── OTHER PAGES: Simple scroll button for /projects, /blog, etc. ──────────
function initOtherPagesScroll() {
    const scrollBtn = document.getElementById('scrollDown')
    const footer = document.querySelector('footer')

    if (scrollBtn) {
        // Initially hide the button (not visible, not clickable)
        scrollBtn.classList.add('is-up')
        scrollBtn.classList.add('faded')

        scrollBtn.addEventListener('click', () => {
            // Always scroll to top on click
            window.scrollTo({ top: 0, behavior: 'smooth' })
        })

        // Handle button visibility based on scroll position
        document.addEventListener('scroll', () => {
            const footerVisible = footer && footer.getBoundingClientRect().top < window.innerHeight

            if (footerVisible) {
                // Footer visible: fade out button
                scrollBtn.classList.add('faded')
            } else {
                // Footer not visible
                if (window.scrollY > 200) {
                    // Scrolled down: show button with up arrow
                    scrollBtn.classList.remove('faded')
                } else {
                    // Near top: keep button hidden
                    scrollBtn.classList.add('faded')
                }
            }
        }, { passive: true })
    }
}