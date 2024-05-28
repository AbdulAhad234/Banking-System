const db = require('../../bankDatabase');



const transactionController = {
  deposit: async (req, res) => {
    try {
      const { account_id, amount } = req.body;

      if (!account_id || !amount) {
        return res.status(400).json({ success: false, message: 'Please provide account ID and deposit amount' });
      }

      if (amount <= 0) {
        return res.status(400).json({ success: false, message: 'Deposit amount must be a positive number' });
      }

      const account = await db.query('SELECT * FROM Accounts WHERE account_id = $1', [account_id]);
      if (account.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Account not found' });
      }

      const newBalance = account.rows[0].balance + parseFloat(amount);
      await db.query('UPDATE Accounts SET balance = $1 WHERE account_id = $2', [newBalance, account_id]);

      await db.query('INSERT INTO Transactions (account_id, transaction_type, amount, description) VALUES ($1, $2, $3, $4)', 
                     [account_id, 'Deposit', amount, 'Deposit transaction']);

      res.json({ success: true, message: 'Deposit successful', new_balance: newBalance });
    } catch (error) {
      console.error('Error executing deposit:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  withdrawal: async (req, res) => {
    try {
      const { account_id, amount } = req.body;

      if (!account_id || !amount) {
        return res.status(400).json({ success: false, message: 'Please provide account ID and withdrawal amount' });
      }

      if (amount <= 0) {
        return res.status(400).json({ success: false, message: 'Withdrawal amount must be a positive number' });
      }

      const account = await db.query('SELECT * FROM Accounts WHERE account_id = $1', [account_id]);
      if (account.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Account not found' });
      }

      const currentBalance = account.rows[0].balance;
      if (currentBalance < amount) {
        return res.status(400).json({ success: false, message: 'Insufficient balance' });
      }

      const newBalance = currentBalance - parseFloat(amount);
      await db.query('UPDATE Accounts SET balance = $1 WHERE account_id = $2', [newBalance, account_id]);

      await db.query('INSERT INTO Transactions (account_id, transaction_type, amount, description) VALUES ($1, $2, $3, $4)', 
                     [account_id, 'Withdrawal', amount, 'Withdrawal transaction']);

      res.json({ success: true, message: 'Withdrawal successful', new_balance: newBalance });
    } catch (error) {
      console.error('Error executing withdrawal:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  transfer: async (req, res) => {
    try {
      const { from_account_id, to_account_id, amount } = req.body;

      if (!from_account_id || !to_account_id || !amount) {
        return res.status(400).json({ success: false, message: 'Please provide source account ID, destination account ID, and transfer amount' });
      }

      if (amount <= 0) {
        return res.status(400).json({ success: false, message: 'Transfer amount must be a positive number' });
      }

      const sourceAccount = await db.query('SELECT * FROM Accounts WHERE account_id = $1', [from_account_id]);
      const destinationAccount = await db.query('SELECT * FROM Accounts WHERE account_id = $1', [to_account_id]);
      if (sourceAccount.rows.length === 0 || destinationAccount.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Source or destination account not found' });
      }

      const sourceBalance = sourceAccount.rows[0].balance;
      if (sourceBalance < amount) {
        return res.status(400).json({ success: false, message: 'Insufficient balance in source account' });
      }

      const newSourceBalance = sourceBalance - parseFloat(amount);
      const destinationBalance = destinationAccount.rows[0].balance + parseFloat(amount);
      await db.query('UPDATE Accounts SET balance = $1 WHERE account_id = $2', [newSourceBalance, from_account_id]);
      await db.query('UPDATE Accounts SET balance = $1 WHERE account_id = $2', [destinationBalance, to_account_id]);

      await db.query('INSERT INTO Transactions (account_id, transaction_type, amount, description) VALUES ($1, $2, $3, $4)', 
                     [from_account_id, 'Transfer', -amount, 'Transfer to account ' + to_account_id]);
      await db.query('INSERT INTO Transactions (account_id, transaction_type, amount, description) VALUES ($1, $2, $3, $4)', 
                     [to_account_id, 'Transfer', amount, 'Transfer from account ' + from_account_id]);

      res.json({ success: true, message: 'Transfer successful', new_source_balance: newSourceBalance });
    } catch (error) {
      console.error('Error executing transfer:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  viewBalance: async (req, res) => {
    try {
      const { account_id } = req.params;

      if (!account_id) {
        return res.status(400).json({ success: false, message: 'Please provide account ID' });
      }

      const account = await db.query('SELECT * FROM Accounts WHERE account_id = $1', [account_id]);
      if (account.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Account not found' });
      }

      res.json({ success: true, balance: account.rows[0].balance });
    } catch (error) {
      console.error('Error executing viewBalance:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

module.exports = transactionController;
