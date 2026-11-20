# 🏦 Banking Application

A simple and interactive **Bank Account Management System** developed using HTML, CSS, Bootstrap, and JavaScript. This application allows users to manage bank accounts, perform deposits and withdrawals, and maintain transaction history using Browser Local Storage.

## 🚀 Features

### 1. Dashboard
- Display total number of bank accounts.
- Display total number of transactions.

### 2. Create Account
- Create new bank accounts.
- Enter customer name, email, and phone number.
- Select account type (Savings or Current).
- Automatically generate unique customer ID and account number.
- Set an initial deposit.

### 3. Search and Filter Accounts
- Search accounts by name, account number, email, and phone number.
- Filter accounts by account type and status.
- Filter accounts based on minimum and maximum balance.
- Reset filters.

### 4. Deposit Money
- Search accounts using account number.
- Deposit money into an account.
- Display updated account balance.
- Store deposit transactions.

### 5. Withdraw Money
- Search accounts using account number.
- Check available account balance.
- Prevent withdrawals when the balance is insufficient.
- Prevent withdrawals from inactive accounts.
- Display updated account balance.

### 6. Transaction History
- Store every successful deposit and withdrawal.
- Generate unique transaction IDs.
- Display account number, transaction type, amount, date, and balance after each transaction.
- Filter transactions by Deposit and Withdrawal.

### 7. Edit Account
- Search accounts using account number.
- Update customer name, email, phone number, account type, and status.
- Save updated account details.

### 8. Delete Account
- Verify account number and registered phone number.
- Allow deletion only when the account balance is ₹0.
- Ask for confirmation before deleting an account.
- Update account records after deletion.

## 🛠️ Technologies Used

- **HTML5** – Structure of the application.
- **CSS3** – Styling and layout.
- **Bootstrap 5** – Responsive user interface.
- **JavaScript (ES6)** – Application logic and functionality.
- **Local Storage** – Store account details and transaction history in the browser.

## 📂 Project Structure

```text
Banking_Application/
│
├── index.html
├── style.css
├── accounts.js
├── data.js
└── README.md
```

## ⚙️ How to Run the Project

1. Clone this repository:

   ```bash
   git clone https://github.com/maneeshkondraju/Banking_Application.git
   ```

2. Open the project folder in Visual Studio Code.

3. Open `index.html` using the Live Server extension.

4. Start managing bank accounts through the application.

## 💾 Data Storage

This project uses Browser Local Storage to maintain:

- Bank account information.
- Updated account balances.
- Deposit transactions.
- Withdrawal transactions.

Data remains available in the same browser storage after refreshing the page.

**Note:** This is a frontend learning project. It does not use a backend server or database.

## 👨‍💻 Author

**Maneesh Kondraju**

- GitHub: [maneeshkondraju](https://github.com/maneeshkondraju)

---

⭐ If you find this project useful, feel free to explore the repository!
