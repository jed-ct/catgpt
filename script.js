const btnSubmit = document.getElementById("submit-response");
const catResponse = document.getElementById("cat-response");
const catResponseDiv = document.getElementById("response");
const catPrompt = document.getElementById("cat-prompt")
const catFace = document.getElementById("cat-face");
btnSubmit.addEventListener("click", ()=> {
    catResponse.textContent = generateRandomMeows();
    catPrompt.value = "";
    generateRandomImage();
    catResponseDiv.style.display = "flex";
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
    let images = ["angry.jpg", "happy.jpg", "sad.jpeg", "serious.jpg", "oia-uia.gif", "dog.jpg", "ermactually.png", "eyebrow.png", "gigachad.jpeg", "jwu.png", "nooo.png", "sad2.jpg", "serious2.jpeg"];
    catFace.src = `./img/${images[Math.floor(Math.random() * images.length)]}`;
}
