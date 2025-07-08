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
    const question = "ano ang topic natin ngayon?"
    catResponse.textContent = "";
    catFace.src = preloadedImages[preloadedImages.length - 1].src;
    catResponseDiv.style.display = "flex";    
    if (catPrompt.value == question) {
        setTimeout(()=> {
            catResponse.textContent = "mga hayop sa larangan ng video games";;
            catFace.src = "./img/ermactually.png"
    }, 500)
    }
    else {
        (async () => {
            let response = await getGeminiResponse(catPrompt.value);
            generateReaction(response.toLowerCase());
        })();
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

function generateRandomImage(emotion) {
    const randomIndex = Math.floor(Math.random() * (images.length - 1));
    const selectedImage = preloadedImages[randomIndex].src;
    catFace.src = selectedImage;
    console.log("reaction image: " + selectedImage);
}
//happy, sad, angry, fear, shocked, or curious
function generateReaction(emotion) {
    emotion = emotion.trim().toLowerCase();
    console.log(emotion);
    if (emotion == "happy") {
        catFace.src = "./img/happy.jpg";
        catResponse.textContent = "Meow! Meowieeee! *Nagtumbling*";   
    }

    else if (emotion == "sad") {
        catFace.src = "./img/sad2.jpg";
        catResponse.textContent = "meowww :(((";  
    }

    else if (emotion == "angry") {
        catFace.src = "./img/angry.jpg";
        catResponse.textContent = "Meow! Meow! *nagdabog*";  
    }

    else if (emotion == "fear") {
        catFace.src = "./img/nooo.png";
        catResponse.textContent = "M-M-Meow...";  
    }

    else if (emotion == "shocked") {
        catFace.src = "./img/shocked.png";
        catResponse.textContent = "MEOW!";  
    }
    else if (emotion == "disgust") {
        catFace.src = "./img/disgust.jpg";
        catResponse.textContent = "Meooowwwgh...";  
    }
    else if (emotion == "curious") {
        catFace.src = "./img/curious.jpeg";
        catResponse.textContent = "meow meow meow?";  
    }
    else {
        generateRandomImage();
        catResponse.textContent = "meow... *di na-gets*";
    }
}


async function getGeminiResponse(prompt) {
    // DO NOT USE PLEASE PLEASE HINDI PA AKO MARUNONG MAG BACKEND TO HIDE IT. CATGPT IS FOR DEMONSTRATION PURPOSES ONLY.
    const apiKey = "AIzaSyCmABv2zfQ0LdA3GKj1sHEBOJWsDnsvqmw"; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite-preview-06-17:generateContent?key=${apiKey}`;

    // Prepare the payload for the API
    const payload = {
        contents: [{
            role: "user",
            parts: [{ text: `You are a cat. A user sends you a message, and you reply only with one of the following emotions that best fits your cat reaction: happy, sad, angry, fear, shocked, curious, disgust, or notclear. Reply with the lowercase word only. This is the message:${prompt}` }]
        }]
    };

    try {
        // Make the API call
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // Check if the request was successful
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
        }

        const result = await response.json();

        // Extract and return the text from the response
        if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
            return result.candidates[0].content.parts[0].text;
        } else {
            // Handle cases where the response structure is unexpected
            return "Sorry, the response from the API was not in the expected format.";
        }

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        // In case of an error, return an error message string
        return `An error occurred: ${error.message}`;
    }
}

