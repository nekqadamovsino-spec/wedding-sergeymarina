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

const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('show'); });
},{threshold:.18});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const form = document.getElementById('rsvpForm');
const statusEl = document.getElementById('status');
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwigodtwCDe0vZQQwbbR5fV6fv7aRmyUZgxYKXjd_nlqGIWS15KukIPRWz2OnSblpdPnw/exec";
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  if(!GOOGLE_SCRIPT_URL){
    statusEl.textContent = 'Ответ пока сохранён только на сайте. Для Google Sheets нужно вставить ссылку Apps Script.';
    console.log('RSVP:', data);
    form.reset();
    return;
  }
  try{
    await fetch(GOOGLE_SCRIPT_URL,{method:'POST',mode:'no-cors',body:JSON.stringify(data)});
    statusEl.textContent = 'Спасибо! Ваш ответ отправлен.';
    form.reset();
  }catch(err){
    statusEl.textContent = 'Ошибка отправки. Попробуйте позже.';
  }
});
