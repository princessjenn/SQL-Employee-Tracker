
const mysql = require('mysql2/promise');
const inquirer = require('inquirer');

const { viewAllEmployees, addEmployee, updateEmployeeRole } = require('./lib/employee');
const { viewAllDepartments, addDepartment } = require('./lib/department');
const { viewAllRoles, addRole } = require('./lib/role');

const pool = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'employees_db',
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, //max idle connections, the default val is the same as 'connectionLimit'
        idleTimeout: 60000, //idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0

      });

      const userActions = {
        'View all departments': () => viewAllDepartments,
        'View all roles': () => viewAllRoles,
        'View all employees': () => viewAllEmployees,
        'Add a department': () => addDepartment,
        'Add a role': () => addRole,
        'Add an employee': () => addEmployee,
        'Update an employee role': () => updateEmployeeRole,
        'Quit': () => quit
      };

      async function start() {
        //function to await on user input:
        const answer = await inquirer.prompt({
          name: 'action',
          type: 'list',
          message: 'Welcome to your Employee Database Tracker. What would you like to view?',
          choices: [...Object.keys(userActions) , 'Quit'],
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
module.exports = { start }


start ();


