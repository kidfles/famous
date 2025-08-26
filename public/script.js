document.addEventListener('DOMContentLoaded', () => {
    const yr = document.getElementById('year');
    if (yr) yr.textContent = new Date().getFullYear();
  
    const toast = document.getElementById('toast');
  
    function showToast(message) {
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(window.__toastTimer);
      window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
    }
  
    document.querySelectorAll('.buy').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const card = e.currentTarget.closest('.card');
        const name = card?.getAttribute('data-name') || 'Artikel';
        const price = card?.getAttribute('data-price') || '';
        showToast(`${name} toegevoegd ${price ? `(€${price})` : ''}`);
      });
    });
  
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    // Contact helpers
    const copyBtn = document.getElementById('copyEmail');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const email = copyBtn.getAttribute('data-email') || 'hello@example.com';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(() => {
            showToast(`E-mail gekopieerd: ${email}`);
          });
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = email;
          document.body.appendChild(textarea);
          textarea.select();
          try { document.execCommand('copy'); showToast(`E-mail gekopieerd: ${email}`); } finally { document.body.removeChild(textarea); }
        }
      });
    }

    const mailtoForm = document.querySelector('#contact form');
    if (mailtoForm) {
      mailtoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name')?.value || '';
        const date = document.getElementById('date')?.value || '';
        const venue = document.getElementById('venue')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const letters = document.getElementById('letters')?.value || '';
        const message = document.getElementById('message')?.value || '';
        const subject = encodeURIComponent('Famous Offerte');
        const lines = [
          'Hallo Famous,',
          '',
          'Graag ontvang ik een offerte voor verlichte letters.',
          '',
          `Naam: ${name}`,
          `Datum: ${date}`,
          `Locatie: ${venue}`,
          `Telefoon: ${phone}`,
          `Gewenste letters/set: ${letters}`,
          '',
          message ? `Aanvullende info / wensen:\n${message}` : 'Aanvullende info / wensen:',
          '',
          'Alvast bedankt!',
          '',
          'Groet,',
          name
        ];
        const body = encodeURIComponent(lines.join('\n'));
        window.location.href = `mailto:info@famouseventsupport.nl?subject=${subject}&body=${body}`;
      });
    }

    // FAQ single-open behavior
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((it) => {
      it.addEventListener('toggle', () => {
        if (it.open) {
          faqItems.forEach((other) => { if (other !== it) other.open = false; });
        }
      });
    });
  });
  
  // Global order function for gallery items
  function orderItem(name, price) {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = `${name} bestelling ontvangen (€${price})`;
      toast.classList.add('show');
      clearTimeout(window.__toastTimer);
      window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
    }
    // Here you can add future functionality like redirecting to contact form
    // or opening a modal for order details
  }
  

