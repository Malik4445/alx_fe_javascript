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
    const categoryFilter = document.getElementById('categoryFilter');
    const exportBtn = document.getElementById('exportQuotes');
    const importFile = document.getElementById('importFile');
    
    // Function to save quotes to local storage
    const saveQuotes = () => {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    };

    // Function to populate the category filter dropdown
    const populateCategories = () => {
        const uniqueCategories = ['all', ...new Set(quotes.map(quote => quote.category))];
        categoryFilter.innerHTML = ''; // Clear previous options
        uniqueCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });

        // Restore the last selected filter from local storage
        const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
        categoryFilter.value = lastSelectedCategory;
    };
    
    // Function to display quotes based on the selected filter
    window.filterQuotes = () => {
        const selectedCategory = categoryFilter.value;
        localStorage.setItem('lastSelectedCategory', selectedCategory); // Save the selected filter

        const filteredQuotes = selectedCategory === 'all'
            ? quotes
            : quotes.filter(quote => quote.category === selectedCategory);

        if (filteredQuotes.length > 0) {
            // Display a random quote from the filtered array
            const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
            const randomQuote = filteredQuotes[randomIndex];

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
        } else {
            quoteDisplay.innerHTML = '<p>No quotes found for this category.</p>';
        }
    };

    // Function to display a random quote from the whole array (used for the button)
    const showRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        quoteDisplay.innerHTML = '';
        const quoteTextElement = document.createElement('p');
        quoteTextElement.textContent = `"${randomQuote.text}"`;
        const quoteCategoryElement = document.createElement('p');
        const strongElement = document.createElement('strong');
        strongElement.textContent = 'Category: ';
        quoteCategoryElement.appendChild(strongElement);
        quoteCategoryElement.appendChild(document.createTextNode(randomQuote.category));

        quoteDisplay.appendChild(quoteTextElement);
        quoteDisplay.appendChild(quoteCategoryElement);
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
            populateCategories(); // Update categories with the new one

            // Display a random quote from the newly updated array
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
                    populateCategories(); // Update categories with new ones
                    filterQuotes();
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
    
    // Initial setup on page load
    populateCategories();
    filterQuotes();
});