$(document).ready(function () {

  //ВНИМАНИЕ! Следющая переменная содержит БОЛЬШОЙ html кусок кода и служит
  //исключительно для визуального представления добавления продукта в корзину.
  //Смотри index.html 72 строка
  var itemCart = '<li class="cart-item"><img class="cart-item-title" src="img/second.png" alt="Second item"><div class="cart-item-description"><h4 class="cart-item-heading">Плетеное кресло</h4><div class="cart-item-info"><div class="cart-item-count">1</div><div class="cart-item-price">3999 <span class="ruble"></span></div></div></div><a class="fa fa-trash-o cart-item-del-btn" href="#"></a></li>';
  var itemBookmarks = '<li class="bookmarks-item"><img class="bookmarks-item-title" src="img/second.png" alt="Second item"><div class="bookmarks-item-description"><h4 class="bookmarks-item-heading">Плетеное кресло</h4><div class="bookmarks-item-info"><div class="bookmarks-item-count">1</div><div class="bookmarks-item-price">3999 <span class="ruble"></span></div></div></div><a class="fa fa-trash-o bookmarks-item-del-btn" href="#"></a></li>'

  $('.second.row').hide();

  //Functions

  function getTotalCartPrice(){
    var cartItem = $('.cart').find('.cart-item');
    var totalPrice = 0;

    cartItem.each(function () {
      totalPrice += parseInt($(this).find('.cart-item-price').html());
    });

    return totalPrice;
  }

  function checkCartCount() {
    var cartItem = $('.cart').find('.cart-item');
    return cartItem.length;
  }

  function checkBookmarksCount() {
    var bookmarksItem = $('.bookmarks').find('.bookmarks-item');
    return bookmarksItem.length;
  }

  function isActivePopup() {
    return $('.popup').hasClass('active');
  }

  function showPopup(destination){
    $('.popup').addClass('active');
    $('.popup-destination').html(destination || 'Товар добавлен');
    setTimeout(function () {
      $('.popup').removeClass('active');
    }, 2000);
  }

  //Handlers

  $(document).on('keyup',function(e){
    if(e.which == 27){
      $('.cart').fadeOut(300);
      $('.search').fadeOut(300);
      $('.bookmarks').fadeOut(300);
      $('.login').fadeOut(300);
    }
  });

  function setCloseHandler(selector, hasCloseMenu) {
    $(document).on('mousedown', function offHandler(e){
      if(!$(e.target).is(selector) && !$(e.target).parents(selector).length){
        $('.search').hide();
        $('.cart').hide();
        $('.login').hide();
        $('.bookmarks').hide();
        $('.main-nav').removeClass('active');
        $('.filter-wrapper').removeClass('active');
        $(document).off('mousedown', offHandler);
      }

      if(hasCloseMenu){
        $('.main-nav').removeClass('active');
        $(document).off('mousedown', offHandler);
      }
    });
  }

  $(window).on('scroll', function () {
    if($(this).scrollTop() > 0 && !($('.main-nav').hasClass('active'))){
      $('.header-top').addClass('scrolled');
      $('.header-top').removeClass('white');
    } else {
      $('.header-top').removeClass('scrolled');
    }
  });

  $('img').on('dragstart', function (e) {
    e.preventDefault();
  });

  $('.nav-btn').on('click', function (e) {
    e.preventDefault();
    $('.main-nav').addClass('active');
    $('.header-top').addClass('white');
    setCloseHandler('.main-nav', true);
  });

  $('.search-btn').on('click', function (e) {
    e.preventDefault();
    $('.search').fadeToggle(300);
    setCloseHandler('.search');
  });

  $('.bookmarks-btn').on('click', function (e) {
    e.preventDefault();
    $('.bookmarks').fadeToggle(300);
    setCloseHandler('.bookmarks');
  });

  $('.login-btn').on('click', function (e) {
    e.preventDefault();
    $('.login').fadeToggle(300);
    setCloseHandler('.login');
  });

  $('.cart-btn').on('click', function (e) {
    e.preventDefault();

    $('.cart').fadeToggle(300);
    $('.cart-total-price').html(getTotalCartPrice() + ' <span class="ruble"></span>');
    setCloseHandler('.cart');

  });

  $('.shadow').on('click', function () {
    $('.main-nav').removeClass('active');
  });

  $('.collections .item').on('click', function (e) {
    e.preventDefault();
  });

  $('.to-bookmarks').on('click', function (e) {
    e.preventDefault();

    showPopup('Товар в закладках');

    if(!(checkBookmarksCount())){
      $('.empty').hide();
      $('.bookmarks-bottom').fadeIn();
      $('.bookmarks-btn .count').fadeIn();
    }

    $('.bookmarks-list').append(itemBookmarks);
    $('.bookmarks-btn .count').html(checkBookmarksCount());

    $('.bookmarks-item-del-btn').on('click', function (e) {
      e.preventDefault();
      $(this).parent().remove();
      $('.bookmarks-btn .count').html(checkBookmarksCount());

      if(!(checkBookmarksCount())){
        $('.empty').fadeIn();
        $('.bookmarks-bottom').hide();
        $('.bookmarks-btn').find('.count').hide();
      }
    });
  });

  $('.to-cart').on('click', function (e) {
    e.preventDefault();

    showPopup('Товар в корзине');

    if(!(checkCartCount())){
      $('.empty').hide();
      $('.cart-bottom').fadeIn();
      $('.cart-btn .count').fadeIn();
    }

    $('.cart-list').append(itemCart);
    $('.cart-btn .count').html(checkCartCount());
    $('.cart-total-price').html(getTotalCartPrice() + ' <span class="ruble"></span>');

    $('.cart-item-del-btn').on('click', function (e) {
      e.preventDefault();
      $(this).parent().remove();
      $('.cart-btn .count').html(checkCartCount());
      $('.cart-total-price').html(getTotalCartPrice() + ' <span class="ruble"></span>');

      if(!(checkCartCount())){
        $('.empty').fadeIn();
        $('.cart-bottom').hide();
        $('.cart-btn').find('.count').hide();
      }
    });
  });

  $('.filter-button a').on('click', function (e) {
    e.preventDefault();

    $('.filter-wrapper').addClass('active');
    $('.header-top').addClass('white');
    setCloseHandler('.filter-wrapper');
  });

  $('.filter-wrapper').on('click', function (e) {

    if(e.target.className == 'filter-wrapper active'){
      $('.filter-wrapper').removeClass('active');
      $('.header-top').removeClass('white');
    }
  });
});
