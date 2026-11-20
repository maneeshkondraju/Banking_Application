
import { accounts } from './data.js';


// Load saved accounts from localStorage

let savedAccounts = localStorage.getItem("accounts");

if (savedAccounts) {
    accounts.splice(
        0,
        accounts.length,
        ...JSON.parse(savedAccounts)
    );
}


// Load saved transactions from localStorage
let savedTransactions = localStorage.getItem("transactions");

let transactions = savedTransactions
    ? JSON.parse(savedTransactions)
    : [];


// Generate unique transaction ID
function generateTransactionId() {

    let ids = transactions.map(transaction =>
        transaction.transactionId
    );

    let nextId = ids.length > 0
        ? Math.max(...ids) + 1
        : 1;

    while (transactions.some(transaction =>
        transaction.transactionId === nextId
    )) {
        nextId++;
    }

    return nextId;
}


// Add and save a transaction
function addTransaction(accountNumber, type, amount, balanceAfter) {

    let newTransaction = {
        transactionId: generateTransactionId(),
        accountNumber: accountNumber,
        type: type,
        amount: amount,
        date: new Date().toISOString(),
        balanceAfter: balanceAfter
    };

    transactions.push(newTransaction);

    // Save transactions in localStorage
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    // Update total transactions count
document.getElementById("totalTransactions").innerText =
    transactions.length;

    

    // Refresh transaction history
    displayTransactions();
}


