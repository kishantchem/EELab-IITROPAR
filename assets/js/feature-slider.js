/* =====================================================
   Feature Box Image Slider
   Each .slider runs independently
====================================================== */

document.addEventListener('DOMContentLoaded', function () {

  document.querySelectorAll('.slider').forEach(function (slider) {

    const images = slider.querySelectorAll('img');
    let index = 0;

    if (images.length <= 1) return; // No slider needed

    setInterval(function () {
      images[index].classList.remove('active');
      index = (index + 1) % images.length;
      images[index].classList.add('active');
    }, 3000); // Change image every 3 seconds

  });

});

