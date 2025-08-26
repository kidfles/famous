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
  });
  

