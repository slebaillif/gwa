(function () {
  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () { document.body.classList.remove('nav-open'); });
    });
  }

  // Missing images fall back to the brand gradient behind them
  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    img.addEventListener('error', function () { img.style.display = 'none'; });
    if (img.complete && img.naturalWidth === 0) img.style.display = 'none';
  });

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Enquiry form: opens the visitor's email client with the enquiry pre-filled.
  // Replace with a form backend (e.g. Formspree, Netlify Forms) when hosting.
  var form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form);
      var body = [
        'Name: ' + d.get('name'),
        'Role: ' + d.get('role'),
        'Organisation: ' + d.get('organisation'),
        'Email: ' + d.get('email'),
        'Interest: ' + d.get('interest'),
        '',
        d.get('message')
      ].join('\n');
      var to = form.getAttribute('data-to');
      window.location.href = 'mailto:' + to +
        '?subject=' + encodeURIComponent('Leadership pipeline enquiry: ' + d.get('organisation')) +
        '&body=' + encodeURIComponent(body);
      document.querySelector('.form-success').classList.add('show');
      form.style.display = 'none';
    });
  }
})();
