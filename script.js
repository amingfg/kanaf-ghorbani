/* ==========================================
   جاوااسکریپت سایت نورکده
   هر بخش یک کار ساده انجام می‌ده و کامنت داره
   ========================================== */

// ---------- ۱) منوی موبایل ----------
// وقتی روی دکمه همبرگری کلیک بشه، کلاس is-open اضافه/حذف می‌شه
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("is-open");
  menuToggle.classList.toggle("is-open");
});

// با کلیک روی هر لینک، منو بسته بشه
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
  });
});


// ---------- ۲) خط زیر هدر هنگام اسکرول ----------
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  // اگه بیشتر از ۱۰ پیکسل اسکرول شده بود، کلاس رو اضافه کن
  header.classList.toggle("is-scrolled", window.scrollY > 10);
});


// ---------- ۳) فیلتر محصولات ----------
const filterButtons = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // دکمه فعال رو عوض کن
    filterButtons.forEach((b) => b.classList.remove("is-active"));
    button.classList.add("is-active");

    const selected = button.dataset.filter; // مثلاً "spot" یا "all"

    products.forEach((product) => {
      // اگه "همه" انتخاب شده یا دسته محصول با فیلتر یکی بود، نشونش بده
      const show = selected === "all" || product.dataset.category === selected;
      product.classList.toggle("is-hidden", !show);
    });
  });
});


// ---------- ۴) شمارنده اعداد در بخش آمار ----------
const counters = document.querySelectorAll("[data-count]");

function animateCounter(el) {
  const target = Number(el.dataset.count);
  const duration = 1500; // مدت انیمیشن (میلی‌ثانیه)
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    // اعداد رو فارسی نشون بده
    el.textContent = value.toLocaleString("fa-IR") + (progress === 1 ? "+" : "");
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}


// ---------- ۵) ظاهر شدن بخش‌ها هنگام اسکرول ----------
// IntersectionObserver می‌فهمه یه المنت وارد صفحه شده یا نه
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");

      // اگه شمارنده بود، بشمار
      if (entry.target.hasAttribute("data-count")) animateCounter(entry.target);

      observer.unobserve(entry.target); // فقط یک بار اجرا بشه
    });
  },
  { threshold: 0.2 }
);

// کارت‌ها، محصولات و آیتم‌های گالری انیمیشن بگیرن
document.querySelectorAll(".card, .product, .gallery__item, .review").forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});
counters.forEach((el) => observer.observe(el));


// ---------- ۶) فرم تماس ----------
// فعلاً فقط پیام تشکر نشون می‌ده. برای ارسال واقعی باید به یک سرویس
// (مثل Formspree) یا بک‌اند وصلش کنی.
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // جلوگیری از رفرش صفحه
  const name = form.elements["name"].value;
  formMsg.textContent = `ممنون ${name}، درخواستت ثبت شد و به‌زودی تماس می‌گیریم.`;
  form.reset();
});


// ---------- ۷) نور دنبال‌کننده‌ی ماوس در هیرو ----------
// فقط وقتی دستگاه ماوس داره (نه موبایل) فعال می‌شه
const hero = document.querySelector(".hero");
const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (hasMouse) {
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    // مکان ماوس رو به CSS می‌دیم (متغیرهای --mx و --my)
    hero.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    hero.style.setProperty("--my", `${e.clientY - rect.top}px`);
    hero.classList.add("is-lit");
  });
  hero.addEventListener("mouseleave", () => hero.classList.remove("is-lit"));
}


// ---------- ۸) اسلایدر قبل و بعد ----------
// مقدار اسلایدر (۰ تا ۱۰۰) رو به متغیر --pos توی CSS می‌دیم
const ba = document.getElementById("ba");
const baRange = document.getElementById("baRange");

baRange.addEventListener("input", () => {
  ba.style.setProperty("--pos", `${baRange.value}%`);
});


// ---------- ۹) ماشین‌حساب قیمت ----------
// قیمت‌ها نمونه‌ان. اینجا با قیمت‌های واقعی مغازه جایگزین کن (به تومان)
const CALC = {
  pricePerM2: {
    flat: 650000,    // سقف کاذب تخت، هر متر مربع
    design: 950000,  // سقف طرح‌دار، هر متر مربع
    wall: 700000,    // دیوار و پارتیشن، هر متر مربع
  },
  hiddenLightPerM2: 120000, // هزینه‌ی اضافه‌ی نورمخفی، هر متر مربع
  spotEach: 90000,          // هزینه‌ی هر چراغ توکار (با نصب)
  margin: 0.1,              // بازه‌ی قیمت: ۱۰٪ کمتر تا ۱۰٪ بیشتر
};

