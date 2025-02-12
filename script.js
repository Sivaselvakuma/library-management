document.getElementById('bookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const publishedYear = document.getElementById('publishedYear').value;
    const isbn = document.getElementById('isbn').value;

    const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author, publishedYear, isbn })
    });

    if (response.ok) {
        loadBooks();
        document.getElementById('bookForm').reset(); // Clear the form after submission
    } else {
        console.error('Error adding book:', response.statusText); // Log error if any
    }
});

// Function to load books from the API and display them
async function loadBooks() {
    const response = await fetch('/api/books');
    const books = await response.json();
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = ''; // Clear the current list

    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} (ISBN: ${book.isbn})`;
        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = async () => {
            await fetch(`/api/books/${book._id}`, { method: 'DELETE' });
            loadBooks(); // Reload books after deletion
        };
        li.appendChild(deleteButton);
        bookList.appendChild(li);
    });
}

// Load books when the page is loaded
window.onload = loadBooks;
