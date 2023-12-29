var table1 = document.getElementById('shipping_order')
var staffReceivedID = localStorage.getItem('staffID')
function populateTable1() {
    var tableBody = table1.getElementsByTagName('tbody')[0];
    
    // Clear existing table rows
    tableBody.innerHTML = '';

    // Fetch data from the API
    fetch('http://localhost:8080/staff/shipping_order/' + staffReceivedID)
        .then(response => response.json())
        .then(data => {
            // Populate the table with JSON data
            data.forEach(item => {
                var row = '<tr>' +
                    '<th scope="row">' + item.orderID + '</th>' +
                    '<td>' + item.shipments.shipmentID + '</td>' +
                    '<td>' + item.staffSent.staffID + '</td>' +
                    '<td>' + staffReceivedID + '</td>' +
                    '<td onclick="changeStatus(' + item.orderID + ')">' + item.status + '</td>' +
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

async function changeStatus(orderID) {
    const response = await fetch(`http://localhost:8080/staff/shipments/statusChange/${orderID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        alert('Update successful!');
        setTimeout(function() {
            window.location.href = "shipping_order.html"; 
        }, 100);
    } else {
        const errorData = await response.json();
        console.log('Update failed:', errorData);
        alert('Update failed. Please try again.');
    }
}