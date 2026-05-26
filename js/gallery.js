document.addEventListener('DOMContentLoaded', () => {
    const carousel = new bootstrap.Carousel('#carousel')
    const modal = new bootstrap.Modal('#fullscreenModal')

    document.querySelectorAll('.galleryImage').forEach(image => {
        image.addEventListener('click', (event) => {
            const index = event.target.dataset.index
            
            // Cycle carousel to image index (images are 1 indexed)
            carousel.to(index - 1)
            
            modal.show()
        })
    })

    // Set first carousel item active
    document.querySelector('.carousel-item').classList.add('active')                             

    // Handel keyboard input for carousel
    document.querySelector('.modal').addEventListener('keydown', event => {
        if (event.keyCode === 37) {
            carousel.prev()
        }
        if (event.keyCode === 39) {
            carousel.next()
        }
    });
})