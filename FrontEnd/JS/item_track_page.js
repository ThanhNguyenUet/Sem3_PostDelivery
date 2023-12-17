document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.querySelector('input[name="id"]');

    inputField.addEventListener('focus', function () {
        setTimeout(function () {
            inputField.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }, 100);
    });
});

function redirect() {
    window.location.href = "login.html"
}