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
    process.exit();
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


const updateCustomer = async () => {
  const customerId = prompt('Enter the customer\s id you want to update (copy-paste the id): ');
  const customerName = prompt('What is cutomer\s new name: ');
  const customerAge = prompt('What is customer\s new age: ');
  const updateCustomerData = await Customer.findByIdAndUpdate(customerId, {
      name: customerName,
      age: customerAge,
  }, { new: true })
  console.log(updateCustomerData);
}

const deleteCustomer = async () => {
  const getCustomerId =  prompt('Enter the customer\s id you want to delete (copy-paste the id): ');
  const deleteCustomerData = await Customer.findById(getCustomerId);
  await deleteCustomerData.deleteOne();
  console.log('Deleted'); 
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
  deleteCustomer();
  
} else if (choice === '5') {
  console.log("Goodbye!");
} else {
  console.log("Invalid choice. Please choose a valid option.");
}

