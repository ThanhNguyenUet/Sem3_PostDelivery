function redirectToProfilePage() {
    window.location.href ="user_detail.html";
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
                document.getElementById('userFullname').innerText = userData.fullName;
                document.getElementById('userAddress').innerText = userData.address;
                document.getElementById('userPhoneNumber').innerText = userData.phoneNumber;
                document.getElementById('userEmail').innerText = userData.email;
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

// Call the function when the page loads
window.onload = fetchUserData;