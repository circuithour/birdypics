import './homepage.css'

document.getElementById('learnmorebutton').addEventListener('click', () => {
  var rectangle = document.createElement('div');
  rectangle.classList.add('rectangle', 'goofy-animation');
  rectangle.innerHTML = '<p>Chirp</p>';

  document.body.appendChild(rectangle);

  // Remove the rectangle after the animation completes
  setTimeout(function () {
    document.body.removeChild(rectangle);
  }, 4000);
})

function submitForm(event) {
  event.preventDefault();

  var form = document.getElementById('subscribeForm');
  var emailInput = document.getElementById('emailInput');
  var message = document.getElementById('message');

  var email = emailInput.value;

  if (email) {
    // Send email to the server
    fetch('/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          message.textContent = 'Email subscribed successfully!';
          message.style.color = 'green';
          form.reset();
        } else {
          if (data.error === 'already_subscribed') {
            message.textContent = 'The email is already subscribed.';
          } else {
            message.textContent = 'The email is already subscribed.';
          }
          message.style.color = 'red';
        }
      })
      .catch(error => {
        console.log(error);
        message.textContent = 'The email is already subscribed.';
        message.style.color = 'red';
      });
  } else {
    message.textContent = 'Please provide an email.';
    message.style.color = 'red';
  }
}


document.getElementById('subscribeForm').addEventListener('submit', submitForm);
