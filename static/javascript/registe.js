// ===============================
// Get Elements
// ===============================
const registerForm = document.getElementById("register");

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");


// ===============================
// Register Event
// ===============================
registerForm.addEventListener("submit", registerUser);


// ===============================
// Register Function
// ===============================
async function registerUser(event) {

    event.preventDefault();

    clearValidation();

    // Get Input Values
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirm = confirmInput.value.trim();


    // Validation
    if (!validateUsername(username)) return;

    if (!validateEmail(email)) return;

    if (!validatePassword(password)) return;

    if (!validateConfirmPassword(password, confirm)) return;


    try {

        // Send Data To Flask
        const response = await fetch("/api/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username,
                email,
                password
            })

        });

        const data = await response.json();

        // Register Success
        if (data.success) {

            localStorage.setItem("username", data.username);

            window.location.href = "/dashboard";

        }

        // Register Failed
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

    if (username === "") {

        usernameInput.classList.add("is-invalid");

        document.getElementById("usernameError").textContent =
            "Username is required.";

        return false;

    }

    if (username.length < 3) {

        usernameInput.classList.add("is-invalid");

        document.getElementById("usernameError").textContent =
            "Username must be at least 3 characters.";

        return false;

    }

    usernameInput.classList.add("is-valid");

    return true;

}


// ===============================
// Email Validation
// ===============================
function validateEmail(email) {

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!emailPattern.test(email)) {

        emailInput.classList.add("is-invalid");

        document.getElementById("emailError").textContent =
            "Please enter a valid Gmail address.";

        return false;

    }

    emailInput.classList.add("is-valid");

    return true;

}


// ===============================
// Password Validation
// ===============================
function validatePassword(password) {

    if (password === "") {

        passwordInput.classList.add("is-invalid");

        document.getElementById("passwordError").textContent =
            "Password is required.";

        return false;

    }

    // Numbers Only
    if (!/^\d+$/.test(password)) {

        passwordInput.classList.add("is-invalid");

        document.getElementById("passwordError").textContent =
            "Password must contain numbers only.";

        return false;

    }

    passwordInput.classList.add("is-valid");

    return true;

}


// ===============================
// Confirm Password Validation
// ===============================
function validateConfirmPassword(password, confirm) {

    if (confirm === "") {

        confirmInput.classList.add("is-invalid");

        document.getElementById("confirmError").textContent =
            "Please confirm your password.";

        return false;

    }

    if (password !== confirm) {

        confirmInput.classList.add("is-invalid");

        document.getElementById("confirmError").textContent =
            "Passwords do not match.";

        return false;

    }

    confirmInput.classList.add("is-valid");

    return true;

}


// ===============================
// Clear Validation
// ===============================
function clearValidation() {

    usernameInput.classList.remove("is-valid", "is-invalid");
    emailInput.classList.remove("is-valid", "is-invalid");
    passwordInput.classList.remove("is-valid", "is-invalid");
    confirmInput.classList.remove("is-valid", "is-invalid");

    document.getElementById("usernameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("confirmError").textContent = "";

}