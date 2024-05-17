// Массив для хранения транзакций
let transactions = [];

// Идентификатор для следующей транзакции
let nextId = 1;

/**
 * Функция для добавления транзакции
 * @param {Object} transaction Объект транзакции
 */
function addTransaction(transaction) {
    transactions.push(transaction);
    displayTransaction(transaction);
    calculateTotal();
}

/**
 * Функция для отображения транзакции в таблице
 * @param {Object} transaction Объект транзакции
 */
function displayTransaction(transaction) {
    const tableBody = document.getElementById('transactions-table').querySelector('tbody');
    const row = document.createElement('tr');
    row.setAttribute('data-id', transaction.id);
    row.className = transaction.amount > 0 ? 'green' : 'red';

    row.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.description.split(' ').slice(0, 4).join(' ')}...</td>
        <td><button onclick="deleteTransaction(${transaction.id})">Удалить</button></td>
    `;

    row.addEventListener('click', () => {
        displayTransactionDetails(transaction);
    });

    tableBody.appendChild(row);
}

/**
 * Функция для удаления транзакции
 * @param {number} id Идентификатор транзакции
 */
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    const row = document.querySelector(`[data-id="${id}"]`);
    row.parentElement.removeChild(row);
    calculateTotal();
}

/**
 * Функция для подсчета общей суммы транзакций
 */
function calculateTotal() {
    const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    document.getElementById('total-amount').innerText = totalAmount;
}

/**
 * Функция для отображения подробного описания транзакции
 * @param {Object} transaction Объект транзакции
 */
function displayTransactionDetails(transaction) {
    const details = document.getElementById('detailed-description');
    details.innerText = `ID: ${transaction.id}\nДата и Время: ${transaction.date}\nКатегория: ${transaction.category}\nОписание: ${transaction.description}\nСумма: ${transaction.amount}`;
}

// Обработчик для формы добавления транзакции
document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    const transaction = {
        id: nextId++,
        date: new Date().toLocaleString(),
        amount: amount,
        category: category,
        description: description
    };

    addTransaction(transaction);

    // Очистка формы
    this.reset();
});
