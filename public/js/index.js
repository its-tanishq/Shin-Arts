document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.swiper', {
      loop: true,
      speed: 1500,
      autoheight: true,
      autoplay: true,

      navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      },
      pagination:{
          el: '.swiper-pagination',
      }
  });
});

const sr = ScrollReveal({
  origin: 'top',
  distance: '70px',
  duration: 2500,
  delay: 400,
  reset: true,
});

sr.reveal('.hero-profile, .hero-heading-container, .testimonial-body', {
  origin: 'right',
});
sr.reveal('.hero-info, .testimonial-head', { origin: 'left' });
sr.reveal('.art-card', {
  interval: 100,
});


