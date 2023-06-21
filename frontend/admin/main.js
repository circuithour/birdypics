import './style.css';

const form = document.getElementById("loginform");
const submitButton = document.getElementById("loginbutton");

document.getElementById('backbutton').addEventListener('click', () => location.href = '/')

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form, submitButton);

    let username = formData.get('username');
    let password = formData.get('password');

    const loginFetch = await fetch('/adminlogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    const loginResponse = await loginFetch.json();
    console.log(loginResponse);

    if (!loginResponse.success) {
        // login failed :(
        alert(`You are not ${username}, bitch!!!`)
        return;
    }

    // login ok :)
    alert(`You are now logged in as ${username}`)
});