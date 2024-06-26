const inputs = document.querySelectorAll(".about-input");
inputs.forEach((ipt) => {
  ipt.addEventListener("focus", () => {
    ipt.parentNode.classList.add("focus");
    ipt.parentNode.classList.add("not-empty");
  });
  ipt.addEventListener("blur", () => {
    if (ipt.value == "") {
      ipt.parentNode.classList.remove("not-empty");
    }
    ipt.parentNode.classList.remove("focus");
  });
});

document.addEventListener('DOMContentLoaded', function () {
  function capitalize(input) {
    input.value = input.value.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }

  const fNameInput = document.getElementById('fName');
  const lNameInput = document.getElementById('lName');

  fNameInput.addEventListener('input', function () {
    capitalize(fNameInput);
  });

  lNameInput.addEventListener('input', function () {
    capitalize(lNameInput);
  });
});

document.addEventListener('DOMContentLoaded', (event) => {
  const emailInput = document.getElementById('email');
  const form = document.getElementById('subscribeForm');

  // Function to validate email with specific allowed domains
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      return false;
    }

    // Split the email into username and domain
    const [username, domain] = email.split('@');

    // List of allowed domains
    const allowedDomains = [
      'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', // Add more domains as needed
    ];

    // Check if the domain is in the list of allowed domains
    return allowedDomains.includes(domain);
  }

  // Function to update UI based on validation
  function updateUI(isValid) {
    const emailIcon = document.querySelector('#email').parentNode.querySelector('.about-icon');
    
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
});

document.addEventListener('DOMContentLoaded', function () {
  const textarea = document.getElementById('message');
  const inputWrap = textarea.closest('.input-wrap');

  function checkTextarea() {
    if (textarea.value.trim() !== '') {
      inputWrap.classList.add('not-empty');
    } else {
      inputWrap.classList.remove('not-empty');
    }
  }

  textarea.addEventListener('input', checkTextarea);
  textarea.addEventListener('blur', checkTextarea);

  // Initial check in case the textarea is pre-filled
  checkTextarea();
});

$(document).ready(function () {
  $("#about-slider-cn").owlCarousel({
    items: 1,
    itemsDesktop: [1000, 1],
    itemsDesktopSmall: [979, 1],
    itemsTablet: [768, 1],
    margin: 10,
    pagination: true,
    navigation: false,
    autoPlay: true
  });
});

const sr = ScrollReveal({
  origin: 'top',
  distance: '70px',
  duration: 2500,
  delay: 400,
  reset: true,
});

sr.reveal('.about-info, .swiper-gl-container, .about-form', { origin: 'right' });
sr.reveal(
  '.about-profile, .about-heading, .about-head, .news-sub-heading, .news-sub-heading-end',
  { origin: 'left' },
);
sr.reveal('.art-sm-card, .art-ques-card, .news-img', {
  interval: 100,
});

var path = window.location.pathname;
  if (path === "/about") {
    document.getElementById("pageTitle").innerText = "Shin Arts - About";
  }