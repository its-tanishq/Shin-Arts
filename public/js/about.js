document.addEventListener('DOMContentLoaded', function () {
  const elementsToAnimate = [
    { selector: '.about-heading', direction: 'left' },
    { selector: '.about-info', direction: 'left' },
    { selector: '.about-profile', direction: 'right' },
    { selector: '.main-head', direction: 'left' },
    { selector: '.about-head', direction: 'right' },
    { selector: '.art-sm-card', direction: 'bottom' },
    { selector: '.swiper-gl-container', direction: 'bottom' },
    { selector: '.newsletter-img-profile', direction: 'right' },
    { selector: '.newsletter-sub-heading', direction: 'left' },
    { selector: '.newsletter-form', direction: 'bottom' },
    { selector: '.art-ques-card', direction: 'top' },
  ];

  const generateConfig = (direction) => {
    let transform;
    switch (direction) {
      case 'left':
        transform = 'translateX(-100px)';
        break;
      case 'right':
        transform = 'translateX(100px)';
        break;
      case 'bottom':
        transform = 'translateY(100px)';
        break;
      case 'top':
        transform = 'translateY(-100px)';
        break;
    }
    return {
      initial: {
        transform,
        opacity: '0',
        transition:
          'transform 1.5s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 1.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
      },
      final: {
        transform: 'translateX(0)',
        opacity: '1',
      },
    };
  };

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: [0, 0.75],
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const element = entry.target;
      const config = JSON.parse(element.dataset.config);
      if (entry.isIntersecting) {
        element.style.transform = config.final.transform;
        element.style.opacity = config.final.opacity;
        element.style.transition = config.initial.transition;
      } else if (entry.intersectionRatio < 0.75) {
        element.style.transform = config.initial.transform;
        element.style.opacity = config.initial.opacity;
        element.style.transition = config.initial.transition;
      }
    });
  }, observerOptions);

  elementsToAnimate.forEach(({ selector, direction }) => {
    const config = generateConfig(direction);
    document.querySelectorAll(selector).forEach((element) => {
      element.style.transform = config.initial.transform;
      element.style.opacity = config.initial.opacity;
      element.style.transition = config.initial.transition;
      element.dataset.config = JSON.stringify(config);
      observer.observe(element);
    });
  });
});

document.addEventListener('DOMContentLoaded', (event) => {
  const inputs = document.querySelectorAll('.about-input');
  const form = document.getElementById('subscribeForm');
  const emailInput = document.getElementById('email');

  // Function to validate email with specific allowed domains
  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      return false;
    }

    // Split the email into username and domain
    const [username, domain] = email.split('@');

    // List of allowed domains
    const allowedDomains = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'icloud.com', // Add more domains as needed
    ];

    // Check if the domain is in the list of allowed domains
    return allowedDomains.includes(domain);
  }

  // Function to update UI based on validation
  function updateUI(isValid) {
    const emailIcon = emailInput.parentNode.querySelector('.about-icon');

    if (isValid) {
      emailInput.classList.remove('invalid');
      emailInput.style.borderColor = ''; // Reset to default
      emailInput.nextElementSibling.style.color = ''; // Reset label color
      emailIcon.style.color = ''; // Reset icon color
    } else {
      emailInput.classList.add('invalid');
      emailInput.style.borderColor = 'red';
      emailInput.nextElementSibling.style.color = 'red';
      emailIcon.style.color = 'red'; // Change icon color to red
    }
  }

  // Event listener for email input
  emailInput.addEventListener('input', () => {
    const isValid = validateEmail(emailInput.value);
    updateUI(isValid);
  });

  // Event listener for email input losing focus
  emailInput.addEventListener('blur', () => {
    if (emailInput.value === '') {
      updateUI(true); // Reset to default state if input is empty
    }
  });

  // Prevent form submission if email is invalid
  form.addEventListener('submit', (e) => {
    const isValid = validateEmail(emailInput.value);
    if (!isValid) {
      e.preventDefault(); // Stop form submission
      updateUI(false);
    }
  });

  // Add focus and blur event listeners to all inputs
  inputs.forEach((input) => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focus');
    });

    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focus');
      if (input.value) {
        input.parentElement.classList.add('not-empty');
      } else {
        input.parentElement.classList.remove('not-empty');
      }
    });

    // Initialize the not-empty class for inputs with pre-filled values
    if (input.value) {
      input.parentElement.classList.add('not-empty');
    }
  });
});

$(document).ready(function () {
  $('#about-slider-cn').owlCarousel({
    items: 1,
    itemsDesktop: [1000, 1],
    itemsDesktopSmall: [979, 1],
    itemsTablet: [768, 1],
    margin: 10,
    pagination: true,
    navigation: false,
    autoPlay: true,
  });
});

var path = window.location.pathname;
if (path === '/about') {
  document.getElementById('pageTitle').innerText = 'Shin Arts - About';
}
