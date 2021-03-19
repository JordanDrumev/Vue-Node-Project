const db = require("../models");
const Employees = db.employees;

const {
  validateName,
  validateAddress,
  validatePhone,
  validateDepartment,
  validatePosition,
  validateSalary,
  validateAge
} = require('../scripts/validation');

//Creater an employee
exports.create = (req, res) => {
  const employee = {};

  //Checks if all the fields are filled in
  if (!req.body.first_name ||
    !req.body.last_name ||
    !req.body.employee_address ||
    !req.body.employee_phone ||
    !req.body.department ||
    !req.body.employee_position ||
    !req.body.employee_salary ||
    !req.body.employee_age) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  //Validates the input data
  try {
    validateName(req.body.first_name, employee, 'first_name');
    validateName(req.body.last_name, employee, 'last_name');
    validateAddress(req.body.employee_address, employee);
    validatePhone(req.body.employee_phone, employee);
    validateDepartment(req.body.department, employee);
    validatePosition(req.body.employee_position, employee);
    validateSalary(req.body.employee_salary, employee);
    validateAge(req.body.employee_age, employee);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
    return;
  }

  //Creates the new employee
  Employees.create(employee)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error while creating a new employee.'
      })
    })
};

//Returns all the employees
exports.findAll = (req, res) => {
  Employees.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving employees."
      });
    });
};

//Returns one employee by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Employees.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving employee with id=" + id
      });
    });
};

//Updates an employee
exports.update = (req, res) => {
  const id = req.params.id;
  const employee = {};

  //Validates the input data and catches errors
  try {
    validateName(req.body.first_name, employee, 'first_name');
    validateName(req.body.last_name, employee, 'last_name');
    validateAddress(req.body.employee_address, employee);
    validatePhone(req.body.employee_phone, employee);
    validateDepartment(req.body.department, employee);
    validatePosition(req.body.employee_position, employee);
    validateSalary(req.body.employee_salary, employee);
    validateAge(req.body.employee_age, employee);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
    return;
  }

  //Updates the employee
  Employees.update(employee, {
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id
      });
    });
};

//Deletes an employee
exports.delete = (req, res) => {
  const id = req.params.id;

  Employees.destroy({
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Employee with id=" + id
      });
    });

};