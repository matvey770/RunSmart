// "use strict";       собственный вариант слайдера

// const leftButton = document.querySelector('.left'),
//       rightButton = document.querySelector('.right'),
//       slider = document.querySelector('.slider_images'),
//       slides = document.querySelectorAll('.slider_image');

// let slideIndex = 0;
// let slideLength = slides.length -1;

// leftButton.addEventListener('click', () => {
//     hideSlide();
//     slideIndex--;
//     if (slideIndex < 0) {
//         slideIndex = slideLength;
//     }
//     showSlide(slideIndex);
// });

// rightButton.addEventListener('click', () => {
//     hideSlide();
//     slideIndex++;
//     if (slideIndex > slideLength) {
//         slideIndex = 0;
//     }
//     showSlide(slideIndex);
// });

//     function hideSlide() {
//         slides.forEach(item => {
//             item.classList.add('slider_image_none');
//         });
//     }

//     function showSlide(i) {
//         slides[i].classList.remove('slider_image_none');
//     }

$(document).ready(function(){
    $('.slider__wrapper').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/chevron_left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/chevron_right.png"></button>',
        responsive: [ //адаптация под меньшие разрешения
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      function toggleSLide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
          });
      }

      toggleSLide('.catalog-item__link');
      toggleSLide('.catalog-item__back');

      //modal

      $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
      });
      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
      });

      $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
      });
      


      function validateForms(form) {
        $(form).validate({
          rules: {
            name: {
              required: true,
              minlength: 2
            },
            phone: "required",
            email: {
                required: true,
                email: true
              }
            },
            messages: {
              name: {
                required: "Пожалуйста, введите своё имя",
                minlength: jQuery.validator.format("Введите {0} символа")
              },
              phone: "Пожалуйста, введите свой номер телефона",
              email: {
                required: "Пожалуйста, введите свою почту",
                email: "Неправильно введен адрес почты"
              }
            }
        });
      }

      validateForms('#consultation-form');
      validateForms('#consultation form');
      validateForms('#order form');

      $('input[name=phone]').mask("+7 (999) 999-99-99");

      $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
          return;
        }

        $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
        }).done(function() {
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');

          $('form').trigger('reset');
        });
        return false;
      });
});

// const buttonMore = document.querySelectorAll('.selection__more'), своя попытка с табами
//       text = document.querySelectorAll('.selection__text'),
//       wrapper = document.querySelectorAll('.selection__wrapper');

// function toggleMore() {
//     text.forEach(item => {
//         item.classList.toggle('none');
//     });
//     wrapper.forEach(item => {
//         item.classList.toggle('none');
//     });
// }

// buttonMore.forEach(item => 
//     item.addEventListener('click', () => {
//         console.log(1);
//         toggleMore();
//     })
// );