// $(function() {
//     // current list in menu
//    var _url = { path : location.pathname.split('/').pop() || '/' }

//    $('.header__nav').find('a').each(function(i) {
//    //       // linkHref = !i ?
//    //          // '/' :
//    //          // link.text().toLowerCase() + '.html';
//    //    // link.attr('href', linkHref);
//       linkHref = !i ? '/' : $(this).attr('href');

//       linkHref !== _url.path ?
//          $(this).removeClass('nav__link_current') :
//          $(this).addClass('nav__link_current').removeAttr('href');
//    });
// })

$(function() {
   "use strict";

   var
   active = '_active',
   boxNone = 'box-none';


   //Footer bottom
   $(window).on("resize load", adaptFooter);
	function adaptFooter() {
		var heightwd = $(window).height();
		var heightFootter = $('.footer').outerHeight();
      $('.footer').css('margin-top','-'+heightFootter+'px');
      $('.main').css('margin-bottom',heightFootter +'px');
	}

   //Phone mask
   $(".input__tel").mask("+7 (999) 999-99-99");








   // Close popups
   $('.form__cross').click(function(e) {
      $('.popup').removeClass('visible');
      setTimeout(function() {
         $('.header').css('z-index','100');
      }, 200);
   })

   $(document).click(function(e) {
      if ($(e.target).closest('.form, .seminar_one__button').length == 0) {
        $('.popup').removeClass('visible');
        setTimeout(function() {
           $('.header').css('z-index','100');
        }, 200);
      }
   })






   // Open popup
   $('.js-seminars-form').click(function(e) {
      $('.popup--callback').addClass('visible');
      $('.header').css('z-index','0');
      return false;
   })

    $('.special__link').click(function(e) {
      var id = $(this).data('id');
      $('.popup--callback').find('input[name=promotions_id]').val(id);
      $('.popup--callback').addClass('visible');
      $('.header').css('z-index','0');
      return false;
   })






   var blind = sessionStorage.getItem('blind');
    if (blind === "false") {
      $('.js-blind-text').text('Обычная версия');
      sessionStorage.setItem('blind', false);
      $('html').addClass('filtered');
    } else {
      $('.js-blind-text').text('Версия для слабовидящих');
      sessionStorage.setItem('blind', true);
      $('html').removeClass('filtered');
    }

   // Make version for blind
   $('.nav__link_blind').click(function(e) {
      e.preventDefault();
      blind = sessionStorage.getItem('blind');
      if (blind !== "true") {
        $('.js-blind-text').text('Версия для слабовидящих');
        sessionStorage.setItem('blind', true);
      } else {
        $('.js-blind-text').text('Обычная версия');
        sessionStorage.setItem('blind', false);
      }
      $('html').toggleClass('filtered');
   })









   // Open sub-menu
   openSubMenu(1);
   openSubMenu(2);
   openMobileSubMenu(3);
   openMobileSubMenu(4);

   function openSubMenu(navItem) {
     $('.nav__link_' + navItem +', .header__nav_sub-' + navItem).mouseover(function(e) {
        $('.header__bottom_' + navItem).css({'height':'46px', 'border-color':'#e4e4e4', 'opacity':'1'});
     }).mouseout(function(e) {
        $('.header__bottom_' + navItem).css({'height':'1px', 'border-color':'transparent', 'opacity':'0'});
     })
   }
   function openMobileSubMenu(mobileNavItem) {
     $('.nav__link_' + mobileNavItem + ', .header__nav_sub-' + mobileNavItem).on('click', function() {
        var $this = $(this);
        $this.toggleClass('hide');
        $this.next().stop().slideToggle('500');
     });
   }



   // active sub-menu
   if ($('.nav__link_1.nav__link_current').length) {
      activeMenuState(1, 2);
   }
   if ($('.nav__link_2.nav__link_current').length) {
      activeMenuState(2, 1);
   }

   function activeMenuState(menuItemOpened, menuItemToOpen) {
      $('.header__bottom_' + menuItemOpened).css({'height':'46px', 'border-color':'#e4e4e4', 'opacity':'1'});
      $('.header__bottom_' + menuItemToOpen).css({'height':'1px', 'border-color':'transparent', 'opacity':'0'});
      $('.nav__link_' + menuItemOpened + ', .header__nav_sub-' + menuItemOpened).mouseout(function(e) {
         $('.header__bottom_' + menuItemOpened).css({'height':'46px', 'border-color':'#e4e4e4', 'opacity':'1'});
      });
      $('.nav__link_' + menuItemToOpen + ', .header__nav_sub-' + menuItemToOpen).mouseover(function(e) {
         $('.header__bottom_' + menuItemToOpen).css({'height':'46px', 'border-color':'#e4e4e4', 'opacity':'1'});
         $('.header__bottom_' + menuItemOpened).css({'height':'1px', 'border-color':'transparent', 'opacity':'0'});
      }).mouseout(function(e) {
         $('.header__bottom_' + menuItemToOpen).css({'height':'1px', 'border-color':'transparent', 'opacity':'0'});
         $('.header__bottom_' + menuItemOpened).css({'height':'46px', 'border-color':'#e4e4e4', 'opacity':'1'});
      });
   }



   // Open sidebar
   $('.nav-button--open').click(function(e) {
      $('.sidebar').css('transform','translateX(0)');
      $('body').addClass('no-scroll');
   })

  // Close sidebar
   $('.nav-button__close').click(function(e) {
      $('.sidebar').css('transform','translateX(110%)');
      $('body').removeClass('no-scroll');
   })


// programms all
   $('.programms__more').click(function(e) {
      e.preventDefault();
      $('.programms__item_hidden-1240').removeClass('programms__item_hidden-1240');
      $('.programms__more').addClass('hidden');
      $('.programms').css('margin-bottom','50px');
   })






// Valid form
   var
   form = 'form';
   $('[required]').bind("change keyup input", function () {
      if ($(this).val() != 0) {
         $(this).removeClass('input--invalid');
      } else {
         $(this).addClass('input--invalid');
      }
   });
    $(document).on("submit", '.' + form, function (e) {
        e.preventDefault();
        var valid = true;
        var $targetForm = $(this);
        $targetForm.find('[required]').map(function () {
            if ($(this).val() == '') {
                $(this).addClass('input--invalid');
                valid = false;
            } else {
                $(this).removeClass('input--invalid');
            }

            if ($(this).attr('type') == 'email') {
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9])+$/;
                var $email = $targetForm.find('[type="email"]');

                if (!filter.test($email.val())) {
                    $email.addClass('input--invalid');
                    valid = false;
                } else {
                    $email.removeClass('input--invalid');
                }
            }
        });

        if (valid) {
            if ($targetForm.hasClass('js-ajax_form')) {
              console.log('js-ajax_form', true)
                var dataForm = $targetForm.serialize(),
                        callback = $targetForm.data('back'),
                        actionURL = $targetForm.attr('action');
                // убрать фейк дата
                  // var data = {
                  //   msg : 'trololo',
                  //   code : 1
                  // }
                  // window[callback](data);
                // вернуть запрос
                $.post(actionURL, dataForm, function (data) {
                  // нужны свойства принимаем data.msg и data.rez (для проверки err or ok)
                  window[callback](data);
                }, 'json');
            } else {
                this.submit();
            }
        }

    });



