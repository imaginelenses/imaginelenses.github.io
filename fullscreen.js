/*
 * Renders images in fullscreen when clicked on
 *
 * Usage:
 * Add the following to the body
 * '<div class="modal fade" id="fullscreen" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"></div></div>
 *
 * Image tag format
 * <img class="thumbnail" src="..." alt="...">
 * To add more classes to image tag thumbnail[] index should be modified accordingly
 *
 * Add to stylesheet:
 * .thumbnail { object-fit: cover; }
 * .fullscreen { max-width: 90vw; max-height: 90vh; }
 */

// Waits for the DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {

    // Selects all images with class "thumbnail"
    document.querySelectorAll('.thumbnail').forEach(item=> {

        // Adds a click event listner to each of thoses images
        item.addEventListener('click', event=> {

            // Gets the image node that clicked on
            let thumbnail = item.parentElement.innerHTML;
            thumbnail = String(thumbnail).trim().split(' ');

            // Adds the image node to the HTML node added above after replacing class "thumbnail" with "fullscreen"
            let fullscreen = document.querySelector('.modal-dialog');
            let temp = thumbnail[0] + ' class="mx-auto fullscreen" ';

            let n = thumbnail.length;
            for (let i = 2; i < n; i++)
            {
                temp = temp + thumbnail[i];
            }
            fullscreen.innerHTML = temp;

            // Renders image in fullscreen
            $('#fullscreen').modal('show');
        });
    });
});