const inputs = document.querySelectorAll(".contact-input");
inputs.forEach((ipt) => {
  ipt.addEventListener("focus", () =>{
    ipt.parentNode.classList.add("focus");
    ipt.parentNode.classList.add("not-empty");
  });
  ipt.addEventListener("blur", () => {
    if(ipt.value==""){
      ipt.parentNode.classList.remove("not-empty");
    }
    ipt.parentNode.classList.remove("focus");
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const firstNameInput = document.getElementById('fName');
    const lastNameInput = document.getElementById('lName');

    firstNameInput.addEventListener('input', capitalizeAndTrim);
    firstNameInput.addEventListener('blur', capitalizeAndTrim);

    lastNameInput.addEventListener('input', capitalizeAndTrim);
    lastNameInput.addEventListener('blur', capitalizeAndTrim);

    function capitalizeAndTrim(event) {
        const input = event.target;
        let value = input.value;

        // Split the value into words, capitalize each word, and join them back together
        value = value.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');

        // Remove trailing spaces
        value = value.replace(/\s+$/, '');

        input.value = value;
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
  const emailInput = document.getElementById('email');
  const form = document.getElementById('contactForm');

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
    const emailIcon = document.querySelector('#email').parentNode.querySelector('.con-icon');
    
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

let swiper = new Swiper(".mySwiper", {
  autoplay: {
    delay: 7000,
    disableOnInteraction: false, 
  },
  spaceBetween: 50,
  cssMode: true,
  effect: 'slide',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const sr = ScrollReveal({
  origin: 'top',
  distance: '70px',
  duration: 2500,
  delay: 400,
  reset: true,
});

sr.reveal('.contact-hero-img, .contact-slide-content p', {
  origin: 'right',
});
sr.reveal('.form-wrapper, .contact-head, .contact-slide-content h1', {
  origin: 'left',
});
sr.reveal('.swipe-container, .contact-slide-list', {
  interval: 100,
});

var path = window.location.pathname;
  if (path === "/contact") {
    document.getElementById("pageTitle").innerText = "Shin Arts - Contact";
  }