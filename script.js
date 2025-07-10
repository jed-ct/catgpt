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

function preloadImages(imageList) {
    const images = [];
    for (let src of imageList) {
        const img = new Image();
        img.src = `./img/${src}`;
        images.push(img); // optionally store in case you need it
    }
}

// Combine all emotion image arrays into one
const allReactionImages = [
    "happy.jpg", "happy2.jpg", "happy3.jpg",
    "sad.jpeg", "sad2.jpg", "sad3.jpg", "sad4.jpg",
    "angry.jpg", "angry2.jpg", "angry3.jpg",
    "scared.png", "scared2.jpg", "scared3.png",
    "shocked.png", "shocked2.jpg", "shocked3.jpg",
    "disgust.jpg", "disgust2.jpg", "disgust3.jpg",
    "curious.jpeg", "curious2.jpg", "curious3.jpg", "curious4.jpg"
];

preloadImages(allReactionImages);

console.log("images preloaded!");


btnSubmit.addEventListener("click", ()=> {
    const question = "ano ang topic natin ngayon?"
    catResponse.textContent = "";
    catFace.src = "./img/loadingscreen.gif"
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

    const reactions = {
        happy: {
            images: ["happy.jpg", "happy2.jpg", "happy3.jpg"],
            text: "Meow! Meowieeee! *Nagtumbling*"
        },
        sad: {
            images: ["sad.jpeg", "sad2.jpg", "sad3.jpg", "sad4.jpg"],
            text: "meowww :((("
        },
        angry: {
            images: ["angry.jpg", "angry2.jpg", "angry3.jpg"],
            text: "Meow! Meow! *nagdabog*"
        },
        fear: {
            images: ["scared.png", "scared2.jpg", "scared3.png", "shocked.png", "shocked2.jpg", "shocked3.jpg"],
            text: "M-M-Meow..."
        },
        shocked: {
            images: ["shocked.png", "shocked2.jpg", "shocked3.jpg"],
            text: "MEOW!"
        },
        disgust: {
            images: ["disgust.jpg", "disgust2.jpg", "disgust3.jpg"],
            text: "Meooowwwgh..."
        },
        curious: {
            images: ["curious.jpeg", "curious2.jpg", "curious3.jpg", "curious4.jpg"],
            text: "meow meow meow?"
        }
    };
    const reaction = reactions[emotion];
    if (reaction) {
        const randomImage = reaction.images[Math.floor(Math.random() * reaction.images.length)];
        catFace.src = `./img/${randomImage}`;
        catResponse.textContent = reaction.text;
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

