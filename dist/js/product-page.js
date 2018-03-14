$(document).ready(function () {

  //Functions

  function changeGalleryTitle(selector) {
    var src = $(selector).attr('src');
    $('.product-gallery-title-image').attr('src', src);
  }

  //Init first gallery image

  changeGalleryTitle($('.product-gallery-thumbs-item').first())

  //Product slider

  var galleryThumbs = new Swiper('.product-gallery-thumbs', {
    spaceBetween: 10,
    direction	: 'vertical',
    slidesPerView: 4,
    loop: true,
    nextButton: '.next-btn',
    prevButton: '.prev-btn',
    breakpoints: {
     920: {
       slidesPerView: 3
     }
   }
  });

  var productsCarousel = new Swiper('.products-carousel', {
    loop: true,
    slidesPerView: 4,
    pagination: '.swiper-pagination',
    paginationClickable: true,
    spaceBetween: 30,
    breakpoints: {
      990:{
        slidesPerView: 3
      },
      720:{
        slidesPerView: 2
      },
      460:{
        slidesPerView: 1
      }
    }
  });

  $('.product-gallery-thumbs-item').on('click', function () {
    changeGalleryTitle($(this));
  });

  $('.next-btn-secondary').on('click', function (e) {
      e.stopPropagation();
      galleryThumbs.update();
      galleryThumbs.slideNext();
      changeGalleryTitle($('.swiper-slide-duplicate-active'));
  });

  $('.prev-btn-secondary').on('click', function (e) {
      e.stopPropagation();
      galleryThumbs.update();
      galleryThumbs.slidePrev();
      changeGalleryTitle($('.swiper-slide-duplicate-active'));
  });

  $('.product-gallery-title').on('click', function (e) {
    e.stopPropagation();

    $(this).toggleClass('zoom');
  });

  $('.product-gallery-title-image').on('click', function (e) {

    if($('.product-gallery-title').hasClass('zoom')){
      e.stopPropagation();

      galleryThumbs.slideNext();
      changeGalleryTitle($('.swiper-slide-duplicate-active'));
    }
  });

  $('.remove').on('click', function (e) {
    e.preventDefault();
    $('.product-count-input').val($('.product-count-input').val() - 1);
    if($('.product-count-input').val() <= 0){
      $('.product-count-input').val(0);
    }
  });

  $('.add').on('click', function (e) {
    e.preventDefault();
    $('.product-count-input').val(+($('.product-count-input').val()) + 1);
  });

  $('.more').on('click', function (e) {
    e.preventDefault();
    $('.more-content').slideToggle(500);
    $('.product-gallery').toggleClass('sticky');
  });
});
