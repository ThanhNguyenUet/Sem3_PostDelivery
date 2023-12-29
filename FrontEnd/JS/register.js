async function performRegister()  {
    const email = document.getElementsByName("email")[0].value;
    const password = document.getElementsByName("password")[0].value;
    const phoneNumber = document.getElementsByName("phoneNumber")[0].value;
    const address = document.getElementsByName("address")[0].value;
    const fullName = document.getElementsByName("fullName")[0].value;


    const user = {
      fullName : fullName,

      email : email,

      phoneNumber : phoneNumber,

      password :  password,

      address : address

    };

    try {
        const response = await fetch('http://localhost:8080/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
          alert('Registration successful!');
            window.location.href = "login.html"; 
        } else {
          const errorData = await response.json();
            console.error('Registration failed:', errorData);
            alert('Registration failed. Please try again.');
        }
    } catch (error) {
          console.error('Error during registration:', error);
          alert('Registration failed. Please try again.');
    }
  }