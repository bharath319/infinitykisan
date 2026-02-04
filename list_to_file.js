const fs = require('fs');

async function listModels() {
    try {
        const envContent = fs.readFileSync('.env', 'utf8');
        const apiKey = envContent.match(/REACT_APP_GEMINI_API_KEY=(.*)/)[1].trim();

        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`);
        const data = await response.json();

        if (data.error) {
            fs.writeFileSync('models_list.txt', 'API Error: ' + data.error.message);
            return;
        }

        let output = 'Available Models:\n';
        data.models.forEach(m => {
            if (m.supportedGenerationMethods.includes('generateContent')) {
                output += `- ${m.name}\n`;
            }
        });
        fs.writeFileSync('models_list.txt', output);
    } catch (e) {
        fs.writeFileSync('models_list.txt', 'Error: ' + e.message);
    }
}

listModels();
