function logOut() {
    // Remove leaderID from localStorage
    localStorage.removeItem('leaderID');

    // Redirect to the login page
    window.location.href = '../User/login.html';
}

document.addEventListener('DOMContentLoaded', function () {
    const leaderID = localStorage.getItem('leaderID');

    // Populate the Parcels Sent table
    populateShipmentTable('http://localhost:8080/leader/parcelsSent/' + leaderID, 'parcelSentTable');

    // Populate the Parcels Received table
    populateShipmentTable('http://localhost:8080/leader/parcelsReceived/' + leaderID, 'parcelReceivedTable');

    function populateShipmentTable(apiEndpoint, tableId) {
        // Fetch data from the API endpoint
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                // Iterate through each shipment in the JSON data
                data.forEach(shipment => {
                    // Create a new row for each shipment
                    var row = '<tr>' +
                        '<td>' + shipment.shipmentID + '</td>' +
                        '<td>' + shipment.locationSent + '</td>' +
                        '<td>' + shipment.locationReceived + '</td>' +
                        '<td>' + formatDateTime(shipment.shipmentTimeSent) + '</td>' +
                        '<td>' + shipment.shipmentStatusType + '</td>' +
                        '<td>' + formatGoods(shipment.goods) + '</td>' +
                        '</tr>';
                    // Append the row to the table body
                    document.getElementById(tableId).getElementsByTagName('tbody')[0].insertAdjacentHTML('beforeend', row);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Helper function to format date and time
    function formatDateTime(dateTimeArray) {
        var date = new Date(dateTimeArray[0], dateTimeArray[1] - 1, dateTimeArray[2]);
        var time = dateTimeArray.slice(3).join(':');
        return date.toLocaleString() + ' ' + time;
    }

    // Helper function to format goods information
    function formatGoods(goods) {
        var goodsInfo = '';
        goods.forEach(good => {
            goodsInfo +=
                '<strong>Name:</strong> ' + good.goodsName + '<br>';
        });
        return goodsInfo;
    }
});

async function fetchLeaderData() {
    const leaderID = localStorage.getItem('leaderID');

    try {
        if (leaderID) {
            // If userID is present, fetch user data
            const response = await fetch(`http://localhost:8080/leader/${leaderID}`);
            if (response.ok) {
                const leaderData = await response.json();
                // Update the HTML with the user data
                const userDisplayNameElements = document.getElementsByClassName('userDisplayName');
                for (let i = 0; i < userDisplayNameElements.length; i++) {
                userDisplayNameElements[i].textContent = leaderData.fullName;
                }
            } else {
                console.error('Failed to fetch leader data:', response.statusText);
            }
        } else {
            // If userID is not present, redirect to the login page
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Error during fetchUserData:', error);
    }
}

window.onload = fetchLeaderData;