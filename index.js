const themeToggle = document.querySelector('.theme-toggle');
const promptBtn = document.querySelector('.prompt-btn');
const promptInput = document.querySelector('.prompt-input');


const examplePrompt = [
  "A futuristic city skyline at sunset, cyberpunk style",
  "A cute baby dragon sleeping on a pillow, digital painting",
  "A realistic portrait of an astronaut exploring Mars",
  "A beautiful waterfall surrounded by dense jungle, 4K wallpaper",
  "A majestic lion with a golden mane, photorealistic"
];


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


// Generate random prompt
promptBtn.addEventListener('click', () => {
  const prompt = examplePrompt[Math.floor(Math.random() * examplePrompt.length)];
  promptInput.value = prompt;
  promptInput.focus();
});
