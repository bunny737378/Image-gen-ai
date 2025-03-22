const HUGGINGFACE_API_KEY = "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"; 
const MODEL_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev";

async function generateImage() {
    const prompt = document.getElementById("promptInput").value;
    const loadingText = document.getElementById("loading");
    const imageContainer = document.getElementById("imageContainer");

    if (!prompt) {
        alert("Please enter a description!");
        return;
    }

    loadingText.classList.remove("hidden");
    imageContainer.innerHTML = "";

    const response = await fetch(MODEL_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: prompt, parameters: { width: 512, height: 512 } })
    });

    if (response.ok) {
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        const img = document.createElement("img");
        img.src = imageUrl;
        imageContainer.appendChild(img);
    } else {
        imageContainer.innerHTML = "<p>❌ Error: Could not generate image. Try again.</p>";
    }

    loadingText.classList.add("hidden");
}