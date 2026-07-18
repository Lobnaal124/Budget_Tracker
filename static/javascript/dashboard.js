// ===============================
// Get Elements
// ===============================
const usernameElement = document.getElementById("username");
const logoutBtn = document.querySelector(".logout-btn");

const transactionForm = document.getElementById("transaction-form");
const saveTransactionBtn = document.getElementById("saveTransaction");

const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const typeInput = document.getElementById("type");
const dateInput = document.getElementById("date");

const table = document.getElementById("transactions-table");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expense");

// ===============================
// Edit Mode
// ===============================
let editTransactionId = null;

// ===============================
// Start Dashboard
// ===============================
showUsername();

loadTransactions();

saveTransactionBtn.addEventListener("click", addTransaction);

logoutBtn.addEventListener("click", logout);



// ===============================
// Show Username
// ===============================
function showUsername() {

    const username = localStorage.getItem("username");

    if (!username) {

        window.location.href = "/login";

        return;
    }

    usernameElement.textContent = username;

}



// ===============================
// Logout
// ===============================
function logout() {

    localStorage.removeItem("username");

    window.location.href = "/";

}



// ===============================
// Add Transaction
// ===============================
async function addTransaction() {

    const title = titleInput.value.trim();
    const amount = amountInput.value.trim();
    const category = categoryInput.value;
    const type = typeInput.value;
    const date = dateInput.value;

    if (!validateTransaction(title, amount, date)) {

        return;

    }
    if (editTransactionId !== null) {

        updateTransaction();
    
        return;
    
    }

    try {

        const response = await fetch("/api/add_transaction", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                title,
                amount,
                category,
                type,
                date

            })

        });

        const data = await response.json();

        if (data.success) {

            transactionForm.reset();

            const modal = bootstrap.Modal.getOrCreateInstance(
                document.getElementById("transactionModal")
            );

            modal.hide();
            document.getElementById("saveTransaction").blur();
            loadTransactions();
            
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
// Load Transactions
// ===============================
async function loadTransactions() {

    try {

        const response = await fetch("/api/transactions");

        const data = await response.json();

        displayTransactions(data);

        updateSummary(data);

    }

    catch (error) {

        console.error(error);

    }

}



// ===============================
// Display Transactions
// ===============================
function displayTransactions(data) {

    table.innerHTML = "";

    if (data.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="5" class="text-center">

                    No transactions yet.

                </td>

            </tr>

        `;

        return;

    }

    data.forEach(transaction => {

        table.innerHTML += `

            <tr>

                <td>${transaction.title}</td>

                <td>${transaction.category}</td>

                <td>$${transaction.amount}</td>

                <td>${transaction.date}</td>

                <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editTransaction(${transaction.id})">
            
                    Edit
            
                </button>
            
                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteTransaction(${transaction.id})">
            
                    Delete
            
                </button>
            
            </td>
        `;

    });

}



// ===============================
// Update Summary
// ===============================
function updateSummary(data) {

    let income = 0;

    let expense = 0;

    data.forEach(transaction => {

        if (transaction.transaction_type === "Income") {

            income += Number(transaction.amount);

        }

        else {

            expense += Number(transaction.amount);

        }

    });

    incomeElement.textContent = `$${income}`;

    expenseElement.textContent = `$${expense}`;

    balanceElement.textContent = `$${income - expense}`;

}



// ===============================
// Validation
// ===============================
function validateTransaction(title, amount, date) {

    if (title === "") {

        alert("Please enter the transaction title.");

        return false;

    }

    if (amount === "" || Number(amount) <= 0) {

        alert("Please enter a valid amount.");

        return false;

    }

    if (date === "") {

        alert("Please choose a date.");

        return false;

    }

    return true;

}
// ===============================
// Delete Transaction
// ===============================

async function deleteTransaction(id) {

    if (!confirm("Are you sure you want to delete this transaction?")) {

        return;

    }

    const response = await fetch(`/api/delete_transaction/${id}`, {

        method: "DELETE"

    });

    const data = await response.json();

    if (data.success) {

        loadTransactions();

    }

    else {

        alert(data.message);

    }

}

// ===============================
// Edit Transaction
// ===============================
async function editTransaction(id) {

    const response = await fetch("/api/transactions");

    const transactions = await response.json();

    const transaction = transactions.find(item => item.id === id);

    if (!transaction) {

        alert("Transaction not found.");

        return;

    }

    // Fill Form
    titleInput.value = transaction.title;
    amountInput.value = transaction.amount;
    categoryInput.value = transaction.category;
    typeInput.value = transaction.transaction_type;
    dateInput.value = transaction.date;

    // Save ID
    editTransactionId = id;

    // Change Button Text
    saveTransactionBtn.textContent = "Update Transaction";

    // Open Modal
    const modal = new bootstrap.Modal(document.getElementById("transactionModal"));

    modal.show();
  
}

// ===============================
// Update Transaction
// ===============================
async function updateTransaction() {

    const transaction = {

        title: titleInput.value.trim(),
        amount: amountInput.value.trim(),
        category: categoryInput.value,
        type: typeInput.value,
        date: dateInput.value

    };

    try {

        const response = await fetch(`/api/update_transaction/${editTransactionId}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(transaction)

        });

        const data = await response.json();

        if (data.success) {

            // Reset Edit Mode
            editTransactionId = null;

            saveTransactionBtn.textContent = "Save Transaction";

            transactionForm.reset();

            // Close Modal
            const modal = bootstrap.Modal.getOrCreateInstance(
                document.getElementById("transactionModal")
            );

            modal.hide();
            document.querySelector(".add-btn").focus();
            // Reload Table
            loadTransactions();

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

// save transaction after edit
const transactionModal = document.getElementById("transactionModal");

transactionModal.addEventListener("hidden.bs.modal", function () {

    editTransactionId = null;

    transactionForm.reset();

    saveTransactionBtn.textContent = "Save Transaction";

});