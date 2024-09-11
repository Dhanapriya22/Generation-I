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

// Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const openFormBtn = document.getElementById('openFormBtn');
    const closeFormBtn = document.getElementById('closeFormBtn');
    const formPopup = document.getElementById('formPopup');
    const myForm = document.getElementById('myForm');

    openFormBtn.addEventListener('click', function() {
        formPopup.style.display = 'block';
    });

    closeFormBtn.addEventListener('click', function() {
        formPopup.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === formPopup) {
            formPopup.style.display = 'none';
        }
    });

    // Create an empty JSON object
    let jsonObject = {};

    submitForm = () => {

        // Get form element
        const form = document.getElementById('myForm');
            
        // Create a FormData object from the form
        const formData = new FormData(form);
        
        // Convert FormData to a JSON object
        formData.forEach((value, key) => {
            jsonObject[key] = value;
        });
                
        // Optionally, you can clear the form fields after submission
        form.reset();
    }

    console.log(jsonObject);
});


