// Get the current URL
const currentUrl = window.location.href;

// Create a URL object from the URL string
const url = new URL(currentUrl);

// Create a URLSearchParams object from the URL
const urlSearchParams = url.searchParams;

// Get the value of the 'shipmentID' parameter
const shipmentID = urlSearchParams.get('shipmentID');

// Log the shipmentID to the console (you can use it as needed)
console.log('Shipment ID:', shipmentID);

var user_sent = document.getElementById('nameandaddressSent')
var user_received = document.getElementById('nameandaddressRec')

// Example function using the shipmentID
const getShipmentInformation = (shipmentID) => {
  const apiUrl = `http://localhost:8080/staff/shipments/get/ship/${shipmentID}`;

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Handle the shipment data
      user_sent.innerHTML = data.userSent.fullName + data.userSent.address;
      user_received.innerHTML = data.userReceivedAddress;
      console.log('Shipment Information:', data);
      return data; // You can return the data if needed
    })
    .catch(error => {
      // Handle errors
      console.error('Error fetching shipment information:', error);
      throw error; // You can rethrow the error if needed
    });
};

// Example usage:
if (shipmentID) {
  getShipmentInformation(shipmentID);
} else {
  console.error('No shipmentID found in the URL');
}
