// Dependencies
const connection = require("./config/connection");
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const validate = require("./javascript/validate");

connection.connect((error) => {
  if (error) throw error;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

afterConnection = () => {
  //Use chalk and figlet to display heading
  console.log(
    chalk.yellow.bold(
      `===========================================================================`
    )
  );
  console.log(``);
  console.log(chalk.greenBright(figlet.textSync("Employee Tracker")));
  console.log(``);
  console.log(
    `                       ` +
      chalk.whiteBright.bgBlue.bold("Created By: Vanessa Villaluz")
  );
  console.log(``);
  console.log(
    chalk.yellow.bold(
      `===========================================================================`
    )
  );
  promptUser();
};

//Prompt user for Choices
const promptUser = () => {
  inquirer
    .prompt([
      {
        name: "choices",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Employees By Department",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "View All Roles",
          "Add Role",
          "Remove Role",
          "Add Department",
          "View Department Budgets",
          "Remove Department",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      const { choices } = answers;

      if (choices === "View All Employees") {
        viewAllEmployees();
      }

      if (choices === "View All Departments") {
        viewAllDepartments();
      }

      if (choices === "View All Employees By Department") {
        viewEmployeesByDept();
      }

      if (choices === "Add Employee") {
        addEmployee();
      }

      if (choices === "Remove Employee") {
        removeEmployee();
      }

      if (choices === "Update Employee Role") {
        updateEmployeeRole();
      }

      if (choices === "Update Employee Manager") {
        updateEmployeeManager();
      }

      if (choices === "View All Roles") {
        viewAllRoles();
      }

      if (choices === "Add Role") {
        addRole();
      }

      if (choices === "Remove Role") {
        removeRole();
      }

      if (choices === "Add Department") {
        addDepartment();
      }

      if (choices === "View Department Budgets") {
        viewDeptBudget();
      }

      if (choices === "Remove Department") {
        removeDept();
      }

      if (choices === "Exit") {
        connection.end();
      }
    });
};

//View All Employees
viewAllEmployees = () => {
  let sql = `SELECT employee.id, employee.first_name, employee.last_name,
              role.title, department.department_name AS department,
              role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager
              FROM employee
              LEFT JOIN role ON employee.role_id = role.id
              LEFT JOIN department ON role.department_id = department.id
              LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  connection.query(sql, (error, response) => {
    if (error) throw error;

    console.log(
      chalk.yellow.bold(
        `===========================================================================`
      )
    );
    console.log(`                ` + chalk.green.bold(`Current Employees: `));
    console.log(
      chalk.yellow.bold(
        `===========================================================================`
      )
    );
    console.table(response);
    console.log(
      chalk.yellow.bold(
        `===========================================================================`
      )
    );
    promptUser();
  });
};

//View all Departments
const viewAllDepartments = () => {
  const sql = `SELECT department.id AS id, department.department_name AS department FROM department`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
    console.log(
      chalk.yellow.bold(
        `===========================================================================`
      )
    );
    console.log(
      `                              ` + chalk.green.bold(`All Departments:`)
    );
    console.log(
      chalk.yellow.bold(
        `===========================================================================`
      )
    );
    console.table(response);
    console.log(
      chalk.yellow.bold(
        `===========================================================================`
      )
    );
    promptUser();
  });
};

//View all Employees by Department
const viewEmployeesByDept = () => {
  const sql = `SELECT employee.first_name, employee.last_name,
                department.department_name AS department
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id`;

  connection.query(sql, (error, response) => {
    if (error) throw error;

    console.log(
      chalk.yellow.bold(
        `===========================================================================`
      )
    );
    console.log(
      `                ` + chalk.green.bold(`Employees by Department: `)
    );
    console.log(
      chalk.yellow.bold(
        `===========================================================================`
      )
    );
    console.table(response);

    console.log(
      chalk.yellow.bold(
        `===========================================================================`
      )
    );

    promptUser();
  });
};

//View all Roles
const viewAllRoles = () => {
  console.log(
    chalk.yellow.bold(
      `===========================================================================`
    )
  );
  console.log(
    `                ` + chalk.green.bold(`Current Employee Roles: `)
  );
  console.log(
    chalk.yellow.bold(
      `===========================================================================`
    )
  );

  const sql = `SELECT role.id, role.title, department.department_name AS department, role.salary
                FROM role JOIN department ON department.id = role.department_id`;

  connection.query(sql, (error, response) => {
    if (error) throw error;

    console.table(response);

    console.log(
      chalk.yellow.bold(
        `===========================================================================`
      )
    );

    promptUser();
  });
};

//View all Departments by Budget
const viewDeptBudget = () => {
  console.log(
    chalk.yellow.bold(
      `===========================================================================`
    )
  );
  console.log(`         ` + chalk.green.bold(`Budget By Department: `));
  console.log(
    chalk.yellow.bold(
      `===========================================================================`
    )
  );
  const sql = `SELECT department_id AS id,
                department.department_name AS department,
                SUM(salary) AS budget
                FROM role
                INNER JOIN department ON role.department_id = department.id
                GROUP BY role.department_id`;

  connection.query(sql, (error, response) => {
    if (error) throw error;

    console.table(response);
    console.log(
      chalk.yellow.bold(
        `===========================================================================`
      )
    );

    promptUser();
  });
};

//Add A New Employee
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
        validate: (addFirstName) => {
          if (addFirstName) {
            return true;
          } else {
            console.log("Please enter a first name.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
        validate: (addLastName) => {
          if (addLastName) {
            return true;
          } else {
            console.log("Please enter a last name.");
            return false;
          }
        },
      },
    ])

    .then((answer) => {
      const crit = [answer.firstName, answer.lastName];
      const roleSql = `SELECT role.id, role.title FROM role`;
      connection.query(roleSql, (error, data) => {
        if (error) throw error;

        const roles = data.map(({ id, title }) => ({ name: title, value: id }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What is the employee's role?",
              choices: roles,
            },
          ])
          .then((roleChoice) => {
            const role = roleChoice.role;
            crit.push(role);

            const managerSql = `SELECT * FROM employee`;

            connection.query(managerSql, (error, data) => {
              if (error) throw error;

              const managers = data.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id,
              }));

              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is the employee's manager?",
                    choices: managers,
                  },
                ])
                .then((managerChoice) => {
                  const manager = managerChoice.manager;
                  crit.push(manager);
                  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES (?, ?, ?, ?)`;

                  connection.query(sql, crit, (error) => {
                    if (error) throw error;
                    console.log("Employee has been added!");

                    viewAllEmployees();
                  });
                });
            });
          });
      });
    });
};

