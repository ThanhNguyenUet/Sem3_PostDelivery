function populateLeaderTable() {
    var tableBody = document.getElementById('leaderTable').getElementsByTagName('tbody')[0];

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Fetch data from the API
    fetch('http://localhost:8080/company_owner/leader')
        .then(response => response.json())
        .then(data => {
            // Populate the table with JSON data
            data.forEach(item => {
                var row = '<tr>' +
                    '<th scope="row">' + item.leaderID + '</th>' +
                    '<td>' + item.fullName + '</td>' +
                    '<td>' + item.address + '</td>' +
                    '<td>' + item.phoneNumber + '</td>' +
                    '<td>' + item.email + '</td>' +
                    '<td>' + item.locationName + '</td>' +
                    '</tr>';

                tableBody.insertAdjacentHTML('beforeend', row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', function () {
    populateLeaderTable();
});