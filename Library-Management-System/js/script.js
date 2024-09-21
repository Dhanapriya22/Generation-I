let bookList = JSON.parse(localStorage.getItem("bookList")) || [{
    date: '22-09-2023',
    title: 'Moby Dick',
    author: 'Harper Lee',
    year: '1859',
    genre: 'Comedy',
    status: 'Available'
},
{
    date: '23-09-2023',
    title: 'The Great Gatsby',
    author: 'George Orwell',
    year: '1990',
    genre: 'Classic',
    status: 'Issued'
}];

// Form Open and Close
function openForm() {
    document.getElementById("booksForm").style.display = "block";
}

function closeForm() {
    document.getElementById("booksForm").style.display = "none";
}

bookList.forEach((books, index) => {
    let bookDisplay = document.getElementById('dataList');
    let row = document.createElement('tr');
    let statusClass = '';

    // Determine the class for status
    switch (books.status) {
        case 'Issued':
            statusClass = 'issued';
            break;
        case 'Renewed':
            statusClass = 'renewed';
            break;
        case 'Available':
            statusClass = 'available';
            break;
        default:
            statusClass = '';
    }

    console.log(books)
    row.innerHTML = `
        <td>${books.date}</td>
        <td>${books.title}</td>
        <td>${books.author}</td>
        <td>${books.year}</td>
        <td>${books.genre}</td>
        <td class="${statusClass}">${books.status}</td>
        <td>
            <button onclick="editBook(${index})">Edit</button>
            <button onclick="deleteBook(${index})">Delete</button>
        </td>
    `
    bookDisplay.appendChild(row);

    // Chart Display
    // const ctx = document.getElementById('myChartDisp').getContext('2d');
    // const myChart = new Chart(ctx, {
    //     type: 'bar', // Specify the chart type
    //     data: {
    //         labels: books.title,
    //         datasets: [{
    //             label: 'Sales',
    //             data: [65, 59, 80, 81, 56, 55, 40], // Data for the chart
    //             backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color of bars
    //             borderColor: 'rgba(75, 192, 192, 1)', // Border color of bars
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true // Start the y-axis at 0
    //             }
    //         }
    //     }
    // });
});

// Add or Update data
const saveBook = (event) => {
    event.preventDefault();
    const date = document.getElementById('date').value;
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const genre = document.getElementById('genre').value;
    const status = document.getElementById('status').value;
    const index = document.getElementById('index').value;                
    
    if (index) {
        bookList[index] = { date, title, author, year, genre, status }; // Update existing data
    } else {
        bookList.push({ date, title, author, year, genre, status }); // Add new data
    }

    localStorage.setItem('bookList', JSON.stringify(bookList));
    clearForm();
    location.reload();
};


// Edit data
const editBook = (index) => {
    console.log(index);
    openForm();
    const bookList = JSON.parse(localStorage.getItem('bookList')) || [];
    const item = bookList[index];
    console.log(item)
    document.getElementById('date').value = item.date;
    document.getElementById('title').value = item.title;
    document.getElementById('author').value = item.author;
    document.getElementById('year').value = item.year;
    document.getElementById('genre').value = item.genre;
    document.getElementById('status').value = item.status;
    document.getElementById('index').value = index;
};

// Delete data
const deleteBook = (index) => {
    console.log(index);
    const bookList = JSON.parse(localStorage.getItem('bookList')) || [];
    bookList.splice(index, 1);
    localStorage.setItem('bookList', JSON.stringify(bookList));
    location.reload();
};


// Event listeners
document.getElementById('booksForm').addEventListener('submit', saveBook);

// Clear the form
const clearForm = () => {
    document.getElementById('booksForm').reset();
    document.getElementById('index').value = '';
};