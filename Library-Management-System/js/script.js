const books = [
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: 1960,
        genre: "Fiction",
        ISBN: "978-0-06-112008-4",
        status: "issued"
    },
    {
        title: "1984",
        author: "George Orwell",
        year: 1949,
        genre: "Dystopian",
        ISBN: "978-0-452-28423-4",
        status: "renewed"
    },
    {
        title: "Moby Dick",
        author: "Herman Melville",
        year: 1851,
        genre: "Adventure",
        ISBN: "978-0-14-243724-7",
        status: "available"
    },
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: 1925,
        genre: "Classic",
        ISBN: "978-0-7432-7356-5",
        status: "issued"
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        year: 1813,
        genre: "Romance",
        ISBN: "978-0-19-280238-5",
        status: "available"
    }
];

const tableBody = document.getElementById('bookTableBody');

books.forEach(book => {
    let row = document.createElement('tr');
    let statusClass = '';

    // Determine the class for status
    switch (book.status) {
        case 'issued':
            statusClass = 'issued';
            break;
        case 'renewed':
            statusClass = 'renewed';
            break;
        case 'available':
            statusClass = 'available';
            break;
        default:
            statusClass = '';
    }

    // Create cells and add to the row
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.year}</td>
        <td>${book.genre}</td>
        <td>${book.ISBN}</td>
        <td class="${statusClass}">${book.status}</td>
    `;

    tableBody.appendChild(row);
});