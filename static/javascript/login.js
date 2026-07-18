// const loginform = document.getElementById("login");

// loginform.addEventListener("submit", async function (e) {
//   e.preventDefault();

//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   const response = await fetch("/api/login", {
//     method: "POST",

//     headers: {
//       "Content-Type": "application/json",
//     },

//     body: JSON.stringify({
//       username,
//       password,
//     }),
//   });

//   const data = await response.json();

//   if (data.success) {
//     localStorage.setItem("username", data.username);

//     window.location.href = "/dashboard";
//   } else {
//     alert(data.message);
//   }
// });
// ===============================
// Get Elements
// ===============================
const loginForm = document.getElementById("login");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");


// ===============================
// Login Event
// ===============================
loginForm.addEventListener("submit", loginUser);


// ===============================
// Login Function
// ===============================
async function loginUser(event) {

    event.preventDefault();

    // Remove old validation
    clearValidation();

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
// Clear Validation
// ===============================
function clearValidation() {

    usernameInput.classList.remove("is-valid", "is-invalid");
    passwordInput.classList.remove("is-valid", "is-invalid");

    document.getElementById("usernameError").textContent = "";
    document.getElementById("passwordError").textContent = "";

}