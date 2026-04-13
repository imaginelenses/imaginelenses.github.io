document.addEventListener('DOMContentLoaded', () => {

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

    // Scroll-down button
    const scrollBtn = document.getElementById('scrollDown')
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            scrollBtn.classList.add('hidden')
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
        })

        document.addEventListener('scroll', () => {
            if (window.scrollY < 50) {
                scrollBtn.classList.remove('hidden')
            }
        }, { passive: true })
    }

})