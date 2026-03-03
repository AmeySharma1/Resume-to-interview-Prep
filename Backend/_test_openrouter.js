require('dotenv').config();

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

async function testOpenRouter() {
    try {
        console.log("Using API Key:", process.env.OPENROUTER_API_KEY ? "Loaded" : "Missing");

        const response = await fetch(OPENROUTER_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "google/gemini-2.0-flash-lite-preview-02-05:free",
                messages: [{ role: "user", content: "Say hello!" }]
            })
        });

        const data = await response.text();
        console.log(`Status: ${response.status}`);
        console.log(`Response: ${data}`);
    } catch (e) {
        console.error(e);
    }
}

testOpenRouter();
