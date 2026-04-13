document.addEventListener('DOMContentLoaded', () => {

    // ─── SCROLL-DOWN USES NATIVE SMOOTH SCROLL ───────────────────────────────
    // Browser's built-in smooth scroll is subtle, simple, and OS-optimized.

    // Set navbar height as CSS variable for layout calculations
    const nav = document.querySelector('nav')
    if (nav) {
        document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px')
    }

    const sectionImages = document.querySelectorAll('.sectionImage')
    
    if (sectionImages.length > 0) {
        let init = 1
        if (document.documentElement.clientHeight > sectionImages[0].height) {
            init = 1.1
        }

        const factor = 7000

        window.scrollTo(1, 1)

        document.addEventListener('scroll', (e) => {
            let scroll = window.scrollY
            if (scroll === 0) {
                return 
            }
            
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
    }

    // Scroll-down / scroll-up dual-mode button
    const scrollBtn = document.getElementById('scrollDown')
    if (scrollBtn) {
        const footer = document.querySelector('footer')

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
                // Footer is in view: fade out
                scrollBtn.classList.add('faded')
                scrollBtn.classList.add('is-up')
            } else {
                // Footer not in view: show button
                scrollBtn.classList.remove('faded')

                // Show UP arrow only if user has scrolled down meaningfully
                if (window.scrollY > 200) {
                    scrollBtn.classList.add('is-up')
                } else {
                    scrollBtn.classList.remove('is-up')
                }
            }
        }, { passive: true })
    }
});