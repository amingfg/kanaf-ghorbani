/* ==========================================
   صفحه‌ی جزئیات محصول
   آدرس صفحه مثل product.html?id=2 هست و عدد id مشخص می‌کنه
   کدوم محصول نشون داده بشه.
   ========================================== */

// شماره‌ی واتساپ و تماس (بدون صفر اول، با کد کشور). اینجا عوضش کن
const WHATSAPP = "989120000000";

// اطلاعات محصولات. اینها نمونه‌ان؛ قیمت و مشخصات واقعی رو جایگزین کن.
// برای اضافه کردن محصول جدید، یک آبجکت جدید با id بعدی اضافه کن
// و توی index.html هم یک کارت با لینک product.html?id=... بذار.
const PRODUCTS = [
  {
    id: 1, img: 1, category: "هالوژن و spot",
    name: "چراغ سقفی توکار", price: "از ۱۸۰,۰۰۰ تومان",
    desc: "چراغ توکار مناسب سقف کناف، با نور یکنواخت و مصرف پایین. برای پذیرایی، راهرو و اتاق خواب مناسبه.",
    specs: [["توان", "۹ وات"], ["دمای رنگ", "آفتابی و مهتابی"], ["نوع نصب", "توکار (سقف کناف)"], ["ولتاژ", "۲۲۰ ولت"], ["گارانتی", "۱۲ ماه"]],
  },
  {
    id: 2, img: 2, category: "لوستر",
    name: "لوستر مدرن مدل آوین", price: "از ۴,۸۰۰,۰۰۰ تومان",
    desc: "لوستر مدرن شش‌شاخه با امکان تنظیم شدت نور. طراحی ساده و شیک برای فضاهای امروزی.",
    specs: [["تعداد شاخه", "۶"], ["قابلیت", "تنظیم شدت نور"], ["جنس بدنه", "فلز با پوشش مات"], ["پایه لامپ", "E14"], ["گارانتی", "۶ ماه"]],
  },
  {
    id: 3, img: 3, category: "ریسه و LED",
    name: "ریسه LED رول ۵ متری", price: "از ۳۵۰,۰۰۰ تومان",
    desc: "ریسه‌ی انعطاف‌پذیر برای نورمخفی، پشت تلویزیون و دکوراسیون. در مدل تک‌رنگ و رنگی موجوده.",
    specs: [["طول", "۵ متر"], ["رنگ‌ها", "تک‌رنگ و RGB"], ["مقاومت در برابر آب", "دارد"], ["نصب", "چسب پشت‌دار"], ["گارانتی", "۶ ماه"]],
  },
  {
    id: 4, img: 4, category: "هالوژن و spot",
    name: "چراغ ریلی", price: "از ۶۵۰,۰۰۰ تومان",
    desc: "چراغ ریلی با سر قابل چرخش برای نورپردازی تمرکزی. مناسب مغازه، گالری و دفتر کار.",
    specs: [["نوع", "ریلی (Track)"], ["زاویه نور", "قابل تنظیم"], ["توان", "۲۰ وات"], ["دمای رنگ", "آفتابی و مهتابی"], ["گارانتی", "۱۲ ماه"]],
  },
  {
    id: 5, img: 5, category: "لوستر",
    name: "لوستر کریستالی", price: "از ۱۲,۰۰۰,۰۰۰ تومان",
    desc: "لوستر کلاسیک با کریستال‌های براق، مناسب سالن پذیرایی و فضاهای بزرگ.",
    specs: [["جنس", "کریستال و فلز"], ["تعداد شاخه", "۱۲"], ["پایه لامپ", "E14"], ["مناسب برای", "سقف بلند"], ["گارانتی", "۶ ماه"]],
  },
  {
    id: 6, img: 6, category: "ریسه و LED",
    name: "LED پنلی سقفی", price: "از ۹۵۰,۰۰۰ تومان",
    desc: "پنل LED با نور بدون سایه، مناسب دفتر کار، مغازه و آشپزخانه.",
    specs: [["توان", "۴۰ وات"], ["ابعاد", "۶۰×۶۰ سانتی‌متر"], ["دمای رنگ", "مهتابی"], ["نصب", "توکار و روکار"], ["گارانتی", "۱۲ ماه"]],
  },
];

// ---------- پیدا کردن محصول از روی آدرس ----------
const params = new URLSearchParams(window.location.search);
const product = PRODUCTS.find((p) => p.id === Number(params.get("id")));
const box = document.getElementById("productBox");

if (!product) {
  // اگه id اشتباه بود
  box.innerHTML = `
    <p class="pd__empty">
      این محصول پیدا نشد.
      <a href="index.html#products">بازگشت به محصولات</a>
    </p>`;
} else {
  document.title = `${product.name} | نورکده`;

  // پیام آماده برای واتساپ
  const message = encodeURIComponent(`سلام، درباره‌ی «${product.name}» سوال دارم.`);

  // ردیف‌های جدول مشخصات
  const specRows = product.specs
    .map(([label, value]) => `<tr><th>${label}</th><td>${value}</td></tr>`)
    .join("");

  box.innerHTML = `
    <nav class="crumbs">
      <a href="index.html">خانه</a> / <a href="index.html#products">محصولات</a> / ${product.name}
    </nav>

    <div class="pd__grid">
      <div class="pd__img product__img--${product.img}" role="img" aria-label="${product.name}"></div>

      <div class="pd__info">
        <span class="badge">${product.category}</span>
        <h1>${product.name}</h1>
        <div class="pd__price">${product.price}</div>
        <p class="pd__desc">${product.desc}</p>

        <table class="specs">${specRows}</table>

        <div class="pd__actions">
          <a class="btn" href="https://wa.me/${WHATSAPP}?text=${message}" target="_blank" rel="noopener">سفارش در واتساپ</a>
          <a class="btn btn--ghost" href="tel:+${WHATSAPP}">تماس تلفنی</a>
        </div>
      </div>
    </div>`;
}