// Display transactions
function displayTransactions(transactionList = transactions) {

    let tableBody = document.getElementById("transactionTableBody");
    let noTransactions = document.getElementById("noTransactions");

    tableBody.innerHTML = "";

    if (transactionList.length === 0) {
        noTransactions.style.display = "block";
        return;
    }

    noTransactions.style.display = "none";

    transactionList.forEach(transaction => {

        let row = document.createElement("tr");

        let values = [
            transaction.transactionId,
            transaction.accountNumber,
            transaction.type,
            "₹" + transaction.amount.toLocaleString("en-IN"),
            new Date(transaction.date).toLocaleDateString("en-IN"),
            "₹" + transaction.balanceAfter.toLocaleString("en-IN")
        ];

        values.forEach(value => {
            let cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        tableBody.appendChild(row);

    });
}


// Filter transactions
document.getElementById("filterTransaction")
    .addEventListener("change", function () {

        let selectedType = this.value;

        let filteredTransactions;

        if (selectedType === "All") {
            filteredTransactions = transactions;
        } else {
            filteredTransactions = transactions.filter(transaction =>
                transaction.type === selectedType
            );
        }

        displayTransactions(filteredTransactions);

    });

// Display transactions when page loads
displayTransactions();



// Display total transactions count
document.getElementById("totalTransactions").innerText =
    transactions.length;








function generateCustomerId() {

    let ids = accounts.map(account => account.id);

    let nextId = Math.max(...ids) + 1;

    while (accounts.some(account => account.id === nextId)) {
        nextId++;
    }

    return nextId;
}

function generateAccountNumber() {

    let numbers = accounts.map(account => {
        return Number(account.accountNumber.replace("BA", ""));
    });

    let nextNumber = numbers.length > 0
        ? Math.max(...numbers) + 1
        : 1001;

    let accountNumber;

    do {
        accountNumber = "BA" + nextNumber;
        nextNumber++;
    } while (
        accounts.some(account =>
            account.accountNumber === accountNumber
        )
    );

    return accountNumber;
}





function createAccount(name, email, phone, type, deposit) {

    let newAccount = {

        id: generateCustomerId(),

        accountNumber: generateAccountNumber(),

        name: name,

        email: email,

        phone: phone,

        accountType: type,

        balance: deposit,

        status: "Active"

    };

    // Add new account to array
    accounts.push(newAccount);

    // Save updated accounts in LocalStorage
    localStorage.setItem("accounts", JSON.stringify(accounts));

    return newAccount;
}



// Display Bank Accounts


function displayAccounts(accountList) {

    let accountTable = document.getElementById("accountTable");

    accountTable.innerHTML = "";

    accountList.forEach((account, index) => {

        let row = document.createElement("tr");

        let values = [
            account.id,
            account.accountNumber,
            account.name,
            account.email,
            account.phone,
            account.accountType,
            "₹" + account.balance.toLocaleString("en-IN")
        ];

        values.forEach(value => {

            let td = document.createElement("td");

            td.textContent = value;

            row.appendChild(td);

        });

        let statusCell = document.createElement("td");

        let statusBadge = document.createElement("span");

        statusBadge.className =
            "status " + account.status.toLowerCase();

        statusBadge.textContent = account.status;

        statusCell.appendChild(statusBadge);

        row.appendChild(statusCell);

        accountTable.appendChild(row);

    });

}



// Search and Filter Function

function filterAccounts() {

    // Get input values

    let name = document.getElementById("searchName").value.toLowerCase();

    let accountNumber = document.getElementById("searchAccount").value.toLowerCase().trim();

    let email = document.getElementById("searchEmail").value.toLowerCase().trim();

    let phone = document.getElementById("searchPhone").value.trim();

    let accountType = document.getElementById("filterType").value;

    let status = document.getElementById("filterStatus").value;

    let minBalance = document.getElementById("minBalance").value;

    let maxBalance = document.getElementById("maxBalance").value;


    // Apply filters

    let filteredAccounts = accounts.filter((account) => {

        return (

            account.name.toLowerCase().includes(name) &&

            account.accountNumber.toLowerCase().includes(accountNumber) &&

            account.email.toLowerCase().includes(email) &&

            account.phone.includes(phone) &&

            (accountType === "" || account.accountType === accountType) &&

            (status === "" || account.status === status) &&

            (minBalance === "" || account.balance >= Number(minBalance)) &&

            (maxBalance === "" || account.balance <= Number(maxBalance))

        );

    });


    // Display filtered accounts

    displayAccounts(filteredAccounts);

}


// Add Event Listeners

document.getElementById("searchName")
    .addEventListener("input", filterAccounts);

document.getElementById("searchAccount")
    .addEventListener("input", filterAccounts);

document.getElementById("searchEmail")
    .addEventListener("input", filterAccounts);

document.getElementById("searchPhone")
    .addEventListener("input", filterAccounts);

document.getElementById("filterType")
    .addEventListener("change", filterAccounts);

document.getElementById("filterStatus")
    .addEventListener("change", filterAccounts);

document.getElementById("minBalance")
    .addEventListener("input", filterAccounts);

document.getElementById("maxBalance")
    .addEventListener("input", filterAccounts);


// Reset Filters

document.getElementById("resetFilters")
    .addEventListener("click", function () {

        document.getElementById("searchName").value = "";
        document.getElementById("searchAccount").value = "";
        document.getElementById("searchEmail").value = "";
        document.getElementById("searchPhone").value = "";

        document.getElementById("filterType").value = "";
        document.getElementById("filterStatus").value = "";

        document.getElementById("minBalance").value = "";
        document.getElementById("maxBalance").value = "";

        displayAccounts(accounts);

    });


// Total Account Count

document.getElementById("totalAccounts").innerText = accounts.length;


// Initial Display

displayAccounts(accounts);


// Module 3: Create Account Form

let accountForm = document.getElementById("accountForm");

accountForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get form values

    let name = document.getElementById("holderName").value.trim();

    let email = document.getElementById("holderEmail").value.trim();

    let phone = document.getElementById("holderPhone").value.trim();

    let type = document.getElementById("newAccountType").value;

    let deposit = Number(
        document.getElementById("initialDeposit").value
    );


    // Validate deposit

    if (!Number.isFinite(deposit) || deposit < 0) {

        alert("Please enter a valid initial deposit.");

        return;

    }


    // Create new account

    let newAccount = createAccount(
        name,
        email,
        phone,
        type,
        deposit
    );


    // Update total account count

    document.getElementById("totalAccounts").innerText =
        accounts.length;


    // Refresh account table

    filterAccounts();


    // Clear form

    accountForm.reset();


    // Success message

    // alert(
    //     "Account Created Successfully!\n" +
    //     "Account Number: " + newAccount.accountNumber
    // );

});

//deposit money

let depositAccount = null;

