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
const titleInput = booksForm["title"];
const authorInput = booksForm["author"];
const yearInput = booksForm["year"];
const genreInput = booksForm["genre"];
const ISBNInput = booksForm["ISBN"];
const statusInput = booksForm["status"];

const newBookList = JSON.parse(localStorage.getItem("newBookList")) || [];;

const addNewBook = (title, author, year, genre, ISBN, status) => {
    newBookList.push({
        title, author, year, genre, ISBN, status
    });

    localStorage.setItem('newBookList', JSON.stringify(newBookList));

    return{title, author, year, genre, ISBN, status};
};

let listAdd = document.getElementById('listAdd');

const createBookList = ({title, author, year, genre, ISBN, status}) => {
    let row = document.createElement('tr');

    row.innerHTML = `
        <td>${title}</td>
        <td>${author}</td>
        <td>${year}</td>
        <td>${genre}</td>
        <td>${ISBN}</td>
        <td>${status}</td>
    `;

    listAdd.appendChild(row);
}

newBookList.forEach(createBookList);

booksForm.onsubmit = (e) => {
    e.preventDefault();

    const newReadyList = addNewBook(
        titleInput.value,
        authorInput.value,
        yearInput.value,
        genreInput.value,
        ISBNInput.value,
        statusInput.value
    );

    createBookList(newReadyList);

    titleInput.value = "";
    authorInput.value = "";
    yearInput.value = "";
    genreInput.value = "";
    ISBNInput.value = "";
    statusInput.value = "";
};
