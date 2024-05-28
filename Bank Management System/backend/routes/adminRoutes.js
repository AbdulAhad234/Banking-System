const express = require("express");
const router = express.Router();
//const db = require('../bankDatabase');

const customerController = require("../controllers/admin/customerController");
const staffController = require("../controllers/admin/staffController");

router.get('/getAllCustomers', customerController.getAllCustomers);
router.get('/getCustomerById', customerController.getCustomerById);

router.get('/getAllEmployees', staffController.getAllEmployees);
router.get('/getEmployeeById', staffController.getEmployeeById);

router.post('/addEmployee', staffController.addEmployee);
router.put('/updateEmployee', staffController.updateEmployee);
router.delete('/fireEmployee', staffController.fireEmployee);

module.exports = router;