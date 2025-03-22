const HUGGINGFACE_API_KEY = "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";
const MODEL_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev";

async function generateImage() {
    const prompt = document.getElementById("promptInput").value;
    const width = document.getElementById("widthInput").value || 512;
    const height = document.getElementById("heightInput").value || 512;
    const progressContainer = document.getElementById("progressContainer");
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");
    const imageContainer = document.getElementById("imageContainer");

    if (!prompt) {
        alert("Please enter a description!");
        return;
    }

    // Show progress bar
    progressContainer.classList.remove("hidden");
    progressBar.value = 0;
    progressText.innerText = "Starting...";

    // Fake progress simulation
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 10;
        progressBar.value = progress;
        progressText.innerText = `${progress}% completed`;

        if (progress >= 90) clearInterval(progressInterval);
    }, 500);

    // Fetch API Call
    const response = await fetch(MODEL_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: prompt, parameters: { width: parseInt(width), height: parseInt(height) } })
    });

    clearInterval(progressInterval);
    progressBar.value = 100;
    progressText.innerText = "Finalizing...";

    if (response.ok) {
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);

        imageContainer.innerHTML = `
            <img src="${imageUrl}" id="generatedImage"/>
            <a href="${imageUrl}" download="ai_image.png" class="download-btn">Download Image</a>
        `;
    } else {
        imageContainer.innerHTML = "<p>❌ Error: Could not generate image. Try again.</p>";
    }

    progressContainer.classList.add("hidden");
}