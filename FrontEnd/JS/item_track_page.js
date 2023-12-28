document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.querySelector('input[name="id"]');

    inputField.addEventListener('focus', function () {
        setTimeout(function () {
            inputField.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }, 100);
    });
});

function redirectToLoginPage() {
    window.location.href = "login.html"
}

function redirectToHomePage() {
    window.location.href = "user_page.html"
}

function redirectToHelpPage() {
    window.location.href = "help_and_support.html"
}

function redirectToProfilePage() {
    window.location.href = "user_detail.html"
}

async function trackShipment() {
    const shipmentId = document.getElementById('shipmentIdInput').value;
    const userID = localStorage.getItem('userID');
    const loginParam = userID ? true : false;

    try {
        const response = await fetch(`http://localhost:8080/user/shipments/find/${shipmentId}?login=${loginParam}`);

        if (response.ok) {
            const shipmentData = await response.json();
            console.log(shipmentData)

            // Update the HTML with the retrieved shipment data
            document.getElementById('trackingNumber').innerText = shipmentData.shipmentID;
            document.getElementById('trackingStatus').innerText = shipmentData.shipmentStatusType;
            document.getElementById('deliveryAddress').innerText = shipmentData.userReceivedAddress;

            // Update the Goods list
            const goodsListElement = document.getElementById('goodsList');
            goodsListElement.innerHTML = ''; // Clear existing content

            shipmentData.goods.forEach(good => {
                const goodElement = document.createElement('div');
                goodElement.classList.add('goods_item');
                goodElement.innerHTML = `
                        <p><strong>Name:</strong> ${good.goodsName}</p>
                    `;
                goodsListElement.appendChild(goodElement);
            });
        } else {
            console.error('Failed to fetch shipment data:', response.statusText);
        }
    } catch (error) {
        console.error('Error during trackShipment:', error);
    }
}

function getTrackingStatusIcon(status) {
    // Add logic to map status to the corresponding icon URL
    // For example, you can return different icons based on the status
    return status === 'Pending' ? 'https://img.icons8.com/ios/50/connection-status-off.png' : '...';
}

function redirectToHelpPage() {
    // Add logic to redirect to the help page
    window.location.href("help_and_support.html")
}

// Function to fetch user data after the page loads
async function fetchUserData() {
    const userID = localStorage.getItem('userID');

    try {
        if (userID) {
            // If userID is present, fetch user data
            const response = await fetch(`http://localhost:8080/user/get/${userID}`);
            if (response.ok) {
                const userData = await response.json();
                // Update the HTML with the user data
                document.getElementById('usernamePlaceholder').innerText = userData.fullName;
            } else {
                console.error('Failed to fetch user data:', response.statusText);
            }
        } else {
            // If userID is not present, redirect to the login page
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Error during fetchUserData:', error);
    }
}

function handleUsernameClick() {
    const userID = localStorage.getItem('userID');

    if (userID) {
        // Redirect to user_detail page
        window.location.replace('user_detail.html');
    } else {
        // Redirect to login page
        window.location.href = 'login.html';
    }
}

// Call the function when the page loads
window.onload = function () {
    fetchUserData();

    // Add click event to the usernamePlaceholder
    const usernamePlaceholder = document.getElementById('usernamePlaceholder');
    usernamePlaceholder.addEventListener('click', handleUsernameClick);
};