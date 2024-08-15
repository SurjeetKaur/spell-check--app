const form = document.getElementById('spellcheck-form');
const inputText = document.getElementById('input-text');
const checkSpellingButton = document.getElementById('check-spelling');
const resultDiv = document.getElementById('result');

checkSpellingButton.addEventListener('click', (e) => {
    e.preventDefault();
    const text = inputText.value.trim(); //extract input :trim removes whitespace characters from input string
    if (text) {
        fetch('/spellcheck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        })
        .then(response => response.json())
        .then(data => {
            resultDiv.textContent = "processing.....";
            const correctedText = replaceWithBestCandidate(data);
            resultDiv.textContent = `Corrected text: ${correctedText}`;
        })
        .catch(error => {
            console.error('Error:', error);  
        });
    } else {
        resultDiv.textContent = 'Please enter some text';
    }
});

// spellcheck function to update data after correcting it
function replaceWithBestCandidate(data) {
    let updatedText = data.original_text;

    data.corrections.forEach(correction => {
        const { text, best_candidate } = correction;
        updatedText = updatedText.replace(text, best_candidate);
    });

    return updatedText;
}

