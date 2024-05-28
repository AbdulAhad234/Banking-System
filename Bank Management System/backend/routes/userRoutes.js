const express = require('express');
const router = express.Router();
//const db = require('../bankDatabase');

const transactionController = require('../controllers/user/transactionController');
const profileController = require('../controllers/user/profileController');

// Routes for transactions
router.post('/deposit', transactionController.deposit);
router.post('/withdrawal', transactionController.withdrawal);
router.post('/transfer', transactionController.transfer);

// Route for adding a customer
router.post('/api', profileController.addCustomer);   

// Route for viewing profile
router.get('/profile', profileController.viewProfile);

// Route for updating user profile
router.put('/profile', profileController.updateProfile);

module.exports = router;