//Add a New Role
const addRole = () => {
  inquirer
    .prompt([
      {
        name: "newRole",
        type: "input",
        message: "What is the name/title of this new role?",
        validate: validate.validateString,
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of this new role?",
        validate: validate.validateSalary,
      },
    ])
    .then((answer) => {
      let params = [answer.newRole, answer.salary];

      //Grab dept from department table
      let roleSql = `SELECT department_name, id FROM department`;

      connection.query(roleSql, (error, data) => {
        if (error) throw error;

        let dept = data.map(({ department_name, id }) => ({
          name: department_name,
          value: id,
        }));

        inquirer
          .prompt([
            {
              name: "dept",
              type: "list",
              message: "Which department is this new role in?",
              choices: dept,
            },
          ])
          .then((deptChoice) => {
            let dept = deptChoice.dept;
            params.push(dept);

            let sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

            connection.query(sql, params, (error, result) => {
              if (error) throw error;

              console.log(
                chalk.yellow.bold(
                  `===========================================================================`
                )
              );
              console.log(chalk.greenBright(`Role successfully created!`));
              console.log(
                chalk.yellow.bold(
                  `===========================================================================`
                )
              );
              viewAllRoles();
            });
          });
      });
    });
};

//Add a new Department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "What is the name of this new Department?",
        validate: validate.validateString,
      },
    ])
    .then((answer) => {
      let sql = `INSERT INTO department (department_name) VALUES (?)`;

      connection.query(sql, answer.newDepartment, (error, response) => {
        if (error) throw error;

        console.log(``);
        console.log(
          chalk.greenBright(
            answer.newDeparment + ` Department succesfully created!`
          )
        );
        console.log(``);
        viewAllDepartments();
      });
    });
};

//Update an employee's Role
const updateEmployeeRole = () => {
  //Get employees from employee table
  let sql = `SELECT * FROM employee`;

  connection.query(sql, (error, response) => {
    if (error) throw error;
    const employ = response.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          name: "chosenEmployee",
          type: "list",
          message: "Which employee has a new role?",
          choices: employ,
        },
      ])
      .then((answer) => {
        let employee = answer.chosenEmployee;
        let params = [];
        params.push(employee);

        let roleSql = `SELECT * FROM role`;

        connection.query(roleSql, (error, data) => {
          if (error) throw error;

          let roles = data.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                name: "role",
                type: "list",
                message: "What is the employee's new role?",
                choices: roles,
              },
            ])
            .then((roleChoice) => {
              let role = roleChoice.role;
              params.push(role);

              let employ = params[0];
              params[0] = role;
              params[1] = employ;

              let sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

              connection.query(sql, params, (error, result) => {
                if (error) throw error;
                console.log(
                  chalk.greenBright.bold(
                    `===========================================================================`
                  )
                );
                console.log(chalk.greenBright(`Employee Role Updated`));
                console.log(
                  chalk.greenBright.bold(
                    `===========================================================================`
                  )
                );
                viewAllEmployees();
              });
            });
        });
      });
  });
};

