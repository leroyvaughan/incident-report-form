const express = require('express');


const mg = require('../lib/mailgunObj.js')();
const irController = require('../controllers/irController.js')(mg);
const msgController = require('../controllers/msgController.js')(mg);
const router = express.Router();

//router.get('/mailguntest', msgController.mailgunTest);

/* Disable these for the demo app due to sensitive nature of past data */
//router.get('/incidentreport/:id', irController.getReport);
//router.get('/incidentreports', irController.getReports);


/* Disable these for the demo app due to stupidity of hackers, etc. */
//router.post('/incidentreport', irController.postData);
//router.post('/submitfeedback', msgController.sendFeedback);

module.exports = router;