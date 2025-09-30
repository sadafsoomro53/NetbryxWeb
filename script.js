// SHARED JAVASCRIPT - NetBryx Website

// Load navbar component from navbar.html file
function loadNavbar() {
  fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
    })
    .catch(error => {
      console.error('Error loading navbar:', error);
      // Fallback navbar if file not found
      const fallbackNavbar = `
        <nav id="navbar">
          <div class="logo">
            <img src="img/logo-color.png" alt="NetBryx Logo">
            <span>Your Ideas, Our Expertise</span>
          </div>
          <div class="menu-toggle" onclick="toggleMenu()">☰</div>
          <ul class="nav-links" id="navLinks">
            <li><a href="index.html">Home</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><a href="contact.html">Contact us</a></li>
            <li><a href="button.html" class="cta-button">Get Started</a></li>
          </ul>
        </nav>
      `;
      document.body.insertAdjacentHTML('afterbegin', fallbackNavbar);
    });
}

// Load footer component from footer.html file
function loadFooter() {
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('beforeend', data);
    })
    .catch(error => {
      console.error('Error loading footer:', error);
      // Fallback footer if file not found
      const fallbackFooter = `
        <footer style="background-color: #111; color: #fff; padding: 60px 40px; font-family: 'Segoe UI', sans-serif;">
          <div style="max-width: 1200px; margin: auto; text-align: center;">
            <h2 style="color: #e60000; font-size: 28px; margin-bottom: 10px;">Your Ideas, Our Expertise.</h2>
            <p style="color: #ccc; margin-bottom: 20px;">Empowering businesses with next-gen technology.</p>
            <div style="text-align: center; margin-top: 50px; color: #666;">
              &copy; 2025 NetBryx. All rights reserved.
            </div>
          </div>
        </footer>
      `;
      document.body.insertAdjacentHTML('beforeend', fallbackFooter);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  loadNavbar();
  loadFooter();

  // Attach event listener to contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', sendForm);
  }

  // Close mobile menu after clicking a link (better UX)
  setTimeout(() => {
    const navLinks = document.querySelectorAll('#navLinks a');
    navLinks.forEach(a => {
      a.addEventListener('click', () => {
        const navLinksElement = document.getElementById('navLinks');
        if (navLinksElement) {
          navLinksElement.classList.remove('active');
        }
      });
    });
  }, 1000); // Wait for navbar to load
});

// Toggle mobile menu
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  if (navLinks) {
    navLinks.classList.toggle("active");
  }
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (navbar && window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else if (navbar) {
    navbar.classList.remove("scrolled");
  }
});

// Scroll animations handler
function handleScrollAnimations(selector) {
  document.querySelectorAll(selector).forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}

// Run animations on load and scroll
window.addEventListener('load', () => {
  setTimeout(() => {
    handleScrollAnimations('.service-card');
    handleScrollAnimations('.project-card');
    handleScrollAnimations('.testimonial-card');
    handleScrollAnimations('.contact-form');

    const about = document.querySelector('.about-content');
    if (about && about.getBoundingClientRect().top < window.innerHeight - 100) {
      about.style.opacity = '1';
      about.style.transform = 'translateY(0)';
    }
  }, 500);
});

window.addEventListener('scroll', () => {
  handleScrollAnimations('.service-card');
  handleScrollAnimations('.project-card');
  handleScrollAnimations('.testimonial-card');
  handleScrollAnimations('.contact-form');

  const about = document.querySelector('.about-content');
  if (about && about.getBoundingClientRect().top < window.innerHeight - 100) {
    about.style.opacity = '1';
    about.style.transform = 'translateY(0)';
  }
});

// Newsletter subscription
function subscribe(event) {
  event.preventDefault();
  const msg = document.getElementById('subscribe-msg');
  if (msg) {
    msg.style.display = 'block';
    setTimeout(() => (msg.style.display = 'none'), 3000);
  }
}

// Contact form submission
function sendForm(event) {
  event.preventDefault();
  const formMsg = document.getElementById('formMsg');
  if (formMsg) {
    formMsg.style.display = 'block';
    document.querySelector('.contact-form').reset();
    setTimeout(() => {
      formMsg.style.display = 'none';
    }, 5000);
  }
  return false;
}

// Smooth scroll effect for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});
