function addExpense() {
    let name = document.getElementById('expenseName').value;
    let amount = document.getElementById('expenseAmount').value;
    let category = document.getElementById('expenseCategory').value;
    let date = document.getElementById('expenseDate').value;

    if (name && amount && category && date) {
        let list = document.getElementById('expenseList');
        let li = document.createElement('li');
        li.innerHTML = `${name} - ${amount} บาท (${category}) <small>${date}</small>`;
        list.appendChild(li);

        document.getElementById('expenseName').value = '';
        document.getElementById('expenseAmount').value = '';
        document.getElementById('expenseCategory').value = 'อาหาร';
        document.getElementById('expenseDate').value = '';
    } else {
        alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
    }
}
