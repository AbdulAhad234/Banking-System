const db = require('../../bankDatabase');


const staffController = {
  getAllEmployees: async (req, res) => {
    try {
      const employees = await db.query('SELECT * FROM Employees');
      res.json({ success: true, employees: employees.rows });
    } catch (error) {
      console.error('Error executing getAllEmployees:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  getEmployeeById: async (req, res) => {
    try {
      const { employee_id } = req.params;
      const employee = await db.query('SELECT * FROM Employees WHERE employee_id = $1', [employee_id]);
      if (employee.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Employee not found' });
      }
      res.json({ success: true, employee: employee.rows[0] });
    } catch (error) {
      console.error('Error executing getEmployeeById:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  addEmployee: async (req, res) => {
    try {
      const { first_name, last_name, email, phone, address, date_of_birth, department, position } = req.body;
      await db.query(
        'INSERT INTO Employees (first_name, last_name, email, phone, address, date_of_birth, department, position) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [first_name, last_name, email, phone, address, date_of_birth, department, position]
      );
      res.json({ success: true, message: 'Employee added successfully' });
    } catch (error) {
      console.error('Error executing addEmployee:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  updateEmployee: async (req, res) => {
    try {
      const { employee_id } = req.params;
      const { first_name, last_name, email, phone, address, date_of_birth, department, position } = req.body;
      await db.query(
        'UPDATE Employees SET first_name = $1, last_name = $2, email = $3, phone = $4, address = $5, date_of_birth = $6, department = $7, position = $8 WHERE employee_id = $9',
        [first_name, last_name, email, phone, address, date_of_birth, department, position, employee_id]
      );
      res.json({ success: true, message: 'Employee updated successfully' });
    } catch (error) {
      console.error('Error executing updateEmployee:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  fireEmployee: async (req, res) => {
    try {
      const { employee_id } = req.params;
      await db.query('DELETE FROM Employees WHERE employee_id = $1', [employee_id]);
      res.json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Error executing fireEmployee:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
};

module.exports = staffController;
