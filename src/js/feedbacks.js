import Swiper from 'swiper/bundle';
import { Navigation, Pagination, Keyboard} from 'swiper/modules';
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
        watchOverflow: true,
        speed: 250,
        breakpoints: {
         768: {
             slidesPerView: 2,   
             spaceBetween: 24,
             slidesPerGroup: 1,
         },
         1200: {
             slidesPerView: 3,
             spaceBetween: 24,
             slidesPerGroup: 1,
         },
        },
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

// swiper.on('slideChange', () => {
//   console.log('Current active slide index:', swiper.activeIndex);
// });

// swiper.on('slideNextTransitionStart', () => console.log('slideNext triggered'));
// swiper.on('slidePrevTransitionStart', () => console.log('slidePrev triggered'));

// document.querySelector('.custom-swiper-button-next').addEventListener('click', e => {
//   console.log('click NEXT button');
// });

// document.querySelector('.custom-swiper-button-prev').addEventListener('click', e => {
//   console.log('click PREV button');
// });
