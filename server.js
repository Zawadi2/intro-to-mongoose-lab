const prompt = require('prompt-sync')();


// DB connection

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    // await runQueries()
    // await mongoose.disconnect();
    // console.log('Disconnected from MongoDB');
    // process.exit();
};

// const runQueries = async () => {
// //   console.log('Queries running.')
//   await createCustomer()
//   await getAllCustomers()
//   // await getASingleCustomer()
// };

connect()
/*-------------------------------- Query Functions --------------------------------*/

const Customer = require('./model/customer.js')

// create

const createCustomer = async () => {
  const customerName = prompt('What is your name');
  const customerAge = prompt('What is your Age');
  const customerData = {
    name: customerName,
    age: customerAge,
  };
  
  const customer = await Customer.create(customerData);
  console.log("New customer:", customer);
};

// Read-Index - get all action

const getAllCustomers = async () => {
  const customers = await Customer.find()
  console.log('All customers', customers)
}

// // Read- show -get a single 
// const getASingleCustomer = async () => {
//   const id = '6690733702cb155ba8f0f296'
//   const customer = await Customer.findById(id)
//   console.log('Found todo', customer)
// }


const updateCustomer = async () => {
  const id = '658226acdcbecfe9b99d5421';
  const customerData = await Customer.findById(id);
  // if (customerData) {
    const newName = prompt("What is the customer's new name? ");
    const newAge = prompt("What is the customer's new age? ");
    const customer = await Customer.findByIdAndUpdate(id, { name: newName, age: newAge }, { new: true });
    console.log('Updated customer', customer);
  // } else {
    console.log('Customer not found');
  };

const removeCustomer = async () => {
  const id = '658226acdcbecfe9b99d5421'
  const customer = await customer.findById(id)
  // .remove is no longer in Mongoose
  // .deleteOne
  await customer.deleteOne()
}

const username = prompt('Welcome to the CRM ');

console.log(`What would you like to do? ${username}`);
console.log(`1.creat customer`);
console.log(`2. View customer`);
console.log(`3. Update customer`);
console.log(`4. Delete customer`);
console.log(`5. Quit`);

const choice = prompt("Choose an action:");
if (choice === '1') {
  console.log("Create Customer selected");
  createCustomer();

} else if (choice === '2') {
  console.log("View Customers selected");
  getAllCustomers();
  
} else if (choice === '3') {
  console.log("Update Customer selected");
  updateCustomer();
  
} else if (choice === '4') {
  console.log("Delete Customer selected");
  removeCustomer();
  
} else if (choice === '5') {
  console.log("Goodbye!");
} else {
  console.log("Invalid choice. Please choose a valid option.");
}

