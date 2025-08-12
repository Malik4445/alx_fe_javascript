document.addEventListener('DOMContentLoaded', () => {
    // Array of initial quote objects
    const quotes = [
        { text: 'The only way to do great work is to love what you do.', category: 'Work' },
        { text: 'Innovation distinguishes between a leader and a follower.', category: 'Innovation' },
        { text: 'The future belongs to those who believe in the beauty of their dreams.', category: 'Inspiration' },
        { text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.', category: 'Life' }
    ];

    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteBtn = document.getElementById('newQuote');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');

    // Function to display a random quote using createElement and appendChild
    const showRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        // Clear previous content
        quoteDisplay.innerHTML = '';

        // Create new elements
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
    };

    // Function to add a new quote
    window.addQuote = () => {
        const text = newQuoteText.value.trim();
        const category = newQuoteCategory.value.trim();

        if (text && category) {
            // Add the new quote to the array
            quotes.push({ text, category });

            // Clear the input fields
            newQuoteText.value = '';
            newQuoteCategory.value = '';

            // Update the DOM to show the new quote
            showRandomQuote();
            alert('Quote added successfully!');
        } else {
            alert('Please enter both a quote and a category.');
        }
    };

    // Event listener for the "Show New Quote" button
    newQuoteBtn.addEventListener('click', showRandomQuote);

    // Initial display of a quote when the page loads
    showRandomQuote();
});