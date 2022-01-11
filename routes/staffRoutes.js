const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth');

const superAdminAuth = require('../middleware/superAdminAuth');

const staffController = require('../controllers/staffController');

router.post('/staff/register', auth, staffController.register);

router.post('/staff/login', staffController.login);

router.put('/staff/update/:id',superAdminAuth, staffController.update);

router.patch('/staff/change-password/', auth, staffController.change_password);

router.delete('/staff/delete/:id', superAdminAuth, staffController.destroy);

router.get('/staff/:id', auth, staffController.show)

module.exports = router;