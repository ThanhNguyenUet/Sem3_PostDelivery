// Function to fetch user data after the page loads
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
                document.getElementById('location').innerHTML = leaderData.locationName != null ? leaderData.locationName : "Transaction1";
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

var dataLineLeader = [];
    async function fetchParcelsDataForLeader() {

        const id = localStorage.getItem('leaderID');
        console.log(id)

        const response = await fetch(`http://localhost:8080/leader/shipments/month/2023/${id}`);
        if (response.ok) {
            const parcelData = await response.json();
            console.log(parcelData);
            dataLineLeader = Object.values(parcelData);
            console.log(dataLineLeader);

            // Initialize the chart after fetching the data
            initializeChart();
        } else {
            console.error('Failed to fetch user data:', response.statusText);
        }
    }

    // Single Line Chart
    function initializeChart() {
        var ctx3 = $("#line-chart-1").get(0).getContext("2d");
        var myChart3 = new Chart(ctx3, {
            type: "line",
            data: {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                datasets: [{
                    label: "Parcel",
                    fill: false,
                    backgroundColor: "rgba(0, 156, 255, .3)",
                    data: dataLineLeader
                }]
            },
            options: {
                responsive: true
            }
        });
    }

    async function getStaffCounts() {
        const id = localStorage.getItem('leaderID');
        const response = await fetch(`http://localhost:8080/leader/staffs/count/${id}`);
        if (response.ok) {
            const staffData = await response.json();
            lead1.innerText = staffData;
        } else {
            console.error('Failed to fetch user data:', response.statusText);
        }
    }

    async function getParcelCounts() {
        const id = localStorage.getItem('leaderID');
        const response1 = await fetch(`http://localhost:8080/leader/parcelsSent/${id}`);
        const response2 = await fetch(`http://localhost:8080/leader/parcelsReceived/${id}`)
        if (response1.ok && response2.ok) {
            const parcelSent = await response1.json();
            const parcelReceived = await response2.json();
            var count = parcelSent.length + parcelReceived.length;
            lead2.innerText = count;
        } else {
            console.error('Failed to fetch user data:', response1.statusText);
        }
    }

// Call the function when the page loads
window.onload = function() {
    fetchLeaderData();
    fetchParcelsDataForLeader();
    getStaffCounts();
    getParcelCounts()
}

function logOut() {
    // Remove leaderID from localStorage
    localStorage.removeItem('leaderID');

    // Redirect to the login page
    window.location.href = '../User/login.html';
}