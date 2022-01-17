const express = require('express')

const router = express.Router()

const auth = require('../middleware/auth');

const superAdminAuth = require('../middleware/superAdminAuth');

const patientController = require('../controllers/patientController');

//END POINTS
router.post('/patient/register', auth, patientController.register);

module.exports = router;
