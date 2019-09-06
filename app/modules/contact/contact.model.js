const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

contactSchema.index({ phone: 1 }, { unique: true });

module.exports = mongoose.model('contact', contactSchema);