// datepicker
    $('.datepicker-here').datepicker({
        autoClose: true,
        onSelect: function(formattedDate, date){
          var $formDate = $('.form__date');
          $formDate.find('input[name=date]').val(date.getFullYear()+'-'+(date.getMonth()+1));
            $formDate.submit();
        }
    })




   /**
     * Ограничивает на ввод только чисел.
     @param  {HTMLElement} element
     */
   function onlyNumbers(element) {
      element.bind("change keyup input", function () {
         if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
         }
      });
   }

   /**
     * Определяет, видим ли элемент.
     * @param {HTMLElement} element
     * return {boolean}
     */
   function isElementVisible(element) {
     var elementPosition = element.getBoundingClientRect();
     return elementPosition.top - $(window).height() <= 0;
   }

   /**
     * Throttle оптимизация
     * @param  {function} callback
     * @param  {number} timeDelay
     * @return {function}
     */
   function throttle(callback, timeDelay) {
     var lastCall = 0;
     return function() {
       if (Date.now() - lastCall >= timeDelay) {
         callback();
         lastCall = Date.now();
       }
     };
   }
});



// var popupSuccess = '<div class="success-wrap">\
//      <svg id="SvgjsSvg1021" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="148.00000999999997" height="161.99999855907492" viewBox="0 0 148.00000999999997 161.99999855907492"><title>Combined Shape</title><desc>Created with Avocode.</desc><defs id="SvgjsDefs1022"></defs><path id="SvgjsPath1023" d="M663 363C663 354.71573 669.71573 348 678 348H792C800.28427 348 807 354.71573 807 363V477C807 485.28427 800.28427 492 792 492H698.65146C698.10958 494.8568 696.73307 497.58652 694.52192 499.79766L691.16391 503.15567C686.94583 507.37375 683.52483 505.95736999999997 683.52287 499.99210999999997C683.5221300000001 497.72715 683.52167 494.92785 683.52149 491.99998999999997H677.99999C669.71572 491.99998999999997 662.99999 485.28425999999996 662.99999 476.99998999999997Z " fill-opacity="0" fill="#ffffff" stroke-dasharray="0" stroke-linejoin="miter" stroke-linecap="butt" stroke-opacity="1" stroke="#ffffff" stroke-miterlimit="50" stroke-width="4" transform="matrix(1,0,0,1,-660.999995,-346.00000072046254)"></path><path id="SvgjsPath1024" d="M774.21 427.32C774.21 424.71 773.24 422.25 771.61 420.36C771.75 419.67 771.8100000000001 419.15000000000003 771.8100000000001 418.43C771.8100000000001 412.6 767.1300000000001 408.05 761.3800000000001 408.05C757.2000000000002 408.05 746.9500000000002 408.05 746.9500000000002 408.05C747.9800000000001 403.44 748.9400000000002 399.62 748.9400000000002 396.74V398.34000000000003C748.9400000000002 394.41 749.4800000000001 386.23 745.5400000000002 382.26000000000005C744.0700000000002 380.78000000000003 742.6100000000002 380.00000000000006 740.4700000000001 380.00000000000006C736.5100000000001 380.00000000000006 733.2600000000001 383.0400000000001 732.9200000000002 386.9200000000001L732.8900000000002 395.0200000000001L723.3700000000002 412.4200000000001C721.8700000000002 412.70000000000005 720.2800000000002 413.8500000000001 719.1700000000002 414.9000000000001C717.8000000000002 413.4000000000001 715.8900000000002 412.6600000000001 713.7900000000002 412.6600000000001H703.6500000000002C699.4600000000002 412.6600000000001 696.0000000000002 415.9500000000001 696.0000000000002 420.4800000000001V447.86000000000007C696.0000000000002 452.39000000000004 699.4600000000003 456.45000000000005 703.6500000000002 456.45000000000005H713.7900000000002C715.8700000000002 456.45000000000005 717.7600000000002 455.54 719.1300000000002 454.07000000000005C720.3400000000003 455.20000000000005 722.2000000000003 456.45000000000005 724.2200000000003 456.45000000000005C725.8000000000003 456.45000000000005 756.9200000000003 456.45000000000005 756.9200000000003 456.45000000000005C762.6600000000003 456.45000000000005 767.3600000000004 451.32000000000005 767.3600000000004 445.49000000000007C767.3600000000004 445.4100000000001 767.3600000000004 445.3400000000001 767.3600000000004 445.26000000000005C769.6600000000003 443.38000000000005 771.9400000000004 440.12000000000006 771.9400000000004 436.40000000000003C771.9400000000004 435.69000000000005 771.8000000000004 434.98 771.6600000000004 434.29C773.2900000000004 432.40000000000003 774.2100000000004 429.94 774.2100000000004 427.32ZM716.72 448.24C716.72 450.23 715.38 451.84000000000003 713.73 451.84000000000003H703.59C701.94 451.84000000000003 700.6 450.23 700.6 448.24V420.87C700.6 418.88 701.94 417.27 703.59 417.27H713.73C715.38 417.27 716.72 418.88 716.72 420.87ZM766 432.82C766.74 433.82 767.2 435.06 767.2 436.40999999999997C767.2 439.63 764.71 442.22999999999996 761.59 442.34999999999997C762.15 443.27 762.48 444.53 762.48 445.67999999999995C762.48 448.97999999999996 759.88 451.84 756.66 451.84C756.62 451.84 726.73 451.84 726.73 451.84C721.6700000000001 451.84 721.32 448.75 721.32 447.85999999999996V420.47999999999996C721.32 419.49999999999994 721.6500000000001 416.87999999999994 725.9200000000001 416.87999999999994L737.4300000000001 396.0999999999999V387.5999999999999C737.4300000000001 385.94999999999993 738.59 384.6099999999999 740.24 384.6099999999999C741.17 384.6099999999999 741.65 384.8999999999999 742.26 385.5099999999999C744.85 388.1199999999999 744.34 395.2599999999999 744.34 398.3099999999999V396.7399999999999C744.34 400.1699999999999 742.07 408.0499999999999 740.69 412.6599999999999C740.69 412.6599999999999 761.33 412.6599999999999 761.3800000000001 412.6599999999999C764.5900000000001 412.6599999999999 767.2000000000002 415.13999999999993 767.2000000000002 418.4299999999999C767.2000000000002 419.7799999999999 766.7400000000001 420.9199999999999 766.0000000000001 421.9199999999999C768.0900000000001 422.8299999999999 769.5500000000001 424.8999999999999 769.5500000000001 427.3699999999999C769.5500000000001 429.8399999999999 768.1 431.9199999999999 766.0000000000001 432.8199999999999Z " fill="#ffffff" fill-opacity="1" transform="matrix(1,0,0,1,-660.999995,-346.00000072046254)"></path></svg>\
//      <h5 class="form__text  form__text--big">' + data.msg + '</h5>\
//   </div>';

