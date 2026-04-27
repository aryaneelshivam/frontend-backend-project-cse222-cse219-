const express = require('express');
const router = express.Router();
const { getPatients, getMyPatients, linkPatient, updateProfile, getProfile } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/patients', protect, getPatients);
router.get('/my-patients', protect, getMyPatients);
router.post('/link-patient', protect, linkPatient);
router.put('/profile', protect, updateProfile);
router.get('/profile', protect, getProfile);

// Alerts
const { sendAlert, getAlerts, dismissAlert } = require('../controllers/userController');
router.post('/alert', protect, sendAlert);
router.get('/alerts', protect, getAlerts);
router.put('/alerts/:id/dismiss', protect, dismissAlert);

module.exports = router;
