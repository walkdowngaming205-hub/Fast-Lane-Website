const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }));
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();


const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

// Submit the inquiry without opening the visitor's email app.
if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('[type="submit"]');
    const data = new FormData(contactForm);

    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const service = String(data.get('service') || '').trim();
    const details = String(data.get('details') || '').trim();

    if (formStatus) {
      formStatus.textContent = 'Sending your inquiry...';
    }

    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/domoniqueward.dev@gmail.com',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            service,
            details,
            _subject: `Fast Lane Project Inquiry — ${service}`,
            _template: 'table'
          })
        }
      );

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error('The form service could not accept the inquiry.');
      }

      if (formStatus) {
        formStatus.textContent =
          'Thank you! Your inquiry was submitted. We will follow up by email.';
      }

      contactForm.reset();
    } catch (error) {
      console.error('Contact form submission failed:', error);

      if (formStatus) {
        formStatus.textContent =
          'Sorry, your inquiry could not be sent. Please try again or email domoniqueward.dev@gmail.com directly.';
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}
