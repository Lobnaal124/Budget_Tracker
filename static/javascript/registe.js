// ===============================
// Get Elements
// ===============================
const registerForm = document.getElementById("register");

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");

// Error Messages
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passError = document.getElementById("passError");
const confirmError = document.getElementById("confirmError");

// ===============================
// Events
// ===============================
registerForm.addEventListener("submit", registerUser);

usernameInput.addEventListener("input", () => {
    validateUsername(usernameInput.value.trim());
});

emailInput.addEventListener("input", () => {
    validateEmail(emailInput.value.trim());
});

passwordInput.addEventListener("input", () => {

    validatePassword(passwordInput.value.trim());

    validateConfirmPassword(
        passwordInput.value.trim(),
        confirmInput.value.trim()
    );

});

confirmInput.addEventListener("input", () => {

    validateConfirmPassword(
        passwordInput.value.trim(),
        confirmInput.value.trim()
    );

});

// ===============================
// Register Function
// ===============================
async function registerUser(event) {

    event.preventDefault();

    const username = usernameInput.value.trim();

    const email = emailInput.value.trim();

    const password = passwordInput.value.trim();

    const confirm = confirmInput.value.trim();

    const isValid =
        validateUsername(username) &&
        validateEmail(email) &&
        validatePassword(password) &&
        validateConfirmPassword(password, confirm);

    if (!isValid) return;

    try {

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

        if (data.success) {

            localStorage.setItem("username", username);

            window.location.href = "/dashboard";

        }

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

        usernameError.textContent = "✖ Username is required.";

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

    usernameError.textContent = "✔ Username looks good.";

    return true;

}
// ===============================
// Email Validation
// ===============================
function validateEmail(email) {

    emailInput.classList.remove("is-valid", "is-invalid");

    emailError.classList.remove("text-success", "text-danger");

    emailError.textContent = "";

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (email === "") {

        emailInput.classList.add("is-invalid");

        emailError.classList.add("text-danger");

        emailError.textContent = "✖ Email is required.";

        return false;

    }

    if (!emailPattern.test(email)) {

        emailInput.classList.add("is-invalid");

        emailError.classList.add("text-danger");

        emailError.textContent =
            "✖ Please enter a valid Gmail address.";

        return false;

    }

    emailInput.classList.add("is-valid");

    emailError.classList.add("text-success");

    emailError.textContent = "✔ Valid Gmail address.";

    return true;

}
// ===============================
// Password Validation
// ===============================
function validatePassword(password) {

    passwordInput.classList.remove("is-valid", "is-invalid");

    passError.classList.remove("text-success", "text-danger");

    passError.textContent = "";

    // Password:
    // At least 8 characters
    // One uppercase
    // One lowercase
    // One number
    const passPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (password === "") {

        passwordInput.classList.add("is-invalid");

        passError.classList.add("text-danger");

        passError.textContent = "✖ Password is required.";

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

    passError.textContent = "✔ Strong password.";

    return true;

}
// ===============================
// Confirm Password Validation
// ===============================
function validateConfirmPassword(password, confirm) {

    confirmInput.classList.remove("is-valid", "is-invalid");

    confirmError.classList.remove("text-success", "text-danger");

    confirmError.textContent = "";

    if (confirm === "") {

        confirmInput.classList.add("is-invalid");

        confirmError.classList.add("text-danger");

        confirmError.textContent =
            "✖ Please confirm your password.";

        return false;

    }

    if (password !== confirm) {

        confirmInput.classList.add("is-invalid");

        confirmError.classList.add("text-danger");

        confirmError.textContent =
            "✖ Passwords do not match.";

        return false;

    }

    confirmInput.classList.add("is-valid");

    confirmError.classList.add("text-success");

    confirmError.textContent =
        "✔ Passwords match.";

    return true;

}