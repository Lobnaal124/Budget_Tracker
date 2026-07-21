// ===============================
// Get Elements
// ===============================
const loginForm = document.getElementById("login");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// Error Messages
const usernameError = document.getElementById("usernameError");
const passError = document.getElementById("passError");

// ===============================
// Login Event
// ===============================
loginForm.addEventListener("submit", loginUser);

// ===============================
// Live Validation
// ===============================
usernameInput.addEventListener("input", function () {

    validateUsername(usernameInput.value.trim());

});

passwordInput.addEventListener("input", function () {

    validatePassword(passwordInput.value.trim());

});

// ===============================
// Login Function
// ===============================
async function loginUser(event) {

    event.preventDefault();

    // Get Input Values
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Validation
    if (!validateUsername(username)) return;

    if (!validatePassword(password)) return;

    try {

        // Send Data To Flask
        const response = await fetch("/api/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username,
                password
            })

        });

        // Get Response
        const data = await response.json();

        // Login Success
        if (data.success) {

            localStorage.setItem("username", data.username);

            window.location.href = "/dashboard";

        }

        // Login Failed
        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Something went wrong.");

    }

}

// ===============================
// Username Validation
// ===============================
function validateUsername(username) {

    usernameInput.classList.remove("is-valid", "is-invalid");

    usernameError.classList.remove("text-success", "text-danger");

    usernameError.textContent = "";

    if (username === "") {

        usernameInput.classList.add("is-invalid");

        usernameError.classList.add("text-danger");

        usernameError.textContent =
            "✖ Username is required.";

        return false;

    }

    if (username.length < 3) {

        usernameInput.classList.add("is-invalid");

        usernameError.classList.add("text-danger");

        usernameError.textContent =
            "✖ Username must be at least 3 characters.";

        return false;

    }

    usernameInput.classList.add("is-valid");

    usernameError.classList.add("text-success");

    usernameError.textContent =
        "✔ Username looks good.";

    return true;

}

// ===============================
// Password Validation
// ===============================
function validatePassword(password) {

    passwordInput.classList.remove("is-valid", "is-invalid");

    passError.classList.remove("text-success", "text-danger");

    passError.textContent = "";

    const passPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (password === "") {

        passwordInput.classList.add("is-invalid");

        passError.classList.add("text-danger");

        passError.textContent =
            "✖ Password is required.";

        return false;

    }

    if (!passPattern.test(password)) {

        passwordInput.classList.add("is-invalid");

        passError.classList.add("text-danger");

        passError.textContent =
            "✖ Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number.";

        return false;

    }

    passwordInput.classList.add("is-valid");

    passError.classList.add("text-success");

    passError.textContent =
        "✔ Strong password.";

    return true;

}