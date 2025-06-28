const btnSubmit = document.getElementById("submit-response");
const catResponse = document.getElementById("cat-response");
const catFace = document.getElementById("cat-face");
btnSubmit.addEventListener("click", ()=> {
    catResponse.textContent = generateRandomMeows();
    generateRandomImage();
})

function generateRandomMeows() {
    let maxMeows = 25;
    let catResponse = "";
    let meowNumber = Math.floor(Math.random() * maxMeows + 1);
    for (let i = 0; i < meowNumber; i++) {
        catResponse = catResponse.concat(" ", "meow");
    }
    return catResponse;
}

function generateRandomImage() {
    let images = ["angry.jpg", "happy.jpg", "sad.jpeg", "serious.jpg", "oia-uia.gif"]
    catFace.src = `./img/${images[Math.floor(Math.random() * images.length)]}`;
}
