/* ==========================================
   حالت روز و شب
   این فایل توی <head> هر صفحه لود می‌شه تا تم ذخیره‌شده
   قبل از نمایش صفحه اعمال بشه (بدون پرش رنگ)
   ========================================== */
(function () {
  const THEME_KEY = "norkade-theme";

  // خواندن و ذخیره‌ی انتخاب کاربر (اگه مرورگر اجازه نداد، مشکلی نیست)
  function getSavedTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }
  function saveTheme(theme) {
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* نادیده بگیر */ }
  }

  // تم رو روی کل صفحه اعمال می‌کنه و آیکون دکمه رو عوض می‌کنه
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const button = document.getElementById("themeToggle");
    if (button) {
      button.textContent = theme === "dark" ? "☀" : "☾";
      button.setAttribute(
        "aria-label",
        theme === "dark" ? "تغییر به حالت روشن" : "تغییر به حالت تیره"
      );
    }
  }

  // پیش‌فرض سایت تیره‌ست
  let currentTheme = getSavedTheme() === "light" ? "light" : "dark";
  applyTheme(currentTheme);

  // بعد از لود شدن صفحه، دکمه رو به کلیک وصل کن
  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(currentTheme);
    const button = document.getElementById("themeToggle");
    if (!button) return;

    button.addEventListener("click", () => {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(currentTheme);
      saveTheme(currentTheme);
    });
  });
})();