const calcForm = document.getElementById("calcForm");
const calcResult = document.getElementById("calcResult");

// عدد رو فارسی و با جداکننده‌ی هزارگان نشون می‌ده
function formatToman(n) {
  return n.toLocaleString("fa-IR");
}
// عدد رو به نزدیک‌ترین مضرب step گرد می‌کنه (تا قیمت‌ها مرتب باشن)
function roundTo(n, step) {
  return Math.round(n / step) * step;
}

function updateCalc() {
  const type = document.getElementById("calcType").value;
  const area = Number(document.getElementById("calcArea").value);
  const spots = Number(document.getElementById("calcSpots").value);
  const hidden = document.getElementById("calcHidden").checked;

  // اگه متراژ معتبر نبود، قیمت نشون نده
  if (!(area > 0)) {
    calcResult.textContent = "متراژ را وارد کنید";
    return;
  }

  let total = CALC.pricePerM2[type] * area;
  if (hidden) total += CALC.hiddenLightPerM2 * area;
  total += Math.max(spots, 0) * CALC.spotEach;

  const low = roundTo(total * (1 - CALC.margin), 10000);
  const high = roundTo(total * (1 + CALC.margin), 10000);
  calcResult.textContent = `${formatToman(low)} تا ${formatToman(high)} تومان`;
}

// با هر تغییر توی فرم، قیمت دوباره حساب می‌شه
calcForm.addEventListener("input", updateCalc);
calcForm.addEventListener("submit", (e) => e.preventDefault());
updateCalc(); // یک بار هم موقع لود صفحه


// ---------- ۱۰) شبیه‌ساز دمای رنگ نور ----------
// تبدیل دمای رنگ (کلوین) به رنگ RGB (فرمول تقریبی معروف)
function kelvinToRgb(kelvin) {
  const t = kelvin / 100;
  let r, g, b;

  if (t <= 66) {
    r = 255;
    g = 99.4708025861 * Math.log(t) - 161.1195681661;
  } else {
    r = 329.698727446 * Math.pow(t - 60, -0.1332047592);
    g = 288.1221695283 * Math.pow(t - 60, -0.0755148492);
  }

  if (t >= 66) b = 255;
  else if (t <= 19) b = 0;
  else b = 138.5177312231 * Math.log(t - 10) - 305.0447927307;

  // مطمئن می‌شیم هر عدد بین ۰ تا ۲۵۵ باشه
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
  return [clamp(r), clamp(g), clamp(b)];
}

const simRange = document.getElementById("simRange");
const simRoom = document.getElementById("simRoom");
const simKelvin = document.getElementById("simKelvin");
const simName = document.getElementById("simName");
const simHint = document.getElementById("simHint");

function updateSim() {
  const kelvin = Number(simRange.value);
  const [r, g, b] = kelvinToRgb(kelvin);

  // رنگ نور، رنگ لامپ و کمی رنگ‌گرفتن دیوار از نور
  simRoom.style.setProperty("--glow", `rgba(${r}, ${g}, ${b}, .7)`);
  simRoom.style.setProperty("--lamp", `rgb(${r}, ${g}, ${b})`);
  simRoom.style.setProperty(
    "--wall",
    `rgb(${30 + Math.round(r * 0.18)}, ${30 + Math.round(g * 0.18)}, ${34 + Math.round(b * 0.18)})`
  );

  simKelvin.textContent = `${kelvin.toLocaleString("fa-IR")} کلوین`;

  if (kelvin <= 3200) {
    simName.textContent = "آفتابی (گرم)";
    simHint.textContent = "حس دنج و آرام می‌دهد. مناسب اتاق خواب، پذیرایی و نورمخفی.";
  } else if (kelvin <= 4500) {
    simName.textContent = "نیمه‌آفتابی (خنثی)";
    simHint.textContent = "نوری متعادل و طبیعی. مناسب آشپزخانه، راهرو و فضاهای چندمنظوره.";
  } else {
    simName.textContent = "مهتابی (سرد)";
    simHint.textContent = "روشن و تیز است و جزئیات را بهتر نشان می‌دهد. مناسب مغازه، دفتر کار و پارکینگ.";
  }
}

simRange.addEventListener("input", updateSim);
updateSim();
