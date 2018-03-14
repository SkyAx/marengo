//Header slider init
var mainSlider = new Swiper('.header-bottom', {
  loop: true,
  nextButton: '.next-btn',
  prevButton: '.prev-btn',
  speed: 600,
  onInit : function () {
    $('.content :first-child').delay(200).fadeIn(500);
    $('.content :last-child').delay(800).fadeIn(500);
  },
  onSlideChangeStart : function () {
    $('.content :first-child').hide();
    $('.content :last-child').hide();
  },
  onSlideChangeEnd: function () {
    $('.content :first-child').delay(200).fadeIn(500);
    $('.content :last-child').delay(800).fadeIn(500);
  }
});

$('.more').on('click', function (e) {
  e.preventDefault();

  $('.second.row').fadeIn(300);
});
