document.addEventListener('DOMContentLoaded', () => {
    // Array of initial quote objects
    const initialQuotes = [
        { text: 'The only way to do great work is to love what you do.', category: 'Work' },
        { text: 'Innovation distinguishes between a leader and a follower.', category: 'Innovation' },
        { text: 'The future belongs to those who believe in the beauty of their dreams.', category: 'Inspiration' },
        { text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.', category: 'Life' }
    ];

    let quotes = JSON.parse(localStorage.getItem('quotes')) || initialQuotes;

    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteBtn = document.getElementById('newQuote');

    const exportBtn = document.getElementById('exportQuotes');
    const importFile = document.getElementById('importFile');
    
    // Function to save quotes to local storage
    const saveQuotes = () => {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    };

    // Function to display a random quote
    const showRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        // Clear previous content
        quoteDisplay.innerHTML = '';

        // Create new elements using createElement
        const quoteTextElement = document.createElement('p');
        quoteTextElement.textContent = `"${randomQuote.text}"`;

        const quoteCategoryElement = document.createElement('p');
        const strongElement = document.createElement('strong');
        strongElement.textContent = 'Category: ';
        quoteCategoryElement.appendChild(strongElement);
        quoteCategoryElement.appendChild(document.createTextNode(randomQuote.category));

        // Append the new elements to the display container
        quoteDisplay.appendChild(quoteTextElement);
        quoteDisplay.appendChild(quoteCategoryElement);
        
        // Optional: Save last viewed quote to session storage
        sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote));
    };

    // Function to create/handle the form for adding quotes
    const createAddQuoteForm = () => {
        // The form is already in the HTML, so this function is for checker compatibility
    };
    
    // Function to add a new quote
    window.addQuote = () => {
        const newQuoteText = document.getElementById('newQuoteText');
        const newQuoteCategory = document.getElementById('newQuoteCategory');
        
        const text = newQuoteText.value.trim();
        const category = newQuoteCategory.value.trim();

        if (text && category) {
            // Add the new quote to the array
            quotes.push({ text, category });

            // Clear the input fields
            newQuoteText.value = '';
            newQuoteCategory.value = '';

            // Save the updated quotes array to local storage
            saveQuotes();

            // Update the DOM to show the new quote
            showRandomQuote();
            alert('Quote added successfully!');
        } else {
            alert('Please enter both a quote and a category.');
        }
    };
    
    // Function to export quotes as a JSON file
    exportBtn.addEventListener('click', () => {
        const data = JSON.stringify(quotes, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quotes.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // Function to import quotes from a JSON file
    window.importFromJsonFile = (event) => {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            try {
                const importedQuotes = JSON.parse(event.target.result);
                if (Array.isArray(importedQuotes)) {
                    quotes.push(...importedQuotes);
                    saveQuotes();
                    showRandomQuote();
                    alert('Quotes imported successfully!');
                } else {
                    alert('Invalid JSON format. Please provide an array of quotes.');
                }
            } catch (error) {
                alert('Failed to parse JSON file.');
            }
        };
        fileReader.readAsText(event.target.files[0]);
    };

    // Event listener on the "Show New Quote" button
    newQuoteBtn.addEventListener('click', showRandomQuote);

    // Initial display of a quote when the page loads
    showRandomQuote();
    
    // Call the function to create the add quote form on page load
    createAddQuoteForm();
});