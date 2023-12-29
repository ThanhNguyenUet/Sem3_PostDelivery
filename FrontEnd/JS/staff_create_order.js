document.getElementById("staffId").value = localStorage.getItem('staffID');

const currentUrl = window.location.href;

// Create a URL object from the URL string
const url = new URL(currentUrl);

// Create a URLSearchParams object from the URL
const urlSearchParams = url.searchParams;

// Get the value of the 'shipmentID' parameter
const shipmentID = urlSearchParams.get('shipmentID');

// Log the shipmentID to the console (you can use it as needed)
console.log('Shipment ID:', shipmentID);

document.getElementById("shipmentID").value = shipmentID;

document.addEventListener('DOMContentLoaded', function () {
    // Function to populate the staff dropdown
    function populateStaffDropdown() {
        const staffDropdown = document.getElementById('staffSelection');

        // Fetch data from the API
        fetch('http://localhost:8080/staffs')
            .then(response => response.json())
            .then(data => {
                // Clear existing options
                staffDropdown.innerHTML = '';

                // Populate options with staff data
                data.forEach(staff => {
                    const option = document.createElement('option');
                    option.value = staff.staffID; // Assuming staffId is the property in StaffDTO
                    option.textContent = staff.staffID; // Assuming staffName is the property in StaffDTO
                    staffDropdown.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching staff data:', error);
            });
    }

    // Call the function to populate the staff dropdown
    populateStaffDropdown();
    
    // Handle form submission (you may want to add your own logic)
    document.getElementById('create_shipping_order').addEventListener('submit', function (event) {
        event.preventDefault();
        
        // Add your logic for handling the form submission here
        // Get form data
            const staffId = document.getElementById('staffSelection').value;
            const shipmentId = document.getElementById('shipmentID').value;
            const staffSentId = document.getElementById('staffId').value;

            // Submit data to the server
            fetch(`http://localhost:8080/staff/createRequest/location/${shipmentId}/${staffSentId}/${staffId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                })
                .then(data => {
                    // Handle the response from the server
                    console.log('Request location created:', data);
                })
                .catch(error => {
                    // Handle errors
                    console.error('Error creating request location:', error);
                });
    });
});