const express = require('express')

const router = express.Router()

const auth = require('../middleware/auth');

const superAdminAuth = require('../middleware/superAdminAuth');

const facilityController = require('../controllers/facilityController');

//END POINTS
router.post('/facility/register', auth, facilityController.register);

router.patch('/facility/update/:id', auth, facilityController.update);

router.get('/facility/update/:id', auth, facilityController.findfacility);

router.get('/facility/allfacilities/', auth, facilityController.allfacilities);

router.delete('/facility/deletefacility/:id', auth, facilityController.deletefacility);

module.exports = router;
 