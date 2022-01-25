const express = require('express')

const router = express.Router()

const auth = require('../middleware/auth');

const superAdminAuth = require('../middleware/superAdminAuth');

const patientController = require('../controllers/patientController');

//END POINTS
router.post('/patient/register', auth, patientController.register);

router.get('/patient/allpatients', auth, patientController.allPatients);

router.post('/patient/update/:id', auth, patientController.update);

router.get('/patient/showone/:id', auth, patientController.showone);

router.delete('/patient/deletepatient/:id', auth, patientController.deletepatient);

module.exports = router;
