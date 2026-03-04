const { GoogleGenAI } = require('@google/genai');

async function checkApiKeyStatus() {
    try {
        const ai = new GoogleGenAI({ apiKey:  });
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: 'Say hello!',
        });
        console.log("Success! Key works:", response.text);
    } catch (error) {
        console.error("API Key Error:", error.message);
    }
}

checkApiKeyStatus();
