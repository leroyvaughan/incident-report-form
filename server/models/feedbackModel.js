const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackModel = new Schema(
    {
        msgID: { type: String, required: true },
        msgCategory: { type: String, required: true },
        msgText: { type: String, required: true },

        name: { type: String, required: true },
        email: { type: String, required: false },
        phone: { type: String, required: false },

        dateObj: { type: Object, required: true }
    }
)

//setting database schema model. Params: (collectionName, schemaName)
module.exports = mongoose.model('user_feedbacks', feedbackModel);