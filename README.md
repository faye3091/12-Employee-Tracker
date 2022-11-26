# 12-Employee-Tracker

[![alt text](https://img.shields.io/static/v1?label=licence&message=MIT%20License&color=GREEN)](https://opensource.org/licenses/MIT)

## Description

A command-line application to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## Table of Contents

- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Questions](#questions)

## User Story

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```
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
```

## Installation

Clone the repository from Github. Run `npm i` then to view the database from run `mysql -u root -p`. Enter the user's mysql password. then run `npm start`

## Usage

This application will allow users to view, add, and edit employees, roles, departments, and managers.

View walkthrough video via [Screencastify](https://drive.google.com/file/d/1iVKPr92X8VZeA3TbSzy6jy2jxgAi8X0J/view)

## Contributing

Contributors should read the installation section.

## License

<br />[MIT License](https://opensource.org/licenses/MIT)<br />A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.

## Questions

Github Profile: [faye3091](https://github.com/faye3091)
<br />
Reach me with additional questions at faye_3091@yahoo.com
