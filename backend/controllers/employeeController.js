import Employee from "../models/EmployeeModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user employees
// @route   GET /api/employees
// @access  Private
const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ user: req.user._id });
  res.json(employees);
});

//@description     Fetch single Employee
//@route           GET /api/employees/:id
//@access          Public
const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }

  res.json(employee);
});

//@description     Create single Employee
//@route           GET /api/employees/create
//@access          Private
const CreateEmployee = asyncHandler(async (req, res) => {
  const { name, date_of_birth, gender, salary } = req.body;

  if (!name || !date_of_birth || !gender || !salary) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const employee = new Employee({
      user: req.user._id,
      name,
      date_of_birth,
      gender,
      salary,
    });

    const createdEmployee = await employee.save();

    res.status(201).json(createdEmployee);
  }
});

//@description     Delete single Employee
//@route           GET /api/employees/:id
//@access          Private
const DeleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (employee.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (employee) {
    await employee.remove();
    res.json({ message: "Employee Removed" });
  } else {
    res.status(404);
    throw new Error("Employee not Found");
  }
});

// @desc    Update a employee
// @route   PUT /api/employees/:id
// @access  Private
const UpdateEmployee = asyncHandler(async (req, res) => {
  const { name, date_of_birth, gender, salary } = req.body;

  const employee = await Employee.findById(req.params.id);

  if (employee.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (employee) {
    employee.name = name;
    employee.date_of_birth = date_of_birth;
    employee.gender = gender;
    employee.salary = salary;

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
});

export {
  getEmployeeById,
  getEmployees,
  CreateEmployee,
  DeleteEmployee,
  UpdateEmployee,
};
