
import inquirer from 'inquirer';
const { start } = require('../index');
const mysql = require('mysql2/promise');

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

//function to view all of the departments in the database:
async function viewAllDepartments() {
    try {
      const [rows] = await pool.query('SELECT * FROM department');
      console.table(rows);
      return rows; // Return the result of the query
    } catch (err) {
      console.error(err);
      start();
    }
  }
  

//function to add a department to your database using inquirer.prompt:
async function addDepartment() {
    return new Promise(async (resolve, reject) => {
      try {
        const userAnswer = await inquirer.prompt({
          name: 'name',
          type: 'input',
          message: 'What is the name of the department you are adding to the Employee Database?'
        });
  
        await pool.query('INSERT INTO department SET ?', { name: userAnswer.name });
  
        console.log('New department has been added to the Employee Database successfully!');
        resolve(); // Resolve the promise
      } catch (error) {
        reject(error); // Reject the promise with the error
      }
    });
  }
  

module.exports = { viewAllDepartments, addDepartment }