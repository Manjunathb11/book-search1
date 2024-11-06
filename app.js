document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    fetchBooks(query);
});

async function fetchBooks(query) {
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    displayResults(data.docs);
}

function displayResults(books) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book';
        bookElement.innerHTML = `
            <h2>${book.title}</h2>
            <p>Author(s): ${book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
            <p>First Published: ${book.first_publish_year || 'N/A'}</p>
            <img src="${book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'no-cover.jpg'}" alt="${book.title} cover">
        `;
        resultsContainer.appendChild(bookElement);
    });
}