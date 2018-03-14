$(document).ready(function () {
  $('.more').on('click', function (e) {
    e.preventDefault();
    $('.hidden').fadeIn(300);
  });
});
