const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const irModel = new Schema(
    {
        reportID: { type: String, required: false },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: Object, required: true },
        briefDescription: { type: String, required: true },
        dateToday: { type: String, required: true },
        dateObj: { type: Array, required: true },
        relationship: { type: String, required: true },

        incidentDate: { type: String, required: true },
        incidentTime: { type: String, required: true },
        incidentDescription: { type: String, required: true },

        personsInvolved: { type: String, required: true },

        injuriesInvolved: { type: String, required: false },
        injuriesResponse: { type: String, required: false },

        theftOrDamage: { type: String, required: false },

        recurrenceAction: { type: String, required: false },

        witnessesPresent: { type: String, required: true },

        comments: { type: String, required: false},

        attachments: { type: Object, required: false },

        emailTo: { type: String, required: false },

        lastEditDate: { type: Object, required: false }

        //TODO: do we want to track every edit? if so, need auth scheme...
    }
)

//setting database schema model. Params: (collectionName, schemaName)
module.exports = mongoose.model('incident_reports', irModel);