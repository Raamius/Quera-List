// greetings
const greetingElement = document.getElementById('usernameMobile');

async function updateGreeting() {
  try {
    const response = await fetch('userData.json');
    const data = await response.json();
    const userName = data.person1.name;
    greetingElement.innerHTML += `سلام ${userName}`;
  } catch (error) {
    console.error('Error fetching JSON data:', error);
  }
}
updateGreeting();

//calendar requirements
const date = new Date();
const todaysDateMobile = document.getElementById('todaysDateMobile');
todaysDateMobile.innerHTML += new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium' }).format(date);
// const todaysDateDesktop = document.getElementById('todaysDateDesktop');
// todaysDateDesktop.innerHTML += new Intl.DateTimeFormat('fa-IR', {dateStyle: 'medium'}).format(date);

//hamburger menu operations
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


//toggle dark or light mode ------------------------------
// const toggle = document.getElementById('darkModeToggle');
// if (localStorage.getItem('theme') === 'dark') {
//   document.documentElement.classList.add('dark');
//   toggle.checked = true;
// }
// toggle.addEventListener('change', function () {
//   if (toggle.checked) {
//     document.documentElement.classList.add('dark');
//     localStorage.setItem('theme', 'dark');
//   } else {
//     document.documentElement.classList.remove('dark');
//     localStorage.setItem('theme', 'light');
//   }
// });
// ---------------------------------------------------------

//creating a new task
const creatingNewTodo = document.getElementById('newtodo');
creatingNewTodo.addEventListener('click', () => {

});