document.getElementById("searchDepositAccount")
    .addEventListener("click", function () {

        let accountNumber = document
            .getElementById("depositAccountNumber")
            .value.trim();

        let details = document.getElementById("depositAccountDetails");
        let message = document.getElementById("depositMessage");

        // Reset previous search
        depositAccount = null;
        details.innerHTML = "";
        message.innerHTML = "";

        if (accountNumber === "") {
            details.textContent = "Please enter an account number.";
            return;
        }

        depositAccount = accounts.find(account =>
            account.accountNumber.toLowerCase() ===
            accountNumber.toLowerCase()
        );

        if (depositAccount) {

            details.innerHTML = `
                <div class="alert ">
                    
                    <p>Customer Name: ${depositAccount.name}</p>
                    <p>Account Number: ${depositAccount.accountNumber}</p>
                    <p>Current Balance: ₹${depositAccount.balance.toLocaleString("en-IN")}</p>
                </div>
            `;

        } else {

            details.innerHTML = `
                <div class="alert alert-danger">
                    Account not found!
                </div>
            `;
        }
    });


document.getElementById("depositForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        let amount = Number(
            document.getElementById("depositAmount").value
        );

        let message = document.getElementById("depositMessage");

        // Check account

        if (!depositAccount) {
            alert("Please search for a valid account first.");
            return;
        }

        // Validate amount

        if (!Number.isFinite(amount) || amount <= 0) {

            message.innerHTML = `
                <div class="alert alert-danger">
                    Please enter a valid deposit amount.
                </div>
            `;

            return;
        }

        // Update balance

        let oldBalance = depositAccount.balance;

        depositAccount.balance += amount;

        let newBalance = depositAccount.balance;

        addTransaction(
            depositAccount.accountNumber,
            "Deposit",
            amount,
            newBalance
        );

        // Save updated accounts

        localStorage.setItem(
            "accounts",
            JSON.stringify(accounts)
        );

        // Refresh account table

        filterAccounts();

        // Display success message

        message.innerHTML = `
            <div class="alert alert-success">
                <h5>Deposit Successful!</h5>

                <p>Previous Balance: ₹${oldBalance.toLocaleString("en-IN")}</p>

                <p>Deposited Amount: +₹${amount.toLocaleString("en-IN")}</p>

                <h5>Updated Balance: ₹${newBalance.toLocaleString("en-IN")}</h5>
            </div>
        `;

        // Update account details

        document.getElementById("depositAccountDetails").innerHTML = `
            <div class="alert alert-info">
                <h5>Account Details</h5>
                <p>Customer Name: ${depositAccount.name}</p>
                <p>Account Number: ${depositAccount.accountNumber}</p>
                <p>Current Balance: ₹${newBalance.toLocaleString("en-IN")}</p>
            </div>
        `;

        // Clear amount field

        document.getElementById("depositAmount").value = "";

    });


// Module 5 - Withdraw Money

let withdrawAccount = null;

// Search account
document.getElementById("searchWithdrawAccount")
    .addEventListener("click", function () {

        let accountNumber = document
            .getElementById("withdrawAccountNumber")
            .value.trim();

        withdrawAccount = accounts.find(account =>
            account.accountNumber.toLowerCase() ===
            accountNumber.toLowerCase()
        );

        let details = document.getElementById("withdrawAccountDetails");

        let message = document.getElementById("withdrawMessage");

        message.innerHTML = "";

        if (withdrawAccount) {

            details.innerHTML = `
                <div class="alert ">
                    <p>Customer Name: ${withdrawAccount.name}</p>
                    <p>Account Number: ${withdrawAccount.accountNumber}</p>
                    <p>Account Status: ${withdrawAccount.status}</p>
                    <p>Available Balance: ₹${withdrawAccount.balance.toLocaleString("en-IN")}</p>
                </div>
            `;

        } else {

            details.innerHTML = `
                <div class="alert alert-danger">
                    Account not found!
                </div>
            `;

        }

    });


