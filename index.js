const themeToggle = document.querySelector('.theme-toggle');
const promptBtn = document.querySelector('.prompt-btn');

// Set theme on page load
(() => {  
  const savedTheme = localStorage.getItem('dark-theme');
  const systemPrefersDark = savedTheme === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDarkTheme = savedTheme === 'dark' ||  (!savedTheme && systemPrefersDark);
  document.body.classList.toggle('dark-theme', isDarkTheme);
  themeToggle.querySelector("i").classList = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon"; 
})();

// Switch theme

themeToggle.addEventListener('click', () => {
  const isDarkTheme = document.body.classList.toggle('dark-theme');
  localStorage.setItem('dark-theme', isDarkTheme ? 'dark' : 'light');
  themeToggle.querySelector("i").classList = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
});


