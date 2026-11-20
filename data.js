 let defaultAccounts = [

     {
        id: 101,
        accountNumber: "BA1001",
        name: "Arun Kumar",
        email: "arun@gmail.com",
        phone: "9876543210",
        accountType: "Savings",
        balance: 25000,
        status: "Active"
    },

    {
        id: 102,
        accountNumber: "BA1002",
        name: "Priya Sharma",
        email: "priya@gmail.com",
        phone: "9876543211",
        accountType: "Current",
        balance: 45000,
        status: "Active"
    },

    {
        id: 103,
        accountNumber: "BA1003",
        name: "Rahul Raj",
        email: "rahul@gmail.com",
        phone: "9876543212",
        accountType: "Savings",
        balance: 32500,
        status: "Active"
    },

    {
        id: 104,
        accountNumber: "BA1004",
        name: "Divya S",
        email: "divya@gmail.com",
        phone: "9876543213",
        accountType: "Current",
        balance: 18750,
        status: "Inactive"
    },

    {
        id: 105,
        accountNumber: "BA1005",
        name: "Karthik M",
        email: "karthik@gmail.com",
        phone: "9876543214",
        accountType: "Savings",
        balance: 40000,
        status: "Active"
    },

    {
        id: 106,
        accountNumber: "BA1006",
        name: "Sneha R",
        email: "sneha@gmail.com",
        phone: "9876543215",
        accountType: "Current",
        balance: 52000,
        status: "Active"
    },

    {
        id: 107,
        accountNumber: "BA1007",
        name: "Vijay Kumar",
        email: "vijay@gmail.com",
        phone: "9876543216",
        accountType: "Savings",
        balance: 22000,
        status: "Inactive"
    },

    {
        id: 108,
        accountNumber: "BA1008",
        name: "Meena P",
        email: "meena@gmail.com",
        phone: "9876543217",
        accountType: "Current",
        balance: 36500,
        status: "Active"
    },

    {
        id: 109,
        accountNumber: "BA1009",
        name: "Ajay Kumar",
        email: "ajay@gmail.com",
        phone: "9876543218",
        accountType: "Savings",
        balance: 28000,
        status: "Active"
    },

    {
        id: 110,
        accountNumber: "BA1010",
        name: "Nithya S",
        email: "nithya@gmail.com",
        phone: "9876543219",
        accountType: "Current",
        balance: 47500,
        status: "Inactive"
    }

    // Continue the remaining accounts here...

];

// Get accounts from LocalStorage
let savedAccounts = localStorage.getItem("accounts");

// Use saved accounts if available, otherwise use default accounts
export let accounts = savedAccounts
    ? JSON.parse(savedAccounts)
    : defaultAccounts;

// Save default accounts for the first time
if (!savedAccounts) {
    localStorage.setItem("accounts", JSON.stringify(accounts));
}
