document.querySelector('.nav-opener').addEventListener('click', function (event) {
    event.stopPropagation();
    document.querySelector('body').classList.add('active');
});

document.querySelector('.close-btn').addEventListener('click', function () {
    document.querySelector('body').classList.remove('active');
});

document.addEventListener('click', function (event) {
    var isClickInsideMenu = document.querySelector('.mobile-menu').contains(event.target);
    var isMenuActive = document.querySelector('body').classList.contains('active');

    if (!isClickInsideMenu && isMenuActive) {
        document.querySelector('body').classList.remove('active');
    }
});

function scaleSlides(swiper) {
    const isMobileView = swiper.params.slidesPerView === 1;

    swiper.slides.forEach((slide) => {
        var scale, opacity;
        if (slide === swiper.slides[swiper.activeIndex]) {
            scale = 1;
            opacity = 1;
        } else {
            scale = isMobileView ? 1 : 0.8;
            opacity = isMobileView ? 1 : 0.6;
        }
        slide.style.transform = `scale(${scale})`;
        slide.style.opacity = opacity;
    });
}

const mySwiper = new Swiper('.swiper', {
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
        init: function () {
            scaleSlides(this);
        },
        slideChange: function () {
            scaleSlides(this);
        },
        resize: function () {
            scaleSlides(this);
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.copy-text');
    const modal = document.querySelector('.copy-modal');
    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const linkRect = link.getBoundingClientRect();
            const linkCenterX = linkRect.left + (linkRect.width / 2);
            const linkCenterY = linkRect.top + (linkRect.height / 2);

            modal.style.left = window.scrollX + linkCenterX - (modal.offsetWidth / 2) + 'px';
            modal.style.top = window.scrollY + linkRect.top - (modal.offsetHeight / 2) + 'px';

            modal.style.transition = '0.2s';
            modal.style.visibility = 'visible';
            modal.style.opacity = '1';
            modal.style.zIndex = '1';

            navigator.clipboard.writeText(link.textContent).then(function () {
                setTimeout(function () {
                    modal.style.transition = '2s';
                    modal.style.opacity = '0';
                    modal.style.visibility = 'hidden';
                }, 2000);
            }).catch(function (error) {
                console.error('Error copying text: ', error);
                modal.style.opacity = '0';
                modal.style.visibility = 'hidden';
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const titleLinks = document.querySelectorAll('.title-hover a');
    const imageHolders = document.querySelectorAll('.image-hover');

    if (titleLinks.length === imageHolders.length) {
        titleLinks.forEach((titleLink, index) => {
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
});

