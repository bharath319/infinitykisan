const languageNameMap = {
    en: 'English',
    hi: 'Hindi',
    te: 'Telugu',
    ta: 'Tamil',
    kn: 'Kannada',
    ml: 'Malayalam',
    mr: 'Marathi',
    gu: 'Gujarati',
    bn: 'Bengali',
    pa: 'Punjabi',
    ur: 'Urdu',
    or: 'Odia'
};

export const analyzeDiseaseImages = async (images, crop, symptoms, language = 'en') => {
    // Exclusively use Environment Variable for security
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

    if (!apiKey || apiKey === 'YOUR_NEW_API_KEY_HERE') {
        throw new Error('Gemini API Key is missing. Please add it to your .env file.');
    }

    const targetLanguage = languageNameMap[language] || 'English';

    const prompt = `
        Identify the disease in this ${crop} plant.
        User symptoms: ${symptoms || 'None'}.
        Provide a JSON response with these keys: disease, confidence, symptoms (array), treatments (array), preventiveMeasures (array).
        The values for disease, symptoms, treatments, and preventiveMeasures MUST be in ${targetLanguage}.
        Reply ONLY with valid JSON.
    `;

    try {
        const imageParts = images.map(img => {
            const base64Data = img.split(',')[1];
            const mimeType = img.split(',')[0].split(':')[1].split(';')[0];
            return {
                inline_data: {
                    data: base64Data,
                    mime_type: mimeType
                }
            };
        });

        // Use a specific Gemini flash model
        let response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: prompt },
                        ...imageParts
                    ]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Gemini API Error details:', errorData);
            // Helpful hint when the model is not available to the current account or API version
            if (response.status === 404 || (errorData.error && /not found/i.test(errorData.error.message))) {
                throw new Error('The requested Gemini model is not available for your API version or project. Try using "models/gemini-2.5-flash" and ensure your API key has access.');
            }
            throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
        }


        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('No analysis result was returned by the AI.');
        }

        const text = data.candidates[0].content.parts[0].text;
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const result = JSON.parse(jsonMatch ? jsonMatch[0] : text);

        return result;
    } catch (error) {
        console.error('Gemini Analysis Error:', error);
        throw error;
    }
};

export const analyzeDiseaseReport = async (pdfBase64, language = 'en') => {
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

    if (!apiKey || apiKey === 'YOUR_NEW_API_KEY_HERE') {
        throw new Error('Gemini API Key is missing. Please add it to your .env file.');
    }

    const targetLanguage = languageNameMap[language] || 'English';

    const prompt = `
        You are an AI assistant helping farmers.
        Please analyze this PDF report of a crop disease. Read the text to understand the disease identified.
        Extract the recommended pesticides and fertilizers from the report.
        If the report does not explicitly mention any, infer common pesticides and fertilizers for the identified disease in the report.
        Provide a JSON response with these keys: 
        - "disease" (string)
        - "pesticides" (array of strings)
        - "fertilizers" (array of strings)
        The values MUST be in ${targetLanguage}.
        Reply ONLY with valid JSON.
    `;

        try {
        const base64Data = pdfBase64.split(',')[1];
        
        let response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: prompt },
                        { inline_data: { mime_type: 'application/pdf', data: base64Data } }
                    ]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Gemini API Error details:', errorData);
            throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('No analysis result was returned by the AI.');
        }

        const text = data.candidates[0].content.parts[0].text;
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const result = JSON.parse(jsonMatch ? jsonMatch[0] : text);

        return result;
    } catch (error) {
        console.error('Gemini Analysis Error:', error);
        throw error;
    }
};
