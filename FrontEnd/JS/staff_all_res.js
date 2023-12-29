document.addEventListener('DOMContentLoaded', function () {
    // Fetch all data initially
    fetchData();

    // Attach the filterShipments function to the input event of the search input
    document.getElementById('searchInput').addEventListener('input', filterShipments);

    // Helper function to fetch data from the API endpoint
    function fetchData() {
        fetch('http://localhost:8080/staff/shipments/getAll')
            .then(response => response.json())
            .then(data => renderShipments(data))
            .catch(error => console.error('Error fetching data:', error));
    }

    // Helper function to filter shipments based on the search input
    function filterShipments() {
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput.value.trim();

        // If the search term is empty, fetch all data
        if (searchTerm === '') {
            fetchData();
            return;
        }

        // Otherwise, fetch data for the specific ID
        const id = parseInt(searchTerm);
        if (!isNaN(id)) {
            fetch(`http://localhost:8080/staff/shipments/get/${id}`)
                .then(response => response.json())
                .then(data => renderShipments(data))
                .catch(error => console.error('Error fetching data:', error));
        }
    }

    // Helper function to render shipments in the table
    function renderShipments(shipments) {
        const tableBody = document.querySelector('#parcelTable tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        shipments.forEach(shipment => {
            const row = '<tr>' +
                '<td>' + shipment.shipmentID + '</td>' +
                '<td>' + shipment.locationSent + '</td>' +
                '<td>' + shipment.locationReceived + '</td>' +
                '<td>' + formatDateTime(shipment.shipmentTimeSent) + '</td>' +
                '<td>' + shipment.shipmentStatusType + '</td>' +
                '<td>' + formatGoods(shipment.goods) + '</td>' +
                '<td>' + `<a href="receipt.html?shipmentID=${shipment.shipmentID}"><i class="fas fa-receipt"></i></a>` + '</td>' +
                '<td>' + `<a href="create_shipment_order.html?shipmentID=${shipment.shipmentID}"><i class="fas fa-receipt"></i></a>` + '</td>' +
                '</tr>';
            // Append the row to the table body
            tableBody.insertAdjacentHTML('beforeend', row);
        });
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

    // Helper function to open receipt for a shipment
});