function redirectToHomePage() {
    window.location.href="user_page.html";
}

function redirectToProfilePage() {
    window.location.href="user_detail.html";
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

// Call the function when the page loads
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
}