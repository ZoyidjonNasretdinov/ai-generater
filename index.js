const themeToggle = document.querySelector('.theme-toggle');
const promptBtn = document.querySelector('.prompt-btn');
const promptInput = document.querySelector('.prompt-input');
const promptForm = document.querySelector('.prompt-form');
const modelSelect = document.querySelector('#model-select');
const countSelect = document.querySelector('#count-select');
const ratioSelect = document.querySelector('#ratio-select');
const gridGallery = document.querySelector('.gallery-grid');

const API_KEY = ""; // ← Optional, bo‘sh bo‘lsa ham dummy ishlaydi

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
  const isDarkTheme = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
  document.body.classList.toggle('dark-theme', isDarkTheme);
  themeToggle.querySelector("i").classList = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
})();

// Theme toggle
themeToggle.addEventListener('click', () => {
  const isDarkTheme = document.body.classList.toggle('dark-theme');
  localStorage.setItem('dark-theme', isDarkTheme ? 'dark' : 'light');
  themeToggle.querySelector("i").classList = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
});

// Aspect ratio calculation
const getImageDimensions = (aspectRatio, baseSize = 512) => {
  const [w, h] = aspectRatio.split('/').map(Number);
  const scale = baseSize / Math.sqrt(w * h);
  let width = Math.floor((w * scale) / 16) * 16;
  let height = Math.floor((h * scale) / 16) * 16;
  return { width, height };
};

// Create image card with loading state
const createImageCards = (count, aspectRatio) => {
  gridGallery.innerHTML = "";
  for (let i = 0; i < count; i++) {
    gridGallery.innerHTML += `
      <div class="img-card loading" id="img-card-${i}" style="--aspect-ratio: ${aspectRatio}">
        <div class="status-container">
          <div class="spinner"></div>
          <i class="fa-solid fa-triangle-exclamation" style="display:none;"></i>
          <p class="status-text">Generating...</p>
        </div>
        <img src="./images/image.png" alt="Generated Image" class="result-img">
        <div class="img-overflow">
          <button class="download-btn">
            <i class="fa-solid fa-download"></i>
          </button>
        </div>
      </div>
    `;
  }
};

// Generate images (real or dummy)
const generateImages = async (model, count, aspectRatio, prompt) => {
  const MODEL_URL = `https://api-inference.huggingface.co/models/${model}`;
  const { width, height } = getImageDimensions(aspectRatio);

  const tasks = Array.from({ length: count }, async (_, i) => {
    const card = document.getElementById(`img-card-${i}`);
    const img = card.querySelector("img");
    const status = card.querySelector(".status-text");
    const spinner = card.querySelector(".spinner");
    const errorIcon = card.querySelector(".fa-triangle-exclamation");

    try {
      if (!API_KEY) {
        // Dummy fallback
        await new Promise(res => setTimeout(res, 1500));
        status.textContent = "Dummy image loaded";
        card.classList.remove("loading");
        return;
      }

      const res = await fetch(MODEL_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { width, height },
          options: { wait_for_model: true }
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      img.src = URL.createObjectURL(blob);
      card.classList.remove("loading");
    } catch (err) {
      console.error("Error:", err);
      spinner.style.display = "none";
      errorIcon.style.display = "block";
      status.textContent = "Error generating image";
    }
  });

  await Promise.all(tasks);
};

// Handle form submit
const handleFormSubmit = async (e) => {
  e.preventDefault();
  const model = modelSelect.value;
  const count = parseInt(countSelect.value) || 1;
  const ratio = ratioSelect.value || "1/1";
  const prompt = promptInput.value.trim();

  if (!model || !prompt || !ratio) return;

  createImageCards(count, ratio);
  await generateImages(model, count, ratio, prompt);
};

// Random prompt generator
promptBtn.addEventListener('click', () => {
  const example = examplePrompt[Math.floor(Math.random() * examplePrompt.length)];
  promptInput.value = example;
  promptInput.focus();
});

// Event listener
promptForm.addEventListener('submit', handleFormSubmit);
