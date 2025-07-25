// Import Swiper and modules
import Swiper from 'swiper/bundle';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css/bundle';



export const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 'auto',
    simulateTouch: true, 
    touchRatio: 1, 
    spaceBetween: 24,
    grabCursor: true,
  
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
      navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    disabledClass: 'swiper-button-disabled',
    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },

    modules: [Navigation, Pagination, Keyboard],
});




