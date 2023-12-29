document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the API endpoint
    fetch('http://localhost:8080/company_owner/shipments')
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
                document.getElementById('parcelTable').getElementsByTagName('tbody')[0].insertAdjacentHTML('beforeend', row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

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