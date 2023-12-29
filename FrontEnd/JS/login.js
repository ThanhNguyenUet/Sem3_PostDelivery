async function performLogin() {
    const email = document.getElementsByName("email")[0].value;
    const password = document.getElementsByName("password")[0].value;

    const loginData = {
        email: email,
        password: password
    };

    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            const userID = await response.json();
            localStorage.setItem('userID', userID);
            window.location.href = "user_page.html"; 
        } else {
            // Handle the case where login failed
            console.error('Login failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}
