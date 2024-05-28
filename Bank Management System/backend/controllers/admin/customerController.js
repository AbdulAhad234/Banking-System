const db = require('../../bankDatabase');


const customerController = {
  getAllCustomers: async (req, res) => {
    try {
      const customers = await db.query('SELECT * FROM Customers');
      res.json({ success: true, customers: customers.rows });
    } catch (error) {
      console.error('Error executing getAllCustomers:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  getCustomerById: async (req, res) => {
    try {
      const { customer_id } = req.params;
      const customer = await db.query('SELECT * FROM Customers WHERE customer_id = $1', [customer_id]);
      if (customer.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Customer not found' });
      }
      res.json({ success: true, customer: customer.rows[0] });
    } catch (error) {
      console.error('Error executing getCustomerById:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
};

module.exports = customerController;
