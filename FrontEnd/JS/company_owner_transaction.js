var table1 = document.getElementById('settlementTable')
function populateTable1() {
    var tableBody = table1.getElementsByTagName('tbody')[0];
    
    // Clear existing table rows
    tableBody.innerHTML = '';

    // Fetch data from the API
    fetch('http://localhost:8080/company_owner/settlement')
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
    populateTable1();
});