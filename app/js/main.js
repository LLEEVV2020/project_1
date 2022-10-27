$(document).ready(function () {
  $('.showcase__video-play').click(function () {
    $(this).fadeOut(300)
    $(this).prev().trigger('play')
    $(this).prev().attr('controls', '')
  })

  $('.trend__like').click(function () {
    $(this).toggleClass('active')
  })

  $('.showcase__end-header').click(function () {
    $('.showcase__end-header').removeClass('active')
    $('.showcase__end-body').slideUp(300)
    $(this).toggleClass('active')
    if ($('.showcase__end-header').hasClass('active')) {
      $(this).next().slideToggle(300)
    }
  })


  // questions
  $('.questions-item__header').click(function () {
    $('.questions-item__header').removeClass('active')
    $('.questions-item__body').slideUp(300)
    $(this).toggleClass('active')
    if ($('.questions-item__header').hasClass('active')) {
      $(this).next().slideToggle(300)
    }
  })

  //

  $('.header__burger').click(function () {
    $(this).children().toggleClass('active')
    $('.header__item').toggleClass('active')
    return false
  })

  $('[data-tabs-type]').on('click', function () {
    if (!$(this).hasClass('active')) {
      var index2 = $(this).index()
      $(this).addClass('active').siblings().removeClass('active')
      $('[data-tabs-typecontent]').hide().eq(index2).fadeIn()
    }
    return false
  })

  $('.reviews__items').slick({
    infinite: false,
    loop: false,
  })

  $('.trend__color').click(function(){
    let srcimg = $(this).attr('data-img')
    $(this).parent().parent().parent().prev().find('img').attr('src', srcimg)
  })

  $('a[href^="#"]').click(function(){ 
    let anchor = $(this).attr('href');  
    $('html, body').animate({           
    scrollTop:  $(anchor).offset().top  
    }, 600);                            
  });


  



  // Маска ввода номера телефона (плагин maskedinput)
  $(function($){
    $('[name="phone"]').mask("+7(999) 999-9999");
  });


})
