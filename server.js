const prompt = require('prompt-sync')({ sigint: true }); // DB connection
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
};
connect();
/*-------------------------------- Query Functions --------------------------------*/
const Customer = require('./model/customer.js');
// create
const createCustomer = async () => {
    const customerName = await prompt('What is your name? ');
    const customerAge = await prompt('What is your Age? ');
    const customerData = {
        name: customerName,
        age: customerAge,
    };
    const customer = await Customer.create(customerData);
    console.log("New customer:", customer);
};
// Read-Index - get all action
const getAllCustomers = async () => {
    const customers = await Customer.find();
    console.log('All customers', customers);
};
// updating a Customer
const updateCustomer = async () => {
    const customerId = await prompt('Enter the customer\'s id you want to update (copy-paste the id): ');
    const customerName = await prompt('What is customer\'s new name: ');
    const customerAge = await prompt('What is customer\'s new age: ');
    const updateCustomerData = await Customer.findByIdAndUpdate(customerId, {
        name: customerName,
        age: customerAge,
    }, {
        new: true
    });
    console.log(updateCustomerData);
};
// Deleting a customer
const deleteCustomer = async () => {
    const getCustomerId = await prompt('Enter the customer\'s id you want to delete (copy-paste the id): ');
    const deleteCustomerData = await Customer.findById(getCustomerId);
    await deleteCustomerData.deleteOne();
    console.log('Deleted');
};
async function main() {
const username = await prompt('Welcome to the CRM ');
console.log(`What would you like to do? ${username}`);
console.log(`1. Create customer`);
console.log(`2. View customer`);
console.log(`3. Update customer`);
console.log(`4. Delete customer`);
console.log(`5. Quit`);
while (true) {
  const choice = await prompt("Choose an action: ");
  if (choice === '1') {
      console.log("Create Customer selected");
      await createCustomer();
  } else if (choice === '2') {
      console.log("View Customers selected");
      await getAllCustomers();
  } else if (choice === '3') {
      console.log("Update Customer selected");
      await updateCustomer();
  } else if (choice === '4') {
      console.log("Delete Customer selected");
      await deleteCustomer();
  } else if (choice === '5') {
      console.log("Goodbye!");
      break;
  } else {
      console.log("Invalid choice. Please choose a valid option.");
  }
}
}
main();