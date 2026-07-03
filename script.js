const weddingDate = new Date('2026-07-29T12:00:00+03:00');

const days = document.getElementById('days');

if (days) {
  const els = {
    days,
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
  };

  function tick() {
    let diff = weddingDate - new Date();
    if (diff < 0) diff = 0;

    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000 % 24);
    const m = Math.floor(diff / 60000 % 60);
    const s = Math.floor(diff / 1000 % 60);

    els.days.textContent = d;
    els.hours.textContent = String(h).padStart(2, '0');
    els.minutes.textContent = String(m).padStart(2, '0');
    els.seconds.textContent = String(s).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
}
