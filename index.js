const themeToggle = document.querySelector('.theme-toggle');
const promptBtn = document.querySelector('.prompt-btn');
const promptInput = document.querySelector('.prompt-input');
const promptForm = document.querySelector('.prompt-form');
const modelSelect = document.querySelector('.model-select');
const countSelect = document.querySelector('.count-select');
const ratioSelect = document.querySelector('.ratio-select');
const gridGallery = document.querySelector('.grid-gallery');


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


// Create image cards
const createImageCards = async (selectedModel, imageCount, aspectRatio, promptText) => {
  gridGallery.innerHTML = "";
  for (let i = 0; i < imageCount; i++) {
    gridGallery.innerHTML += `
              <div class="img-card loading" id="img-card-${i}" style="--aspect-ratio: ${aspectRatio}">
                <div class="status-container">
                  <div class="spinner"></div>
                  <i class="fa-solid fa-triangle-exclamation"></i>
                  <p class="status-text">Generating...</p>
                </div>
                <img src="./images/image.png" alt="Generated Image" class="result-img">
             </div>
    
    `
  }
}

const handleFormSubmit = (e) => {
  e.preventDefault();
  const selectedModel = modelSelect.value;
  const imageCount = parseInt(countSelect.value) || 1;
  const aspectRadio = ratioSelect.value || "1/1";
  const promptText = promptInput.value.trim();

  createImageCards(selectedModel, imageCount, aspectRadio, promptText);
}


// Generate random prompt
promptBtn.addEventListener('click', () => {
  const prompt = examplePrompt[Math.floor(Math.random() * examplePrompt.length)];
  promptInput.value = prompt;
  promptInput.focus();
});

promptForm.addEventListener('submit', handleFormSubmit);

