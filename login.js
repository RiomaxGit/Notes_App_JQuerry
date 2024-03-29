$(document).ready(function () {
    $("#login-form").on("submit", function (event) {
        event.preventDefault();

        // Get the values of email and password fields
        let email = $("#username").val();
        let password = $("#password").val();

        // Retrieve user information from local storage and parse it as JSON
        let userinfo = JSON.parse(localStorage.getItem("userinfo"));

        // Check if user information exists, and if the provided email and password matc
        if (userinfo && userinfo.hasOwnProperty(email) && userinfo[email] === password) {
            sessionStorage.setItem("username", email);
            window.location.replace("notes.html");
        } else {
            $("#error-message").text("Invalid Username or password").css("display", "block");
        }
    });
});
