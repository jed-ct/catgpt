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
const images = ["angry.jpg", "happy.jpg", "sad.jpeg", "serious.jpg", "oia-uia.gif", "dog.jpg", "ermactually.png", "eyebrow.png", "gigachad.jpeg", "jwu.png", "nooo.png", "sad2.jpg", "serious2.jpeg", "like.png", "milk.png", "shocked.png", "loadingscreen.gif"];

let currentTheme = "";

if (darkThemeMq.matches) {
    currentTheme = "dark";
    themeLogo.src = "./icons/dark.svg";
} else {
    currentTheme = "light";
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
    const question = "topic"
    catResponse.textContent = "";
    console.log(preloadedImages.length)
    catFace.src = preloadedImages[preloadedImages.length - 1].src;
    catResponseDiv.style.display = "flex";    

    if (catPrompt.value == question) {
        setTimeout(()=> {
            catResponse.textContent = "mga hayop sa larangan ng video games";;
            catFace.src = "./img/ermactually.png"
    }, 500)
    }
    else {
        setTimeout(()=> {
            catResponse.textContent = generateRandomMeows();
            generateRandomImage();
        }, 500)
    }
})


btnChangeTheme.addEventListener("click", ()=> {
    if (currentTheme == "light") {
        themeLogo.src = "./icons/dark.svg";
        currentTheme = "dark";
    }
    else {
        themeLogo.src = "./icons/light.svg";
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
    const randomIndex = Math.floor(Math.random() * (images.length - 1));
    const selectedImage = preloadedImages[randomIndex].src;
    catFace.src = selectedImage;
    console.log("reaction image: " + selectedImage);
}
