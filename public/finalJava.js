document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('form').addEventListener('submit', handleFormSubmit);
});

function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
                           .map(checkbox => checkbox.value);

    // Log form data to the console (you can replace this with an AJAX request to send data to a server)
    console.log('Form submitted with the following data:');
    console.log(`First Name: ${firstName}`);
    console.log(`Last Name: ${lastName}`);
    console.log(`Email: ${email}`);
    console.log(`Interests: ${interests.join(', ')}`);

    // Optionally, clear the form after submission
    document.getElementById('form').reset();

    // Redirect to the success page
    window.location.href = 'newsletterSuccess.html';
}