// var popupCollapse = '<div class="success-wrap">\
//      <svg id="SvgjsSvg1021" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="148.00000999999997" height="161.99999855907492" viewBox="0 0 148.00000999999997 161.99999855907492"><title>Combined Shape</title><desc>Created with Avocode.</desc><defs id="SvgjsDefs1022"></defs><path id="SvgjsPath1023" d="M663 363C663 354.71573 669.71573 348 678 348H792C800.28427 348 807 354.71573 807 363V477C807 485.28427 800.28427 492 792 492H698.65146C698.10958 494.8568 696.73307 497.58652 694.52192 499.79766L691.16391 503.15567C686.94583 507.37375 683.52483 505.95736999999997 683.52287 499.99210999999997C683.5221300000001 497.72715 683.52167 494.92785 683.52149 491.99998999999997H677.99999C669.71572 491.99998999999997 662.99999 485.28425999999996 662.99999 476.99998999999997Z " fill-opacity="0" fill="#ffffff" stroke-dasharray="0" stroke-linejoin="miter" stroke-linecap="butt" stroke-opacity="1" stroke="#ffffff" stroke-miterlimit="50" stroke-width="4" transform="matrix(1,0,0,1,-660.999995,-346.00000072046254)"></path><path id="SvgjsPath1024" d="M774.21 427.32C774.21 424.71 773.24 422.25 771.61 420.36C771.75 419.67 771.8100000000001 419.15000000000003 771.8100000000001 418.43C771.8100000000001 412.6 767.1300000000001 408.05 761.3800000000001 408.05C757.2000000000002 408.05 746.9500000000002 408.05 746.9500000000002 408.05C747.9800000000001 403.44 748.9400000000002 399.62 748.9400000000002 396.74V398.34000000000003C748.9400000000002 394.41 749.4800000000001 386.23 745.5400000000002 382.26000000000005C744.0700000000002 380.78000000000003 742.6100000000002 380.00000000000006 740.4700000000001 380.00000000000006C736.5100000000001 380.00000000000006 733.2600000000001 383.0400000000001 732.9200000000002 386.9200000000001L732.8900000000002 395.0200000000001L723.3700000000002 412.4200000000001C721.8700000000002 412.70000000000005 720.2800000000002 413.8500000000001 719.1700000000002 414.9000000000001C717.8000000000002 413.4000000000001 715.8900000000002 412.6600000000001 713.7900000000002 412.6600000000001H703.6500000000002C699.4600000000002 412.6600000000001 696.0000000000002 415.9500000000001 696.0000000000002 420.4800000000001V447.86000000000007C696.0000000000002 452.39000000000004 699.4600000000003 456.45000000000005 703.6500000000002 456.45000000000005H713.7900000000002C715.8700000000002 456.45000000000005 717.7600000000002 455.54 719.1300000000002 454.07000000000005C720.3400000000003 455.20000000000005 722.2000000000003 456.45000000000005 724.2200000000003 456.45000000000005C725.8000000000003 456.45000000000005 756.9200000000003 456.45000000000005 756.9200000000003 456.45000000000005C762.6600000000003 456.45000000000005 767.3600000000004 451.32000000000005 767.3600000000004 445.49000000000007C767.3600000000004 445.4100000000001 767.3600000000004 445.3400000000001 767.3600000000004 445.26000000000005C769.6600000000003 443.38000000000005 771.9400000000004 440.12000000000006 771.9400000000004 436.40000000000003C771.9400000000004 435.69000000000005 771.8000000000004 434.98 771.6600000000004 434.29C773.2900000000004 432.40000000000003 774.2100000000004 429.94 774.2100000000004 427.32ZM716.72 448.24C716.72 450.23 715.38 451.84000000000003 713.73 451.84000000000003H703.59C701.94 451.84000000000003 700.6 450.23 700.6 448.24V420.87C700.6 418.88 701.94 417.27 703.59 417.27H713.73C715.38 417.27 716.72 418.88 716.72 420.87ZM766 432.82C766.74 433.82 767.2 435.06 767.2 436.40999999999997C767.2 439.63 764.71 442.22999999999996 761.59 442.34999999999997C762.15 443.27 762.48 444.53 762.48 445.67999999999995C762.48 448.97999999999996 759.88 451.84 756.66 451.84C756.62 451.84 726.73 451.84 726.73 451.84C721.6700000000001 451.84 721.32 448.75 721.32 447.85999999999996V420.47999999999996C721.32 419.49999999999994 721.6500000000001 416.87999999999994 725.9200000000001 416.87999999999994L737.4300000000001 396.0999999999999V387.5999999999999C737.4300000000001 385.94999999999993 738.59 384.6099999999999 740.24 384.6099999999999C741.17 384.6099999999999 741.65 384.8999999999999 742.26 385.5099999999999C744.85 388.1199999999999 744.34 395.2599999999999 744.34 398.3099999999999V396.7399999999999C744.34 400.1699999999999 742.07 408.0499999999999 740.69 412.6599999999999C740.69 412.6599999999999 761.33 412.6599999999999 761.3800000000001 412.6599999999999C764.5900000000001 412.6599999999999 767.2000000000002 415.13999999999993 767.2000000000002 418.4299999999999C767.2000000000002 419.7799999999999 766.7400000000001 420.9199999999999 766.0000000000001 421.9199999999999C768.0900000000001 422.8299999999999 769.5500000000001 424.8999999999999 769.5500000000001 427.3699999999999C769.5500000000001 429.8399999999999 768.1 431.9199999999999 766.0000000000001 432.8199999999999Z " fill="#ffffff" fill-opacity="1" transform="matrix(1,0,0,1,-660.999995,-346.00000072046254)"></path></svg>\
//      <h5 class="form__text  form__text--big">' + data.msg + '</h5>\
//   </div>';

