function logOut() {
    // Remove leaderID from localStorage
    localStorage.removeItem('staffID');

    // Redirect to the login page
    window.location.href = '../User/login.html';
}

async function fetchStaffData() {
    const staffID = localStorage.getItem('staffID');

    try {
        if (staffID) {
            // If userID is present, fetch user data
            const response = await fetch(`http://localhost:8080/staff/${staffID}`);
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
            window.location.href = '../User/login.html';
        }
    } catch (error) {
        console.error('Error during fetchUserData:', error);
    }
}

window.onload = fetchStaffData;