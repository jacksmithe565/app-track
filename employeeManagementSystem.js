Here's an example of a JavaScript code that meets your requirements. It creates a complex Employee Management System with various functionalities:

```javascript
// employeeManagementSystem.js

// Employee class definition
class Employee {
  constructor(id, name, department, manager) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.manager = manager;
  }

  promote(manager) {
    this.manager = manager;
  }

  toString() {
    return `${this.name} (ID: ${this.id}) - ${this.department}, Manager: ${this.manager}`;
  }
}

// EmployeeManagementSystem class definition
class EmployeeManagementSystem {
  constructor() {
    this.employees = [];
  }

  addEmployee(employee) {
    this.employees.push(employee);
  }

  removeEmployee(employee) {
    const index = this.employees.indexOf(employee);
    if (index > -1) {
      this.employees.splice(index, 1);
    }
  }

  getEmployeesByDepartment(department) {
    return this.employees.filter((employee) => employee.department === department);
  }

  getManagerForEmployee(employee) {
    return this.employees.find((e) => e.name === employee.manager);
  }

  toString() {
    let output = '';
    this.employees.forEach((employee) => {
      output += employee.toString() + '\n';
    });
    return output;
  }
}

// Create employee objects
const john = new Employee(1, 'John Doe', 'IT', 'Jane Smith');
const jane = new Employee(2, 'Jane Smith', 'HR', '');
const mark = new Employee(3, 'Mark Johnson', 'Sales', 'Jane Smith');

// Create employee management system
const employeeManagementSystem = new EmployeeManagementSystem();

// Add employees to the system
employeeManagementSystem.addEmployee(john);
employeeManagementSystem.addEmployee(jane);
employeeManagementSystem.addEmployee(mark);

// Promote an employee
john.promote('Mark Johnson');

// Remove an employee
employeeManagementSystem.removeEmployee(jane);

// Get employees by department
const itEmployees = employeeManagementSystem.getEmployeesByDepartment('IT');
console.log('IT Employees:');
console.log(itEmployees);

// Get manager for an employee
const johnsManager = employeeManagementSystem.getManagerForEmployee(john);
console.log('John\'s Manager:');
console.log(johnsManager);

// Print employee management system
console.log('Employee Management System:');
console.log(employeeManagementSystem.toString());
```

This code showcases a more elaborate Employee Management System, including class definitions, object instantiation, functions for adding/removing employees, manipulating employee data, and retrieving information from the system.