// Contact form success
// var ctimer;
function ContactFormSuccess(data) {
  console.log('ContactFormSuccess start')
  // clearTimeout(ctimer)
   // if(data.rez == true){
   //    showRezPopups(popupSuccess);
   // }else{
   //    showRezPopups(popupCollapse);
   // }

   // тест проверка
   // data.rez = true;

   // function showRezPopup(rez) {
    // + img ok-png.png and err-png.png
    // дописать нужные классы для сообщений
    var contactMsg = '<section class="popup  popup--rez ">\
    <div class="popup__' + (data.rez ? 'success' : 'error') + '">\
       <svg id="SvgjsSvg1021" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="148.00000999999997" height="161.99999855907492" viewBox="0 0 148.00000999999997 161.99999855907492"><title>Combined Shape</title><desc>Created with Avocode.</desc><defs id="SvgjsDefs1022"></defs><path id="SvgjsPath1023" d="M663 363C663 354.71573 669.71573 348 678 348H792C800.28427 348 807 354.71573 807 363V477C807 485.28427 800.28427 492 792 492H698.65146C698.10958 494.8568 696.73307 497.58652 694.52192 499.79766L691.16391 503.15567C686.94583 507.37375 683.52483 505.95736999999997 683.52287 499.99210999999997C683.5221300000001 497.72715 683.52167 494.92785 683.52149 491.99998999999997H677.99999C669.71572 491.99998999999997 662.99999 485.28425999999996 662.99999 476.99998999999997Z " fill-opacity="0" stroke-dasharray="0" stroke-linejoin="miter" stroke-linecap="butt" stroke-opacity="1" stroke-miterlimit="50" stroke-width="4" transform="matrix(1,0,0,1,-660.999995,-346.00000072046254)"></path><path id="SvgjsPath1024" d="M774.21 427.32C774.21 424.71 773.24 422.25 771.61 420.36C771.75 419.67 771.8100000000001 419.15000000000003 771.8100000000001 418.43C771.8100000000001 412.6 767.1300000000001 408.05 761.3800000000001 408.05C757.2000000000002 408.05 746.9500000000002 408.05 746.9500000000002 408.05C747.9800000000001 403.44 748.9400000000002 399.62 748.9400000000002 396.74V398.34000000000003C748.9400000000002 394.41 749.4800000000001 386.23 745.5400000000002 382.26000000000005C744.0700000000002 380.78000000000003 742.6100000000002 380.00000000000006 740.4700000000001 380.00000000000006C736.5100000000001 380.00000000000006 733.2600000000001 383.0400000000001 732.9200000000002 386.9200000000001L732.8900000000002 395.0200000000001L723.3700000000002 412.4200000000001C721.8700000000002 412.70000000000005 720.2800000000002 413.8500000000001 719.1700000000002 414.9000000000001C717.8000000000002 413.4000000000001 715.8900000000002 412.6600000000001 713.7900000000002 412.6600000000001H703.6500000000002C699.4600000000002 412.6600000000001 696.0000000000002 415.9500000000001 696.0000000000002 420.4800000000001V447.86000000000007C696.0000000000002 452.39000000000004 699.4600000000003 456.45000000000005 703.6500000000002 456.45000000000005H713.7900000000002C715.8700000000002 456.45000000000005 717.7600000000002 455.54 719.1300000000002 454.07000000000005C720.3400000000003 455.20000000000005 722.2000000000003 456.45000000000005 724.2200000000003 456.45000000000005C725.8000000000003 456.45000000000005 756.9200000000003 456.45000000000005 756.9200000000003 456.45000000000005C762.6600000000003 456.45000000000005 767.3600000000004 451.32000000000005 767.3600000000004 445.49000000000007C767.3600000000004 445.4100000000001 767.3600000000004 445.3400000000001 767.3600000000004 445.26000000000005C769.6600000000003 443.38000000000005 771.9400000000004 440.12000000000006 771.9400000000004 436.40000000000003C771.9400000000004 435.69000000000005 771.8000000000004 434.98 771.6600000000004 434.29C773.2900000000004 432.40000000000003 774.2100000000004 429.94 774.2100000000004 427.32ZM716.72 448.24C716.72 450.23 715.38 451.84000000000003 713.73 451.84000000000003H703.59C701.94 451.84000000000003 700.6 450.23 700.6 448.24V420.87C700.6 418.88 701.94 417.27 703.59 417.27H713.73C715.38 417.27 716.72 418.88 716.72 420.87ZM766 432.82C766.74 433.82 767.2 435.06 767.2 436.40999999999997C767.2 439.63 764.71 442.22999999999996 761.59 442.34999999999997C762.15 443.27 762.48 444.53 762.48 445.67999999999995C762.48 448.97999999999996 759.88 451.84 756.66 451.84C756.62 451.84 726.73 451.84 726.73 451.84C721.6700000000001 451.84 721.32 448.75 721.32 447.85999999999996V420.47999999999996C721.32 419.49999999999994 721.6500000000001 416.87999999999994 725.9200000000001 416.87999999999994L737.4300000000001 396.0999999999999V387.5999999999999C737.4300000000001 385.94999999999993 738.59 384.6099999999999 740.24 384.6099999999999C741.17 384.6099999999999 741.65 384.8999999999999 742.26 385.5099999999999C744.85 388.1199999999999 744.34 395.2599999999999 744.34 398.3099999999999V396.7399999999999C744.34 400.1699999999999 742.07 408.0499999999999 740.69 412.6599999999999C740.69 412.6599999999999 761.33 412.6599999999999 761.3800000000001 412.6599999999999C764.5900000000001 412.6599999999999 767.2000000000002 415.13999999999993 767.2000000000002 418.4299999999999C767.2000000000002 419.7799999999999 766.7400000000001 420.9199999999999 766.0000000000001 421.9199999999999C768.0900000000001 422.8299999999999 769.5500000000001 424.8999999999999 769.5500000000001 427.3699999999999C769.5500000000001 429.8399999999999 768.1 431.9199999999999 766.0000000000001 432.8199999999999Z " fill-opacity="1" transform="matrix(1,0,0,1,-660.999995,-346.00000072046254)"></path></svg>\
       <h5 class="form__text  form__text--big">' + data.msg + '</h5>\
    </div>\
  </section>';

      $('.popup--callback').removeClass('visible');
      $('.header').css('z-index','0');
      $('main').append(contactMsg);
      setTimeout(function() {
        $('.popup--rez').addClass('visible');
      }, 10);
      ctimer = setTimeout(function() {
         $('.popup--rez').removeClass('visible');
         $('.header').css('z-index','100');
         setTimeout(function() {
            $('.popup--rez').remove();
          }, 1000);
      }, 3000);
   // }
}



