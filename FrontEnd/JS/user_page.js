var logout = document.getElementById("logout");
logout.addEventListener("click", function () {
    window.localStorage.clear();
    window.location.href = "login.html";
});

var homePage = document.getElementById("title");
homePage.addEventListener("click", function () {
    window.location.href = "user_page.html";
});

// Function to fetch user data after the page loads
async function fetchUserData() {
    const userID = localStorage.getItem('userID');

    try {
        if (userID) {
            // If userID is present, fetch user data and render the username
            const response = await fetch(`http://localhost:8080/user/get/${userID}`);
            if (response.ok) {
                const userData = await response.json();
                // Update the HTML with the username
                document.getElementById('usernamePlaceholder').innerText = userData.fullName;
                // Show the logout option
                document.getElementById('logout').style.display = 'inline';
            } else {
                console.error('Failed to fetch user data:', response.statusText);
            }
        } else {
            document.getElementById('logout').remove();
            // If userID is not present, render the login
            document.getElementById('login').innerHTML = '<i class="fa fa-user"><span id="usernamePlaceholder">  Login</span></i>';
        }
    } catch (error) {
        console.error('Error during fetchUserData:', error);
    }
}

// Function to handle logout
function logout() {
    // Remove userID from localStorage
    localStorage.removeItem('userID');
    // Redirect to the login page (you can replace 'login.html' with your actual login page)
    window.location.href = 'login.html';
}


// Function to handle usernamePlaceholder click
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

document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.querySelector('input[name="id"]');

    inputField.addEventListener('focus', function () {
        setTimeout(function () {
            inputField.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }, 300);
    });
});

//Slider
var imgs = document.querySelectorAll('.slider img');
var dots = document.querySelectorAll('.dot');
var currentImg = 0; // index of the first image 
const interval = 3000; // duration(speed) of the slide

function changeSlide(n) {
    for (var i = 0; i < imgs.length; i++) { // reset
        imgs[i].style.opacity = 0;
        dots[i].className = dots[i].className.replace(' active', '');
    }

    currentImg = (currentImg + 1) % imgs.length; // update the index number

    if (n != undefined) {
        clearInterval(timer);
        timer = setInterval(changeSlide, interval);
        currentImg = n;
    }

    imgs[currentImg].style.opacity = 1;
    dots[currentImg].className += ' active';
}

var timer = setInterval(changeSlide, interval);


