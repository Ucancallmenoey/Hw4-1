document.getElementById("expense-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    if (!title || !amount || !date) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
    }

    const expense = { id: Date.now(), title, amount, category, date };
    saveExpense(expense);
    renderExpenses();
    this.reset();
});

function saveExpense(expense) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function renderExpenses() {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const list = document.getElementById("expense-list");
    list.innerHTML = "";
    expenses.forEach(exp => {
        const li = document.createElement("li");
        li.className = "p-2 bg-gray-200 rounded flex justify-between";
        li.innerHTML = `${exp.title} - ${exp.amount} บาท (${exp.category}) <small>${exp.date}</small>`;
        list.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", renderExpenses);
