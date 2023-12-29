
let currentStaffID;
document.addEventListener("DOMContentLoaded", function () {
    checkAndLoadStaffData();
});

async function checkAndLoadStaffData() {
    const leaderID = localStorage.getItem('leaderID');

    if (leaderID) {
        fetchStaffData(leaderID);
    }
}

async function fetchStaffData(leaderID) {
    try {
        const response = await fetch(`http://localhost:8080/leader/staffs/${leaderID}`);
        if (response.ok) {
            const staffData = await response.json();
            populateStaffTable(staffData);
        } else {
            console.error('Failed to fetch staff data');
        }
    } catch (error) {
        console.error('Error fetching staff data:', error);
    }
}

function populateStaffTable(staffData) {
    const tableBody = document.querySelector('#staff tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    staffData.forEach(staff => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${staff.staffID}</td>
            <td>${staff.fullName}</td>
            <td>${staff.address}</td>
            <td>${staff.phoneNumber}</td>
            <td>${staff.email}</td>
            <td><a href = "#"><i class="fas fa-edit" onclick="editStaff(${staff.staffID})"></i></a></td>
            <td><i class="fas fa-trash-alt" onclick="deleteStaff(${staff.staffID})"></i></td>
        `;
    });
}

async function deleteStaff(staffID) {
    const isConfirmed = confirm('Are you sure you want to delete this staff member?');

    if (isConfirmed) {
        try {
            const response = await fetch(`http://localhost:8080/leader/staff/${staffID}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Delete Success');
                setTimeout(function() {
                    window.location.href = 'leader-staff.html';
                }, 100);
            } else {
                console.log('Error deleting staff:', response.statusText);
                alert('Error deleting staff. Please try again.');
            }
        } catch (error) {
            console.error('Error during staff deletion:', error);
            alert('Error deleting staff. Please try again.');
        }
    } else {
        // User clicked "Cancel" in the confirmation dialog
        alert('Deletion canceled.');
    }
}



async function editStaff(staffID) {
    try {
        const response = await fetch(`http://localhost:8080/staff/${staffID}`);
        if (response.ok) {
            const staffData = await response.json();
            console.log(staffData)
            populateEditForm(staffData); // Populate the edit form
            showEditForm(); // Display the edit form
            currentStaffID = staffID;
        } else {
            console.log('Error fetching staff details:', response.statusText);
            alert('Error fetching staff details. Please try again.');
        }
    } catch (error) {
        console.error('Error during staff details fetching:', error);
        alert('Error fetching staff details. Please try again.');
    }
}

// Function to populate edit form with staff details
function populateEditForm(staffData) {
    document.getElementById('fullNameEdit').value = staffData.fullName;
    document.getElementById('emailEdit').value = staffData.email;
    document.getElementById('phoneNumberEdit').value = staffData.phoneNumber;
    document.getElementById('addressEdit').value = staffData.address;
}

// Function to display the edit form
function showEditForm() {
    const editForm = document.getElementById('editStaffForm');
    editForm.style.display = 'block';
}


async function updateStaff() {
    // Use the currentStaffID variable to get the staff ID for updating
    if (currentStaffID) {
        const formData = {
            fullName: document.getElementById('fullNameEdit').value,
            email: document.getElementById('emailEdit').value,
            phoneNumber: document.getElementById('phoneNumberEdit').value,
            address: document.getElementById('addressEdit').value,
        };

        try {
            const response = await fetch(`http://localhost:8080/staff/${currentStaffID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Update successful!');
                setTimeout(function() {
                    window.location.href = "leader-staff.html"; 
                }, 100);
            } else {
                const errorData = await response.json();
                console.log('Update failed:', errorData);
                alert('Update failed. Please try again.');
            }
        } catch (error) {
            console.log('Error during update:', error);
            alert('Update failed. Please try again.');
        }
    } else {
        alert('Invalid staff ID for update.');
    }
}









function toggleEditForm() {
    const editForm = document.getElementById('editStaffForm');
    editForm.style.display = editForm.style.display === "none" ? "block" : "none";
}
function toggleAddForm() {
    const addForm = document.getElementById("addStaffForm");
    addForm.style.display = addForm.style.display === "none" ? "block" : "none";
}

function toggleMinusForm() {
    document.getElementById("addStaffForm").style.display = "none";
}

// Function to add staff (called on form submission)
async function addStaff() {
    const leaderID = localStorage.getItem('leaderID');
    console.log(leaderID);
    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        password: document.getElementById('password').value,
        address: document.getElementById('address').value,
    };
    console.log(formData);

    try {
        const response = await fetch('http://localhost:8080/leader/createstaff/' + leaderID, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Add successful!');
            setTimeout(function() {
                window.location.href = "leader-staff.html"; 
            }, 100);
        } else {
            const errorData = await response.json();
            console.log('Registration failed:', errorData);
            alert('Registration failed. Please try again.');
        }
    } catch (error) {
          console.log('Error during registration:', error);
          alert('Registration failed. Please try again.');
    }
}

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

window.onload = fetchLeaderData;