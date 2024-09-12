//hamburger menu opertaions
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const overlay = document.getElementById('overlay');
const closeMobileMenu = () => {
    mobileMenu.classList.add('translate-x-full');
    overlay.classList.add('hidden');
};
hamburger.addEventListener('click', () => {
    mobileMenu.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
});
closeMenu.addEventListener('click', closeMobileMenu);
overlay.addEventListener('click', closeMobileMenu);




const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6"><path d="M12 3v2m0 14v2m7.071-9.071l-1.414 1.414m-9.9 9.9l1.414-1.414M21 12h-2M5 12H3m14.071 9.071l-1.414-1.414m-9.9-9.9l1.414-1.414m1.414 9.9l-1.414-1.414M12 5.828a6.172 6.172 0 016.172 6.172A6.172 6.172 0 0112 18.172 6.172 6.172 0 015.828 12 6.172 6.172 0 0112 5.828z" /></svg>';
const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6"><path d="M21.72 15.61A9 9 0 018.39 2.28a7 7 0 100 14 7 7 0 0010.33 6.61A9 9 0 0021.72 15.61z"/></svg>';
const toggleTheme = () => {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    themeIcon.innerHTML = moonIcon;
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    themeIcon.innerHTML = sunIcon;
    localStorage.setItem('theme', 'dark');
  }
};
const setInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    themeIcon.innerHTML = sunIcon;
  } else {
    document.documentElement.classList.remove('dark');
    themeIcon.innerHTML = moonIcon;
  }
};
themeToggle.addEventListener('click', toggleTheme);
setInitialTheme();
