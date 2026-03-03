async function findModels() {
    const response = await fetch("https://openrouter.ai/api/v1/models");
    const data = await response.json();
    const geminiModels = data.data.filter(m => m.id.includes('gemini') && m.id.includes('free'));
    console.log("Available Free Gemini Models:");
    geminiModels.forEach(m => console.log(m.id));
}
findModels();
