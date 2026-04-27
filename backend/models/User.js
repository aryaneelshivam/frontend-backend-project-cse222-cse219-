const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['patient', 'caregiver', 'doctor', 'admin'], default: 'patient' },
    age: { type: Number },
    doctorName: { type: String },
    specialty: { type: String },
    diagnosis: { type: String },
    caregiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    patientIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    notifications: [{
        message: { type: String, required: true },
        date: { type: Date, default: Date.now },
        read: { type: Boolean, default: false }
    }],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', UserSchema);