// Withdraw Money
document.getElementById("withdrawForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        let amount = Number(
            document.getElementById("withdrawAmount").value
        );

        let message = document.getElementById("withdrawMessage");

        // Check account selection
        if (!withdrawAccount) {
            message.innerHTML = `
                <div class="alert alert-danger">
                    Please search for a valid account first.
                </div>
            `;
            return;
        }

        // Check account status
        if (withdrawAccount.status !== "Active") {
            message.innerHTML = `
                <div class="alert alert-danger">
                    Withdrawal is not allowed from an inactive account.
                </div>
            `;
            return;
        }

        // Validate withdrawal amount
        if (!Number.isFinite(amount) || amount <= 0) {
            message.innerHTML = `
                <div class="alert alert-danger">
                    Please enter a valid withdrawal amount.
                </div>
            `;
            return;
        }

        // Check available balance
        if (amount > withdrawAccount.balance) {
            message.innerHTML = `
                <div class="alert alert-danger">
                    Insufficient balance!
                    Available Balance: ₹${withdrawAccount.balance.toLocaleString("en-IN")}
                </div>
            `;
            return;
        }

        // Update balance
        let oldBalance = withdrawAccount.balance;

        withdrawAccount.balance -= amount;

        let newBalance = withdrawAccount.balance;

        addTransaction(
            withdrawAccount.accountNumber,
            "Withdrawal",
            amount,
            newBalance
        );

        // Save updated accounts to localStorage
        localStorage.setItem(
            "accounts",
            JSON.stringify(accounts)
        );

        // Refresh account table
        filterAccounts();

        // Display success message
        message.innerHTML = `
            <div class="alert alert-success">
                <h5>Withdrawal Successful!</h5>
                <p>Previous Balance: ₹${oldBalance.toLocaleString("en-IN")}</p>
                <p>Withdrawn Amount: -₹${amount.toLocaleString("en-IN")}</p>
                <h5>Updated Balance: ₹${newBalance.toLocaleString("en-IN")}</h5>
            </div>
        `;

        // Update account details
        document.getElementById("withdrawAccountDetails").innerHTML = `
            <div class="alert alert-info">
                <h5>Account Details</h5>
                <p>Customer Name: ${withdrawAccount.name}</p>
                <p>Account Number: ${withdrawAccount.accountNumber}</p>
                <p>Available Balance: ₹${newBalance.toLocaleString("en-IN")}</p>
            </div>
        `;

        // Clear withdrawal amount
        document.getElementById("withdrawAmount").value = "";

    });




// Module 7 - Edit Account

let editAccount = null;

// Search account
document.getElementById("searchEditAccount")
    .addEventListener("click", function () {

        let accountNumber = document
            .getElementById("editAccountNumber")
            .value.trim();

        let details = document.getElementById("editAccountDetails");
        let message = document.getElementById("editAccountMessage");

        message.innerHTML = "";
        details.style.display = "none";

        // Search account
        editAccount = accounts.find(account =>
            account.accountNumber.toLowerCase() ===
            accountNumber.toLowerCase()
        );

        if (editAccount) {

            // Display existing account details
            document.getElementById("editName").value =
                editAccount.name;

            document.getElementById("editEmail").value =
                editAccount.email;

            document.getElementById("editPhone").value =
                editAccount.phone;

            document.getElementById("editAccountType").value =
                editAccount.accountType;

            document.getElementById("editStatus").value =
                editAccount.status;

            details.style.display = "block";

        } else {

            editAccount = null;

            message.innerHTML = `
                <div class="alert alert-danger">
                    Account not found!
                </div>
            `;

        }

    });

// Update Account
document.getElementById("editAccountForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        let message = document.getElementById("editAccountMessage");

        // Check whether an account was searched
        if (!editAccount) {
            message.innerHTML = `
                <div class="alert alert-danger">
                    Please search for a valid account first.
                </div>
            `;
            return;
        }

        // Get updated values
        let name = document.getElementById("editName").value.trim();
        let email = document.getElementById("editEmail").value.trim();
        let phone = document.getElementById("editPhone").value.trim();
        let type = document.getElementById("editAccountType").value;
        let status = document.getElementById("editStatus").value;

        // Validate empty fields
        if (!name || !email || !phone) {
            message.innerHTML = `
                <div class="alert alert-danger">
                    Please fill in all required fields.
                </div>
            `;
            return;
        }

        // Update existing account
        editAccount.name = name;
        editAccount.email = email;
        editAccount.phone = phone;
        editAccount.accountType = type;
        editAccount.status = status;

        // Save updated accounts to localStorage
        localStorage.setItem(
            "accounts",
            JSON.stringify(accounts)
        );

        // Refresh account table
        filterAccounts();

        // Display success message
        message.innerHTML = `
            <div class="alert alert-success">
                Account updated successfully!
            </div>
        `;

    });


// Module 8 - Delete Account

let accountToDelete = null;

