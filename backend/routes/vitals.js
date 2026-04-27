const express = require('express');
const router = express.Router();
const { getMyVitals, addVitals, getPatientVitals, updateVitals } = require('../controllers/vitalsController');
const { protect, authorizeRoles } = require('../middleware/auth');

router.get('/', protect, getMyVitals);
router.post('/', protect, addVitals);
router.get('/stats/:userId', protect, getPatientVitals);
router.post('/update', protect, authorizeRoles('caregiver', 'doctor'), updateVitals);

module.exports = router;
