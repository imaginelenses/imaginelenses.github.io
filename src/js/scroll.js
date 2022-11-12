document.addEventListener('DOMContentLoaded', () => {

    const sectionImages = document.querySelectorAll('.sectionImage')
    
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
        
        let offset = 0
        sectionImages[0].style.transform = `scale(${init + ((scroll - offset) / factor)})`
        offset = offset + sectionImages[0].height

        for (let i = 1, len = sectionImages.length; i < len; i++) {
            sectionImages[i].style.transform = `scale(${init + ((scroll - offset) / factor)})`
            offset = offset + sectionImages[i].height
        }
    })

})