
import inquirer from 'inquirer';
import { viewAllEmployees, addEmployee, updateEmployeeRole } from './lib/employee.js';
import { viewAllDepartments, addDepartment } from './lib/department.js';
import { viewAllRoles, addRole } from './lib/role.js';

const userActions = {
  'View all departments': () => viewAllDepartments(),
  'View all roles': () => viewAllRoles(),
  'View all employees': () => viewAllEmployees(),
  'Add a department': () => addDepartment(),
  'Add a role': () => addRole(),
  'Add an employee': () => addEmployee(),
  'Update an employee role': () => updateEmployeeRole(),
  'Quit': () => quit
};

async function start() {
  //function to await on user input:
  const answer = await inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'Welcome to your Employee Database Tracker. What would you like to view?',
    choices: [...Object.keys(userActions), 'Quit'],
  });

  if (answer.action === 'Quit') { // Check if user chose to exit
    return; // Return from function to exit program
  }
  //calling the function based on the user's input:
  await userActions[answer.action]();

  start();
}

async function quit() {
  console.log('Exiting program...Goodbye!');
  process.exit(0); // Exit the program with a status code of 0 (success)
}

//export modules
module.exports = { start, quit };


start();


