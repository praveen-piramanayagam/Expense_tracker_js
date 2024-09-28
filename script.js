const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const transactionList = document.getElementById('transaction-list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = [];

// Add Transaction
function addTransaction(e) {
    e.preventDefault();

    const transactionType = document.querySelector('input[name="transactionType"]:checked').value;
    let amountValue = +amount.value;

        // Set amountValue to negative for expenses
    if (transactionType === 'expense') {
        amountValue = -Math.abs(amountValue); // Make the amount negative for expense
    } else {
        amountValue = Math.abs(amountValue);  // Keep the amount positive for income
    }
    
    // Push new transaction into transactions array
    transactions.push({
        id: generateID(),
        text: text.value,
        amount: amountValue
    });

    init();  // Reinitialize the app to update everything
    form.reset();  // Clears the form fields
}

// Generate Random ID
function generateID() {
    return Math.floor(Math.random() * 1000);
}

// Add Transaction to DOM
function addTransactionDOM(transaction) {
    const item = document.createElement('li'); // Create a list item for the transaction
    
    // Set the class and inner HTML based on transaction amount
    if (transaction.amount < 0) {
        item.classList.add('minus');  // Add 'minus' class for expenses
    } else {
        item.classList.add('plus');   // Add 'plus' class for income
    }


    let sign;
    if (transaction.amount < 0) {
        sign = '-';
    } else {
        sign = '+';
    }
    
    item.innerHTML = `${transaction.text} <span>${sign}₹${Math.abs(transaction.amount).toFixed(2)}</span>`;
    
    // Create Edit and Delete buttons
    const editButton = document.createElement('button');
    editButton.classList.add('ed_btn');
    editButton.innerText = 'Edit';
    editButton.onclick = () => editTransaction(transaction.id); // Set up edit action

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('ed_btn');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = () => removeTransaction(transaction.id); // Set up delete action

    // Append buttons to the item and the item to the transaction list
    item.appendChild(editButton);
    item.appendChild(deleteButton);
    transactionList.appendChild(item);
}

// Update Income, Expense, and Balance
function updateValues() {
    let total = 0, income = 0, expense = 0;

    // Loop through transactions to calculate total, income, and expenses
    transactions.forEach(transaction => {
        total += transaction.amount;  
        if (transaction.amount > 0) {
            income += transaction.amount; 
        } else {
            expense += Math.abs(transaction.amount); // Use absolute value for display
        }
    });

    // Update balance, income, and expense elements
    balanceEl.innerText = `₹${total.toFixed(2)}`;
    incomeEl.innerText = `₹${income.toFixed(2)}`;
    expenseEl.innerText = `₹${expense.toFixed(2)}`;
}

// Edit Transaction
function editTransaction(id) {
    // Find the transaction by its ID
    const transaction = transactions.find(t => t.id === id);
    
    // Fill the form with the transaction details
    text.value = transaction.text; // Set the description
    amount.value = Math.abs(transaction.amount); // Set the amount (always positive)

    // Remove the transaction from the list
    transactions = transactions.filter(t => t.id !== id);

    // Update the display
    init(); 
}


// Delete Transaction
    let removeTransaction = (id) =>{
        let val = confirm("Are you sure to delete!!!");
        if(val){
            transactions = transactions.filter(transaction => transaction.id !== id);
            init();
            return true;
        }
        else{
            return false;
        }
    }
    


// Initialize App
function init() {
    transactionList.innerHTML = '';  
    transactions.forEach(addTransactionDOM); // Use forEach for cleaner iteration
    updateValues();  
}

init();  

form.addEventListener('submit', addTransaction);

// Filter Transactions
function filterTransactions(type) {
    transactionList.innerHTML = '';  // Clear the current list

    transactions.forEach(transaction => {
        const isIncome = transaction.amount > 0;
        const isExpense = transaction.amount < 0;

        // Check if we should show the transaction based on type
        if (type === 'all' || (type === 'income' && isIncome) || (type === 'expense' && isExpense)) {
            addTransactionDOM(transaction);  // Add the transaction to the display
        }
    });
}