// Search and verify account
document.getElementById("searchDeleteAccount")
    .addEventListener("click", function () {

        let accountNumber = document
            .getElementById("deleteAccountNumber")
            .value.trim();

        let phone = document
            .getElementById("deletePhone")
            .value.trim();

        let details = document.getElementById("deleteAccountDetails");
        let message = document.getElementById("deleteAccountMessage");
        let deleteButton = document.getElementById("deleteAccountBtn");

        // Reset previous search result
        accountToDelete = null;
        details.innerHTML = "";
        message.innerHTML = "";
        deleteButton.style.display = "none";

        // Validate inputs
        if (!accountNumber || !phone) {
            message.innerHTML = `
                <div class="alert alert-danger">
                    Please enter both account number and phone number.
                </div>
            `;
            return;
        }

        // Find account using account number
        let foundAccount = accounts.find(account =>
            account.accountNumber.toLowerCase() ===
            accountNumber.toLowerCase()
        );

        // Check account existence
        if (!foundAccount) {
            message.innerHTML = `
                <div class="alert alert-danger">
                    Account not found!
                </div>
            `;
            return;
        }

        // Verify registered phone number
        if (String(foundAccount.phone).trim() !== phone) {
            message.innerHTML = `
                <div class="alert alert-danger">
                    Incorrect phone number. Account verification failed!
                </div>
            `;
            return;
        }

        // Display verified account details
        accountToDelete = foundAccount;

        details.innerHTML = `
            <div class="alert alert-info">
                <h5>Account Verified Successfully!</h5>
                <p>Customer Name: ${foundAccount.name}</p>
                <p>Account Number: ${foundAccount.accountNumber}</p>
                <p>Phone Number: ${foundAccount.phone}</p>
                <p>Account Type: ${foundAccount.accountType}</p>
                <p>Available Balance: ₹${Number(foundAccount.balance).toLocaleString("en-IN")}</p>
            </div>
        `;

        // Check balance
        if (Number(foundAccount.balance) !== 0) {
            message.innerHTML = `
                <div class="alert alert-danger">
                    Please withdraw your available balance before deleting your account.
                </div>
            `;
            accountToDelete = null;
            return;
        }

        // Allow deletion only when balance is zero
        deleteButton.style.display = "inline-block";

    });


// Delete Account
document.getElementById("deleteAccountBtn")
    .addEventListener("click", function () {

        let message = document.getElementById("deleteAccountMessage");
        let details = document.getElementById("deleteAccountDetails");
        let deleteButton = document.getElementById("deleteAccountBtn");

        // Check whether an account was verified
        if (!accountToDelete) {
            message.innerHTML = `
                <div class="alert alert-danger">
                    Please verify an account first.
                </div>
            `;
            return;
        }

        // Check whether account still exists
        let accountIndex = accounts.findIndex(account =>
            account.accountNumber === accountToDelete.accountNumber
        );

        if (accountIndex === -1) {
            message.innerHTML = `
                <div class="alert alert-danger">
                    Account not found!
                </div>
            `;
            deleteButton.style.display = "none";
            return;
        }

        // Check balance again before deletion
        if (Number(accounts[accountIndex].balance) !== 0) {
            message.innerHTML = `
                <div class="alert alert-danger">
                    Please withdraw your available balance before deleting your account.
                </div>
            `;
            deleteButton.style.display = "none";
            accountToDelete = null;
            return;
        }

        // Final confirmation
        let confirmDelete = confirm(
            "Are you sure you want to delete this bank account?"
        );

        if (!confirmDelete) {
            return;
        }

        // Remove account from existing array
        accounts.splice(accountIndex, 1);

        // Update localStorage
        localStorage.setItem(
            "accounts",
            JSON.stringify(accounts)
        );

        // Update total account count
        document.getElementById("totalAccounts").innerText =
            accounts.length;

        // Refresh account table
        filterAccounts();

        // Display success message
        message.innerHTML = `
            <div class="alert alert-success">
                Account deleted successfully!
            </div>
        `;

        // Clear previous account details
        details.innerHTML = "";

        // Hide delete button
        deleteButton.style.display = "none";

        // Reset account selection
        accountToDelete = null;

        // Clear input fields
        document.getElementById("deleteAccountNumber").value = "";
        document.getElementById("deletePhone").value = "";

    });










