//The model for the employee
module.exports = (sequelize, Sequelize) => {
    const Employees = sequelize.define("employees", {
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      employee_address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      employee_phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      department: {
        type: Sequelize.STRING,
        allowNull: false
      },
      employee_position: {
        type: Sequelize.STRING,
        allowNull: false
      },
      employee_salary: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      employee_age: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  
    return Employees;
  };