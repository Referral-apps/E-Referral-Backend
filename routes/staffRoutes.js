const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth');

const superAdminAuth = require('../middleware/superAdminAuth');

const staffController = require('../controllers/staffController');

router.post('/staff/register',auth, staffController.register);
router.post('/staff/login', staffController.login)
router.put('/staff/update/:id', staffController.update)

module.exports = router;