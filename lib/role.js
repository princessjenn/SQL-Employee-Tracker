
const inquirer = require('inquirer');
const { start } = require('../index');
const mysql = require('mysql2');

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

//function to view all of the employee roles in the database:
async function viewAllRoles() {
    const [rows] = await pool.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id');

    console.table(rows);
    start();
}
//function to add a role to a department in your database using inquirer.prompt:
async function addRole() {
    const [departments] = await pool.query('SELECT * FROM department');

    const userAnswers = await inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the title of the role you are adding into the Employee Database?'
        },
        {
            name: 'salary',
            type: 'number',
            message: 'What is the employee salary of this new role you are adding?'
        },
        {
            name: 'department_id',
            type: 'list',
            message: 'Which department does this new role belong to?',
            choices: departments.map(department => ({ name: department.name, value: department.id }))
        }

    ]);

    await pool.query('INSERT INTO role SET ?', {
        title: userAnswers.title,
        salary: userAnswers.salary,
        department_id: userAnswers.department_id
    });

    console.log('New role has been added to the Employee Database successfully!');
    start();
}

module.exports = { viewAllRoles, addRole }