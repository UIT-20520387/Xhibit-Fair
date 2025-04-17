// --- Banner Slider ---
let currentSlide = 0;
const banners = document.querySelectorAll(".banner");
const dots = document.querySelectorAll(".dot");
let bannerInterval;

function showSlide(index) {
  banners.forEach((banner, i) => {
    banner.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
  currentSlide = index;
  resetBannerTimer(); // Reset timer when user clicks
}

function autoSlide() {
  currentSlide = (currentSlide + 1) % banners.length;
  showSlide(currentSlide);
}

function resetBannerTimer() {
  clearInterval(bannerInterval);
  bannerInterval = setInterval(autoSlide, 5000);
}

// --- Upcoming Events ---
const allEvents = [
  { date: "24.04.2025", time: "09:00 - 17:00", name: "Café Show 2025" },
  { date: "07.05.2025", time: "09:00 - 17:00", name: "Smart City Asia 2025" },
  { date: "07.05.2025", time: "09:00 - 17:00", name: "Ledtec Asia 2025" },
];

let eventIndex = 0;
function renderEvents() {
  const list = document.getElementById("eventList");
  list.innerHTML = "";
  for (let i = eventIndex; i < eventIndex + 2 && i < allEvents.length; i++) {
    const ev = allEvents[i];
    list.innerHTML += `
      <div class="event">
        <div><strong>${ev.name}</strong></div>
        <div>📅 ${ev.date}</div>
        <div>⏰ ${ev.time}</div>
      </div>`;
  }
}

function nextEvents() {
  if (eventIndex + 2 < allEvents.length) {
    eventIndex++;
    renderEvents();
  }
}

function prevEvents() {
  if (eventIndex > 0) {
    eventIndex--;
    renderEvents();
  }
}

window.onload = () => {
  showSlide(0);
  renderEvents();
  bannerInterval = setInterval(autoSlide, 5000);
};

window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 20) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});
