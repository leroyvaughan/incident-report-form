const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImgsModel = new Schema(
    {
        base64String: { type: String, required: true },
        imgName: { type: String, required: true },
        imgSize: { type: Number, required: true },
        imgType: { type: String, required: true },
        imgID: { type: String, required: true },
        reportID: { type: String, required: true },
    }
)

//setting database schema model. Params: (collectionName, schemaName)
module.exports = mongoose.model('user_imgs', ImgsModel);