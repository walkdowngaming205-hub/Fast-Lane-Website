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
if (contactForm) contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const service = String(data.get('service') || '').trim();
  const details = String(data.get('details') || '').trim();
  const subject = encodeURIComponent('Fast Lane Project Inquiry — ' + service);
  const body = encodeURIComponent('Hi Fast Lane Tech Service,\n\nI would like to discuss a project.\n\nName: ' + name + '\nEmail: ' + email + '\nService: ' + service + '\n\nProject details:\n' + details + '\n\nThank you,\n' + name);
  if (formStatus) formStatus.textContent = 'Opening your email app. Review the message and press Send to contact Fast Lane.';
  window.location.href = 'mailto:domoniqueward.dev@gmail.com?subject=' + subject + '&body=' + body;
});
