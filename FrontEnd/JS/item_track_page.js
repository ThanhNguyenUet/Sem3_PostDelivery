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

function redirectToHelpPage() {
    window.location.href = "help_and_support.html"
}