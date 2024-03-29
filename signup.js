$(document).ready(function () {
    $("#signup-form").on("submit", function (event) {
        // This function runs when the signup form is submitted
        event.preventDefault();
        let email = $("#email").val();
        let password = $("#password").val();

        // Retrieve user information from local storage and parse it as JSON, or initialize an empty object if no data exists
        let userinfo = JSON.parse(localStorage.getItem("userinfo")) || {};
        userinfo[email] = password;  // // Assign the password to the user information object with the email as the key

        // // Store the updated user information back to local storage after converting it to a JSON string
        localStorage.setItem("userinfo", JSON.stringify(userinfo));

        window.location.replace("index.html");
    });
});
