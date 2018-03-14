$(document).ready(function () {
  $('.filter h4').on('click', function (e) {
    $(this).toggleClass('active').siblings('.filter-list').slideToggle(300);
  });

  $('.filter .link').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
  });

  $(window).on('scroll', function (e) {
    if($(this).scrollTop() >= $('.items').offset().top){
      $('.filter').addClass('sticky');
    } else {
      $('.filter').removeClass('sticky');
    }
  });

});
