document.addEventListener('DOMContentLoaded', function () {
    handleMenu();
    initSwiper();
    copyText();
    correspondHoverEffects();
    fadeInElements();
});


function handleMenu() {
    const body = document.querySelector('body');
    const mobileMenu = document.querySelector('.mobile-menu');

    function toggleBodyActive() {
        body.classList.toggle('active');
    }

    function closeMenu(event) {
        if (!mobileMenu.contains(event.target) && body.classList.contains('active')) {
            toggleBodyActive();
        }
    }

    document.querySelector('.nav-opener').addEventListener('click', function (event) {
        event.stopPropagation();
        toggleBodyActive();
    });

    document.querySelector('.close-btn').addEventListener('click', toggleBodyActive);

    document.addEventListener('click', closeMenu);
}

function initSwiper() {
    const swiperContainer = document.querySelector('.swiper');

    function scaleSlides(swiper) {
        const isMobileView = swiper.params.slidesPerView === 1;
        const scaleFactor = isMobileView ? 1 : 0.8;
        const opacityFactor = isMobileView ? 1 : 0.6;

        swiper.slides.forEach((slide) => {
            const scale = slide === swiper.slides[swiper.activeIndex] ? 1 : scaleFactor;
            const opacity = slide === swiper.slides[swiper.activeIndex] ? 1 : opacityFactor;
            slide.style.transform = `scale(${scale})`;
            slide.style.opacity = opacity;
        });
    }

    const mySwiper = new Swiper(swiperContainer, {
        slidesPerView: 1,
        centeredSlides: true,
        loop: true,
        loopedSlides: 3,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            740: {
                slidesPerView: 3,
                centeredSlides: true,
                loop: true,
                loopedSlides: 3
            }
        },
        on: {
            init: scaleSlides,
            slideChange: scaleSlides,
            resize: scaleSlides
        }
    });
}

function copyText() {
    const copyTextLinks = document.querySelectorAll('.copy-text');
    const copyModal = document.querySelector('.copy-modal');

    copyTextLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const linkRect = link.getBoundingClientRect();
            const linkCenterX = linkRect.left + (linkRect.width / 2);
            const linkCenterY = linkRect.top + (linkRect.height / 2);

            copyModal.style.left = window.scrollX + linkCenterX - (copyModal.offsetWidth / 2) + 'px';
            copyModal.style.top = window.scrollY + linkRect.top - (copyModal.offsetHeight / 2) + 'px';

            copyModal.style.transition = '0.2s';
            copyModal.style.visibility = 'visible';
            copyModal.style.opacity = '1';
            copyModal.style.zIndex = '1';

            navigator.clipboard.writeText(link.textContent).then(function () {
                setTimeout(function () {
                    copyModal.style.transition = '2s';
                    copyModal.style.opacity = '0';
                    copyModal.style.visibility = 'hidden';
                }, 2000);
            }).catch(function (error) {
                console.error('Error copying text: ', error);
                copyModal.style.opacity = '0';
                copyModal.style.visibility = 'hidden';
            });

            link.classList.add('temp-hover');

            setTimeout(() => {
                link.classList.remove('temp-hover');
            }, 4000);
        });
    });
}

function correspondHoverEffects() {
    const titleHoverLinks = document.querySelectorAll('.title-hover a');
    const imageHolders = document.querySelectorAll('.image-hover');

    if (titleHoverLinks.length === imageHolders.length) {
        titleHoverLinks.forEach((titleLink, index) => {
            const correspondingImageHolder = imageHolders[index];

            const addHoverEffect = () => {
                titleLink.classList.add('hover-effect');
                correspondingImageHolder.classList.add('hover-effect');
            };

            const removeHoverEffect = () => {
                titleLink.classList.remove('hover-effect');
                correspondingImageHolder.classList.remove('hover-effect');
            };

            titleLink.addEventListener('mouseover', addHoverEffect);
            titleLink.addEventListener('mouseout', removeHoverEffect);

            correspondingImageHolder.addEventListener('mouseover', addHoverEffect);
            correspondingImageHolder.addEventListener('mouseout', removeHoverEffect);
        });
    }
}

function fadeInElements() {
    const showElements = document.querySelectorAll('.show');

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight &&
            rect.bottom >= 0 &&
            rect.left <= window.innerWidth &&
            rect.right >= 0
        );
    }

    showElements.forEach((element, index) => {
        if (isInViewport(element)) {
            element.style.transitionDelay = index * 0.3 + "s";
            element.style.opacity = '1';
        } else {
            window.addEventListener('scroll', () => {
                if (isInViewport(element)) {
                    element.style.transitionDelay =  0.1 + "s";
                    element.style.opacity = '1';
                    window.removeEventListener('scroll', () => {});
                }
            });
        }
    });
}