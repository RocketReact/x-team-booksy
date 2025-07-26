import Swiper from 'swiper/bundle';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css/bundle';
import '../css/feedbacks.css'
 const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        slidesPerView: 1,
        slidesPerGroup: 1,
        centeredSlides: false,

        simulateTouch: true,
        touchRatio: 1,
        spaceBetween: 0,
        grabCursor: true,
        pagination: {
            el: '.custom-swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        navigation: {
            nextEl: '.custom-swiper-button-next',
            prevEl: '.custom-swiper-button-prev',
            disabledClass: 'custom-swiper-button-disabled',
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        modules: [Navigation, Pagination, Keyboard],
    });


