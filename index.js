import PocketBase from './pocketbase.es.mjs'

const url = 'https://demo-kh.pockethost.io/'
const client = new PocketBase(url)

let expenseData = []
let expenseType = []

async function getAllExpenses() {
  const records = await client.collection('expense').getFullList()
  // console.log(records)
  return records
}

async function getOneExpense(id) {
  const record = await client.collection('expense').getOne(id)
  return record
}

async function deleteOneExpense(id) {
  const response = await client.collection('expense').delete(id)
  return true
}

function updateExpense(id) {
  console.log(id)
}

function deleteExpense() {
  const deleteBtns = document.querySelectorAll("#deleteBtn")
  // console.log(deleteBtns)
  for (let i = 0; i < deleteBtns.length; i++) {
    let currentDeleteBtn = deleteBtns[i]
    currentDeleteBtn.addEventListener("click", async () => {
      // const record = await getOneExpense(currentDeleteBtn.dataset.recordid)
      // console.log(record)
      await deleteOneExpense(currentDeleteBtn.dataset.recordid)
      displayAllExpenses()
    })
  }
}

function addNewExpenseForm() {
  const form = document.querySelector("#createExpense")
  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const expenseDate = document.querySelector("#date").value
    const expenseName = document.querySelector("#name").value
    const expenseAmount = parseFloat(document.querySelector("#amount").value)
    const expenseCategory = document.querySelector("#category").value

    console.log(expenseDate, expenseName, expenseAmount, expenseCategory)
    const data = {
      "Date": expenseDate,
      "Name": expenseName,
      "Amount": expenseAmount,
      "Category": expenseCategory
    }

    const record = await client.collection('expense').create(data)
    console.log("new expense is added")

    document.querySelector("#date").value = ``
    document.querySelector("#name").value = ``
    document.querySelector("#amount").value = ``
    document.querySelector("#category").value = ``


    displayAllExpenses()


  })

}

async function displayAllExpenses() {
  const expenses = await getAllExpenses()
  const wrapper = document.querySelector(".wrapper")
  wrapper.innerHTML = ``
  for (let i = 0; i < expenses.length; i++) {
    let currentExpense = expenses[i]
    console.log(currentExpense)
    wrapper.innerHTML += `
    <div class="expenseItem">
      <p>${new Date(currentExpense.Date).toLocaleDateString()}</p>
      <h4>${currentExpense.Name}</h4>
      <p>$${currentExpense.Amount}</p>
      <p id="tag">${currentExpense.Category}</p>
      <div class="btnGroup">
        <button class="btn" id="editBtn" >Edit</button>
        <button class="btn" id="deleteBtn" data-recordid="${currentExpense.id}">Delete</button>
      </div>
    </div>
    `
  }

  deleteExpense()

}


window.addEventListener("DOMContentLoaded", async () => {

  addNewExpenseForm()
  displayAllExpenses()

})