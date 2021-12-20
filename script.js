// Navbar
let lastScrollTop = 0;
navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
    const scrollTop = window.pageTOffset || this.document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        navbar.style.top = "-85px";
    } else {
        navbar.style.top = "0";
    }
    lastScrollTop = scrollTop;
});

var swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
        delay: 4000
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    },
});

// AOS
AOS.init()