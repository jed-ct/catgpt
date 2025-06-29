const btnSubmit = document.getElementById("submit-response");
const catResponse = document.getElementById("cat-response");
const catResponseDiv = document.getElementById("response");
const catPrompt = document.getElementById("cat-prompt")
const catFace = document.getElementById("cat-face");
const catLogo = document.getElementById("logo");
const btnChangeTheme = document.getElementById("change-theme");
const themeLogo = document.getElementById("change-theme-logo");
const root = document.documentElement;
const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
const images = ["angry.jpg", "happy.jpg", "sad.jpeg", "serious.jpg", "oia-uia.gif", "dog.jpg", "ermactually.png", "eyebrow.png", "gigachad.jpeg", "jwu.png", "nooo.png", "sad2.jpg", "serious2.jpeg"];

let currentTheme = "";

if (darkThemeMq.matches) {
    currentTheme = "dark";
    catLogo.src = "./icons/logo-dark.svg";
    themeLogo.src = "./icons/dark.svg";
} else {
    currentTheme = "light";
    catLogo.src = "./icons/logo.svg";
    themeLogo.src = "./icons/light.svg";
}
root.className = currentTheme;

const preloadedImages = [];

console.log("Preloading images...")
images.forEach((filename) => {
  const img = new Image();
  img.src = `./img/${filename}`;
  preloadedImages.push(img);
});
console.log("images preloaded!");





btnSubmit.addEventListener("click", ()=> {
    catResponse.textContent = generateRandomMeows();
    catPrompt.value = "";
    generateRandomImage();
    catResponseDiv.style.display = "flex";
})

btnChangeTheme.addEventListener("click", ()=> {
    if (currentTheme == "light") {
        themeLogo.src = "./icons/dark.svg";
        catLogo.src = "./icons/logo-dark.svg";
        currentTheme = "dark";
    }
    else {
        themeLogo.src = "./icons/light.svg";
        catLogo.src = "./icons/logo.svg";
        currentTheme = "light";        
    }
    root.className = currentTheme;

})

function generateRandomMeows() {
    let maxMeows = 10;
    let catResponse = "";
    let meowNumber = Math.floor(Math.random() * maxMeows + 1);
    for (let i = 0; i < meowNumber; i++) {
        catResponse = catResponse.concat(" ", "meow");
    }
    return catResponse;
}

function generateRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    const selectedImage = preloadedImages[randomIndex].src;

    catFace.src = selectedImage;
}