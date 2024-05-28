const db = require('../../bankDatabase');
const bcrypt = require('bcrypt');

const profileController = {
  viewProfile: async (req, res) => {
    try {
      const { customer_id } = req.params;

      if (!customer_id) {
        return res.status(400).json({ success: false, message: 'Please provide customer ID' });
      }

      const customer = await db.query('SELECT * FROM Customers WHERE customer_id = $1', [customer_id]);
      if (customer.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Customer not found' });
      }

      res.json({ success: true, profile: customer.rows[0] });
    } catch (error) {
      console.error('Error executing viewProfile:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const { customer_id } = req.params;
      const { first_name, last_name, email, phone, address, date_of_birth } = req.body;

      if (!customer_id) {
        return res.status(400).json({ success: false, message: 'Please provide customer ID' });
      }

      const customer = await db.query('SELECT * FROM Customers WHERE customer_id = $1', [customer_id]);
      if (customer.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Customer not found' });
      }

      await db.query('UPDATE Customers SET first_name = $1, last_name = $2, email = $3, phone = $4, address = $5, date_of_birth = $6, updated_at = CURRENT_TIMESTAMP WHERE customer_id = $7', 
                     [first_name, last_name, email, phone, address, date_of_birth, customer_id]);

      res.json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error executing updateProfile:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  addCustomer: async (req, res) => {
    try {
      const { first_name, last_name, email, phone, address, password } = req.body;

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new customer into the database
      await db.query(
        'INSERT INTO Customers (first_name, last_name, email, phone, address, password, created_at) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)',
        [first_name, last_name, email, phone, address, hashedPassword]
      );

      res.status(201).json({ success: true, message: 'Customer added successfully' });
    } catch (error) {
      console.error('Error executing addCustomer:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

module.exports = profileController;
