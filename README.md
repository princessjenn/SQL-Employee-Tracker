# SQL Employee Tracker

## Description

Repository Link:
(https://github.com/princessjenn/SQL-Employee-Tracker.git)

Demo Walkthrough Video Link:
()

This application will help a business owner user to view, manage, and organize their businesses' departments, roles, and employees in their company via a command-line application

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)



## Installation

To begin, we need to make sure we have Node.js and MySQL installed on our machine.

`mkdir SQL-Employee-Tracker`

`cd SQL-Employee-Tracker`

`npm init`

Next, we must install the necessary modules. 

`npm install inquirer`

`npm install mysql2`

This will install the Inquirer and mysql2 modules. The mysql2 module is a MySQL driver for Node.js that we will use to connect to our database!

Now we're ready to start coding!

## Usage

You can quickly and easily create a README file by using this command-line application to generate one. This allows a project creator to devote more time to working on the project!

1. In VS Code, open the integrated terminal associated with your .mjs file
2. Assuming you have the programs and dependencies described above in the 'Installation' section, simply type ```node index.mjs``` into CLI to start running the generator.
3. You will be presented with prompts that wait on the user's input, in which the user will type their answer into the command line, and then press enter to present the next prompt.
4. Once the program ends and the user has entered all of their inputs on the command line based upon the given prompts, the README.md file will be generated in your explorer on VS Code!


## License [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the terms of the MIT license.


## Contributing

To contribute to the project: 

1. start by forking the repository and creating a new branch specifically for your new feature or bug fix.
2. It's important to adhere to the project's coding standards and properly format your code.
3. When committing changes, be sure to write clear and concise messages that describe the changes made.
4. If your contribution affects the user interface or experience, include screenshots or animated GIFs in your pull request to help reviewers understand the changes. 
5. Additionally, make sure your code has been tested and all existing tests pass before submitting a pull request.
6. Finally, please provide a detailed description of your changes and explain why they're necessary !

Thanks so much for contributing! 



## Tests

 
![SQL Test](.png)

## Questions

Ask me on Github: (https://https://github.com/princessjenn)

Email Me for more questions: j.eckenrode@me.com