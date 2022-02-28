// Waits for the DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {

    // Array of all images
    let images = [];

    // Selects all images with class "thumbnail"
    document.querySelectorAll('.thumbnail').forEach(item=> {

        // Store paths of images
        images.push(item.attributes.getNamedItem('src').value);

        // Gets the image node that clicked on
        let thumbnail = item.parentElement.innerHTML;
        thumbnail = String(thumbnail).trim().split(' ');

        // Adds the image node to the HTML node added above after replacing class "thumbnail" with "fullscreen"
        let fullscreen = document.querySelector('.carousel-inner');
        let temp = thumbnail[0] + ' class="mx-auto fullscreen" ';

        let n = thumbnail.length;
        for (let i = 2; i < n; i++) {
            temp = temp + thumbnail[i];
        }
        fullscreen.innerHTML = fullscreen.innerHTML + '<div class="carousel-item">' + temp + '</div>';
        
        // Adds a click event listner to each of thoses images
        item.addEventListener('click', event=> {
            
            // Get path of image 
            let image = event.target.attributes.getNamedItem('src').value;
            
            // Get index of image
            let index = images.indexOf(image);

            // Activate image in carousel
            $('#carouselBanner').carousel(index);

            // Renders image in fullscreen
            $('#fullscreen').modal('show');
        });
    });

    // Set first carousel item active
    $('.carousel-item').first().addClass('active');

    // Handel keyboard input for carousel
    document.querySelector('.modal').addEventListener('keydown', event => {
        if (event.keyCode === 37) {
            $('#carouselBanner').carousel('prev');
        }
        if (event.keyCode === 39) {
            $('#carouselBanner').carousel('next');
        }
    });
});