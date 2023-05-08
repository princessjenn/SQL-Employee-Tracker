import mysql from "mysql2";
import inquirer from "inquirer";

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
        'View all departments': viewAllDepartments,
        'View all roles': viewAllRoles,
        'View all employees': viewAllEmployees,
        'Add a department': addDepartment,
        'Add a role': addRole,
        'Add an employee': addEmployee,
        'Update an employee role': updateEmployeeRole,
        'Quit': quit
      };

      async function start() {
        //function to await on user input:
        const answer = await inquirer.prompt({
          name: 'action',
          type: 'list',
          message: 'Welcome to your Employee Database Tracker. What would you like to view?',
          choices: Object.keys(userActions)
        });

        //calling the function based on the user's input:
        await actions[answer.action]();

        start();
      }

      //function to view all of the departments in the database:
      async function viewAllDepartments() {
        const [rows] = await pool.query('SELECT * FROM department');
      
        console.table(rows);
      }

      //function to view all of the employee roles in the database:
      async function viewAllRoles() {
        const [rows] = await pool.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id');

        console.table(rows);
      }
      //function to view all of the employees in the database:
      async function viewAllEmployees() {
        const [rows] = await pool.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id');

        console.table(rows);
      }

      //function to add a department to your database using inquirer.prompt:
      async function addDepartment() {
        const userAnswer = await inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'What is the name of the department you are adding to the Employee Database?'
      });

      await pool.query('INSERT INTO department SET ?', { name: userAnswer.name });

      console.log('New department has been added to the Employee Database successfully!');
    }


      // function to add a role to a department in your database using inquirer.prompt:
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
            choices: roles.map(({ id, title }) => ({ value: id, name: title }))
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
            choices: employees.map(({ id, first_name, last_name }) => ({ value: id, name: `${first_name} ${last_name}` }))
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

      // start the application
      start();








      const promisePool = pool.promise();
        const [rows, fields] = await promisePool.query('SELECT * FROM department WHERE `name` = ? AND `age` > ?', ['Morty', 14]);

        console.log(rows)