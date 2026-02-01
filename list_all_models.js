const fs = require('fs');

async function listModels() {
    try {
        const envContent = fs.readFileSync('.env', 'utf8');
        const apiKey = envContent.match(/REACT_APP_GEMINI_API_KEY=(.*)/)[1].trim();

        console.log(`Using Key: ${apiKey.substring(0, 10)}...`);

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.error) {
            console.error('API Error:', data.error.message);
            return;
        }

        console.log('--- ALL AVAILABLE MODELS ---');
        data.models.forEach(m => {
            console.log(`Name: ${m.name}`);
            console.log(`Methods: ${m.supportedGenerationMethods.join(', ')}`);
            console.log('---');
        });
    } catch (e) {
        console.error('Error:', e.message);
    }
}

listModels();
