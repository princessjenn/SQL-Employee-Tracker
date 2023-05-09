
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


//function to view all of the employees in the database:
async function viewAllEmployees() {
    const [rows] = await pool.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id');

    console.table(rows);
}

// function to add a new employee to your database using inquirer.prompt:
async function addEmployee() {
    const [roles] = await pool.query('SELECT * FROM role');

    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'What is the first name of the new employee?'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'What is the last name of the new employee?'
        },
        {
            name: 'role_id',
            type: 'list',
            message: 'What is the role of the new employee?',
            choices: async () => {
                return roles.map(({ id, title }) => ({ value: id, name: title }))
            }
        },
        {
            name: 'manager_id',
            type: 'list',
            message: 'Who is the manager of the new employee?',
            choices: async () => {
                const [managers] = await pool.query('SELECT * FROM employee');
                return managers.map(({ id, first_name, last_name }) => ({ value: id, name: `${first_name} ${last_name}` }));
            }
        }
    ]);

    await pool.query('INSERT INTO employee SET ?', {
        first_name,
        last_name,
        role_id,
        manager_id
    });

    console.log('Employee added successfully!');
    start();
}

// function to update an employee's role in your database using inquirer.prompt:

async function updateEmployeeRole() {
    const [employees] = await pool.query('SELECT * FROM employee');

    const { employee_id, role_id } = await inquirer.prompt([
        {
            name: 'employee_id',
            type: 'list',
            message: 'What is the name of the employee that you would like to update?',
            choices: async () => {
                return employees.map(({ id, first_name, last_name }) => ({ value: id, name: `${first_name} ${last_name}` }))
            }
        },
        {
            name: 'role_id',
            type: 'list',
            message: 'What is the new role for the employee that you are updating?',
            choices: async () => {
                const [roles] = await pool.query('SELECT * FROM role');
                return roles.map(({ id, title }) => ({ value: id, name: title }));
            }
        }
    ]);

    await pool.query('UPDATE employee SET role_id = ? WHERE id = ?', [role_id, employee_id]);

    console.log('This employee role has been updated into the Employee Database successfully!');
    start();
}

module.exports = { viewAllEmployees, addEmployee, updateEmployeeRole }