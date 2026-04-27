const Vitals = require('../models/Vitals');

// @desc     Get all vitals for logged in user
// @route    GET api/vitals
// @access   Private
exports.getMyVitals = async (req, res) => {
    try {
        const vitals = await Vitals.find({ user: req.user.id }).sort({ date: -1 });
        res.json(vitals);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc     Add new vitals entry
// @route    POST api/vitals
// @access   Private
exports.addVitals = async (req, res) => {
    try {
        const { heartRate, bloodPressure, weight } = req.body;
        const newVitals = new Vitals({
            user: req.user.id,
            heartRate,
            bloodPressure,
            weight
        });
        const vitals = await newVitals.save();
        res.json(vitals);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc     Get vitals for a specific user
// @route    GET api/vitals/stats/:userId
// @access   Private
exports.getPatientVitals = async (req, res) => {
    try {
        const vitals = await Vitals.find({ user: req.params.userId }).sort({ date: -1 }).limit(10);
        res.json(vitals);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc     Update vitals for a specific user (Caregiver only)
// @route    POST api/vitals/update
// @access   Private (Caregiver)
exports.updateVitals = async (req, res) => {
    try {
        const { userId, heartRate, systolic, diastolic } = req.body;
        let vitals = await Vitals.findOne({ user: userId }).sort({ date: -1 });

        if (vitals) {
            if (heartRate !== undefined) vitals.heartRate = heartRate;
            if (systolic || diastolic) {
                vitals.bloodPressure = { 
                    systolic: systolic || vitals.bloodPressure?.systolic, 
                    diastolic: diastolic || vitals.bloodPressure?.diastolic 
                };
            }
            vitals.date = Date.now();
            await vitals.save();
        } else {
            vitals = new Vitals({
                user: userId,
                heartRate,
                bloodPressure: { systolic, diastolic }
            });
            await vitals.save();
        }
        res.json(vitals);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
