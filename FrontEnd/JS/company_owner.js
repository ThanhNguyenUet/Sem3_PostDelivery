var table = document.getElementById('transactionTable')
// Function to fetch data and populate the table
function populateTable() {
    var tableBody = table.getElementsByTagName('tbody')[0];
    
    // Clear existing table rows
    tableBody.innerHTML = '';

    // Fetch data from the API
    fetch('http://localhost:8080/company_owner/transaction')
        .then(response => response.json())
        .then(data => {
            // Populate the table with JSON data
            data.forEach(item => {
                var row = '<tr>' +
                    '<th scope="row">' + item.locationID + '</th>' +
                    '<td>' + item.locationName + '</td>' +
                    '<td>' + item.leader.fullName + '</td>' +
                    '</tr>';

                tableBody.insertAdjacentHTML('beforeend', row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}


// Call the function when the page loads
document.addEventListener('DOMContentLoaded', function () {
    populateTable();
});