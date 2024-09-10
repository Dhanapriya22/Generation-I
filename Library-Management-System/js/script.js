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