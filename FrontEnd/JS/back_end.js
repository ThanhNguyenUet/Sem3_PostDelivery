// Wrap your code in a function to ensure it runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton');

    // Add an event listener to the login button
    loginButton.addEventListener('click', function () {
        // Call the performLogin function when the button is clicked
        performLogin();
    });
});
        async function performLogin() {
            const email = document.getElementsByName("email")[0].value;
            const password = document.getElementsByName("password")[0].value;

            const loginData = {
                email: email,
                password: password
            };

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData),
                });

                if (response.ok) {
                    const userData = await response.json();
                    // Handle the successful login, e.g., redirect to a new page or display a success message
                    console.log('Login successful:', userData);
                } else {
                    // Handle the case where login failed
                    console.error('Login failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error during login:', error);
            }
        }
