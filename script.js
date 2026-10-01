(() => {
  document.documentElement.classList.add('motion-ready');

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  document.querySelectorAll('[data-open]').forEach((button) => {
    button.addEventListener('click', () => {
      const dialog = document.getElementById(button.dataset.open);
      if (!dialog) return;
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    });
  });

  document.querySelectorAll('dialog .close, dialog .done').forEach((button) => {
    button.addEventListener('click', () => {
      const dialog = button.closest('dialog');
      if (!dialog) return;
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    });
  });

  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  const guestName = document.getElementById('guest-name');
  const whatsappLink = document.getElementById('whatsapp-link');
  const phone = '5581983650796';
  const baseMessage = 'Olá! Confirmo minha presença na pool party de 6 anos da Vitória, dia 18/10, às 10h, no CFL. 💖';
  const updateWhatsApp = () => {
    if (!whatsappLink) return;
    const name = guestName?.value.trim();
    const message = name ? `Olá! Eu sou ${name}. Confirmo minha presença na pool party de 6 anos da Vitória, dia 18/10, às 10h, no CFL. 💖` : baseMessage;
    whatsappLink.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };
  guestName?.addEventListener('input', updateWhatsApp);
  updateWhatsApp();

  const target = new Date('2026-10-18T10:00:00-03:00').getTime();
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const labelEl = document.getElementById('countdown-label');
  const valuesEl = document.getElementById('countdown-values');

  function updateCountdown() {
    if (!daysEl || !hoursEl || !minutesEl) return;
    const diff = target - Date.now();
    if (diff <= 0) {
      if (labelEl) labelEl.textContent = 'CHEGOU O DIA DA DIVERSÃO!';
      if (valuesEl) valuesEl.hidden = true;
      return;
    }
    const totalMinutes = Math.floor(diff / 60000);
    daysEl.textContent = Math.floor(totalMinutes / 1440);
    hoursEl.textContent = String(Math.floor((totalMinutes % 1440) / 60)).padStart(2, '0');
    minutesEl.textContent = String(totalMinutes % 60).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 30000);
})();
