import PocketBase from './pocketbase.es.mjs'


const url = 'https://demo-kh.pockethost.io/'
const client = new PocketBase(url)

// console.log(client)
// const authData = await client.admins.authWithPassword('codingspacekh@gmail.com', 'adminkh2024')
// console.log(authData)

async function getAllExpenses() {
  const records = await client.collection('expense').getFullList()
  console.log(records)
}





getAllExpenses()
