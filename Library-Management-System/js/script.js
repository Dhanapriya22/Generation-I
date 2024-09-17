fetch("./../js/data.json")

.then(function(response) {
    return response.json();
})

.then(function(data){

    const tableBody = document.getElementById('bookData');

    data.forEach(book => {
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
    
        bookData.appendChild(row);

    });
})


// // Form Validation
// document.addEventListener('DOMContentLoaded', function() {
//     const openFormBtn = document.getElementById('openFormBtn');
//     const closeFormBtn = document.getElementById('closeFormBtn');
//     const formPopup = document.getElementById('formPopup');
//     const myForm = document.getElementById('myForm');    

//     openFormBtn.addEventListener('click', function() {
//         formPopup.style.display = 'block';
//     });

//     closeFormBtn.addEventListener('click', function() {
//         formPopup.style.display = 'none';
//     });

// });


// DOM Elements
const booksForm = document.getElementById("booksForm");
const tableContainer = document.querySelector("#bookData");
const dateInput = booksForm["date"];
const titleInput = booksForm["title"];
const authorInput = booksForm["author"];
const yearInput = booksForm["year"];
const genreInput = booksForm["genre"];
const ISBNInput = booksForm["ISBN"];
const statusInput = booksForm["status"];

const newBookList = JSON.parse(localStorage.getItem("newBookList")) || [];

const addNewBook = (date, title, author, year, genre, ISBN, status) => {
    newBookList.push({
        date, title, author, year, genre, ISBN, status
    });

    localStorage.setItem('newBookList', JSON.stringify(newBookList));

    return{date, title, author, year, genre, ISBN, status};
};

let listAdd = document.getElementById('listAdd');

let row = document.createElement('tr');

const createBookList = ({date, title, author, year, genre, ISBN, status}) => {

    row.innerHTML = `
        <td>${date}</td>
        <td>${title}</td>
        <td>${author}</td>
        <td>${year}</td>
        <td>${genre}</td>
        <td>${ISBN}</td>
        <td>${status}</td>
        <td>
            <button onclick="editRow(this)">Edit</button>
            <button onclick="deleteRow(this)">Delete</button>
        </td>
    `;

    listAdd.appendChild(row);
}

let editingBookList = null;

// Create Book List
newBookList.forEach(createBookList);

booksForm.onsubmit = (e) => {
    e.preventDefault();

    if(editingBookList) {
        console.log(e);
    } 
    const newReadyList = addNewBook(
        dateInput.value,
        titleInput.value,
        authorInput.value,
        yearInput.value,
        genreInput.value,
        ISBNInput.value,
        statusInput.value
    );    

    createBookList(newReadyList);
    dateInput.value =   
    titleInput.value = "";
    authorInput.value = "";
    yearInput.value = "";
    genreInput.value = "";
    ISBNInput.value = "";
    statusInput.value = "";
};

// Edit Table
editRow = (e) => {
    console.log(e);
    editingBookList = e.parentElement.parentElement;
    dateInput.value = editingBookList.cells[0].textContent;
    titleInput.value = editingBookList.cells[1].textContent;
    authorInput.value = editingBookList.cells[2].textContent;
    yearInput.value = editingBookList.cells[3].textContent;
    genreInput.value = editingBookList.cells[4].textContent;
    ISBNInput.value = editingBookList.cells[5].textContent;
    statusInput.value = editingBookList.cells[6].textContent;
}
deleteRow = (e) => {
    console.log("Delete clicked", e);
    listAdd.removeChild(row);
}


newBookList.forEach((listItems) => {
    console.log(listItems);
    const ctx = document.getElementById('myChartDisp').getContext('2d');
    const myChartDisp = new Chart(ctx, {
        type: 'bar', // Can be 'line', 'bar', 'pie', etc.
        data: {
            labels: listItems.title,
            datasets: [{
                label: 'Date',
                data: listItems.title,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
})