//Update an employee's manager
const updateEmployeeManager = () => {
  let sql = `SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id
              FROM employee`;

  connection.query(sql, (error, response) => {
    let employeeNamesArray = [];

    response.forEach((employee) => {
      employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);
    });

    inquirer
      .prompt([
        {
          name: "chosenEmployee",
          type: "list",
          message: "Which employee has a new manager?",
          choices: employeeNamesArray,
        },
        {
          name: "newManager",
          type: "list",
          message: "Who is their new manager?",
          choices: employeeNamesArray,
        },
      ])
      .then((answer) => {
        let employeeId, managerId;

        response.forEach((employee) => {
          if (
            answer.chosenEmployee ===
            `${employee.first_name} ${employee.last_name}`
          ) {
            employeeId = employee.id;
          }

          if (
            answer.newManager === `${employee.first_name} ${employee.last_name}`
          ) {
            managerId = employee.id;
          }
        });

        if (validate.isSame(answer.chosenEmployee, answer.newManager)) {
          console.log(
            chalk.redBright.bold(
              `===========================================================================`
            )
          );
          console.log(chalk.redBright(`Invalid Manager Selection`));
          console.log(
            chalk.redBright.bold(
              `===========================================================================`
            )
          );

          promptUser();
        } else {
          let sql = `UPDATE employee SET employee.manager_id = ? WHERE employee.id = ?`;

          connection.query(sql, [managerId, employeeId], (error) => {
            if (error) throw error;

            console.log(
              chalk.greenBright.bold(
                `===========================================================================`
              )
            );
            console.log(chalk.greenBright(`Employee Manager Updated`));
            console.log(
              chalk.greenBright.bold(
                `===========================================================================`
              )
            );
            viewAllEmployees();
            promptUser();
          });
        }
      });
  });
};

//Remove an Employee
const removeEmployee = () => {
  let sql = `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;

  connection.query(sql, (error, response) => {
    if (error) throw error;
    let employeeNamesArray = [];

    response.forEach((employee) => {
      employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);
    });

    inquirer
      .prompt([
        {
          name: "chosenEmployee",
          type: "list",
          message: "Which employee would you like to remove?",
          choices: employeeNamesArray,
        },
      ])
      .then((answer) => {
        let employeeId;

        response.forEach((employee) => {
          if (
            answer.chosenEmployee ===
            `${employee.first_name} ${employee.last_name}`
          ) {
            employeeId = employee.id;
          }
        });

        let sql = `DELETE FROM employee WHERE employee.id = ?`;
        connection.query(sql, [employeeId], (error) => {
          if (error) throw error;

          console.log(
            chalk.redBright.bold(
              `===========================================================================`
            )
          );
          console.log(chalk.redBright(`Employee Successfully Removed`));
          console.log(
            chalk.redBright.bold(
              `===========================================================================`
            )
          );
          viewAllEmployees();
        });
      });
  });
};

//Remove a Role
const removeRole = () => {
  let sql = `SELECT role.id, role.title FROM role`;

  connection.query(sql, (error, response) => {
    if (error) throw error;
    let roleNamesArray = [];

    response.forEach((role) => {
      roleNamesArray.push(role.title);
    });

    inquirer
      .prompt([
        {
          name: "chosenRole",
          type: "list",
          message: "Which role would you like to remove",
          choices: roleNamesArray,
        },
      ])
      .then((answer) => {
        let roleId;

        response.forEach((role) => {
          if (answer.chosenRole === role.title) {
            roleId = role.id;
          }
        });

        let sql = `DELETE FROM role WHERE role.id = ?`;
        connection.query(sql, [roleId], (error) => {
          if (error) throw error;

          console.log(
            chalk.redBright.bold(
              `===========================================================================`
            )
          );
          console.log(chalk.greenBright(`Role Successfully Removed!`));
          console.log(
            chalk.redBright.bold(
              `===========================================================================`
            )
          );

          viewAllRoles();
        });
      });
  });
};

//Delete a department
const removeDept = () => {
  let sql = `SELECT department.id, department.department_name FROM department`;

  connection.query(sql, (error, response) => {
    if (error) throw error;
    let deptNamesArray = [];

    response.forEach((department) => {
      deptNamesArray.push(department.department_name);
    });

    inquirer
      .prompt([
        {
          name: "chosenDept",
          type: "list",
          message: "Which department would you like to remove?",
          choices: deptNamesArray,
        },
      ])
      .then((answer) => {
        let deptId;

        response.forEach((department) => {
          if (answer.chosenDept === department.department_name) {
            deptId = department.id;
          }
        });

        let sql = `DELETE FROM department WHERE department.id = ?`;
        connection.query(sql, [deptId], (error) => {
          if (error) throw error;

          console.log(
            chalk.yellow.bold(
              `===========================================================================`
            )
          );
          console.log(chalk.greenBright(`Department Succesfully Removed!`));
          console.log(
            chalk.yellow.bold(
              `===========================================================================`
            )
          );

          viewAllDepartments();
        });
      });
  });
};
