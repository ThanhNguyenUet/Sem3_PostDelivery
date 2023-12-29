
    // Define a list to store goods
    let goodsList = [];

    // Function to read input from "Add Good" form, create an object, and add to the list
    function addGood() {
        const goodsName = document.getElementById('goodsName').value;
        const goodsType = document.querySelector('input[name="goodsType"]:checked').value;
        const goodsSize = parseFloat(document.getElementById('goodsSize').value);
        const goodsWeight = parseFloat(document.getElementById('goodsWeight').value);

        // Validate input
        if (!goodsName || isNaN(goodsSize) || isNaN(goodsWeight)) {
            alert("Please fill in all fields with valid values.");
            return;
        }

        // Create a new object for the good
        const newGood = {
            goodsName : goodsName,
            goodsType: goodsType,
            goodsSize: goodsSize,
            goodsWeight: goodsWeight
        };

        // Add the new good to the list
        goodsList.push(newGood);


        // Update the "Shipments" textarea in the "Goods List" form
        updateShipmentsTextarea();

        console.log(goodsList)

        // Clear the form after adding a good
        document.getElementById('add_good').reset();
    }

    // Function to update the "Shipments" textarea
    function updateShipmentsTextarea() {
        const shipmentsTextarea = document.getElementById('goodsListTextarea');

        // Clear the current content
        shipmentsTextarea.value = '';


        // Populate the textarea with the goods list
        goodsList.forEach((good, index) => {
            shipmentsTextarea.value += `Name: ${good.goodsName}\n`;
        });
    }

    // Attach the addGood function to the "Add Good" form submission
    document.getElementById('add_good').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting in the traditional way
        addGood();
    });




    // Function to fetch users from the API and populate the select element
    async function populateUserOptions() {
        try {
            const response = await fetch('http://localhost:8080/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const users = await response.json();
            const userSelect = document.getElementById('userSelect');

            // Clear existing options
            userSelect.innerHTML = '';

            // Add new options
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.userID; // Assuming the user object has an "id" property
                option.textContent = user.fullName; // Assuming the user object has a "name" property
                userSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    }

    // Call the function to populate options when the page loads
    window.addEventListener('load', populateUserOptions);


    async function createShipment() {
        try {
            const createShipmentForm = document.getElementById('create_shipment');
            const userID = createShipmentForm.elements['selectedUser'].value;
            const goods = goodsList;
            const receivedAddress = createShipmentForm.elements['userReceivedAddress'].value;
    
            const response = await fetch(`http://localhost:8080/staff/createRequest/${userID}?receivedAddress=${receivedAddress}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(goods), // Parse the goodsList textarea value to JSON
            });
    
            if (!response.ok) {
                throw new Error('Failed to create shipment');
            }
    
            // Optionally, handle success or redirect to a new page
            alert('Shipment created successfully!');
            goodsList = [];
            setTimeout(function() {
                window.location.href = "staff_all_request.html"; 
            }, 100);
        } catch (error) {
            console.error('Error creating shipment:', error.message);
        }
    }
    
    // Attach the createShipment function to the "Create Shipments" form submission
    document.getElementById('create_shipment').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting in the traditional way
        createShipment();
    });