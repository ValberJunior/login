const mongoose = require('mongoose');

const ProcessSchema = mongoose.Schema({
npacient: { type: String, required: true, minlength: 11, maxlength: 17 },
nprocess: { type: Number, required: true, minlength: 1, maxlength: 1000 },
optionTerm: { type: String, required: true, minlength: 7, maxlength: 100 },
lastAccess: { type: Date, required: true, minlength: 8, maxlength: 10 },
status: { type: String, required: true, minlength: 5, maxlength: 100 },
});

module.exports = mongoose.model('Process', ProcessSchema);