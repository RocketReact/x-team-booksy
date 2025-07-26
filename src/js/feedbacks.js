import Swiper from 'swiper/bundle';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css/bundle';
import '../css/feedbacks.css'

document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        loopedSlides: 2,
        slidesPerView: 1,
        slidesPerGroup: 1,
        simulateTouch: true,
        touchRatio: 1,
        spaceBetween: 24,
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
});

