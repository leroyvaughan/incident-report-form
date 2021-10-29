const Model = require('../models/feedbackModel');

const returnObj = function(mailgunObj) {
  const self = this;

  const _saveFeedback = (dataIn) => {
    return new Promise((resolve, reject) => {

      //add messageID and date/time
      const dateObj = getDateTimeStampObj();
      dataIn['msgID'] = dateObj[2]; //timestamp
      dataIn.dateObj = dateObj;

      //create model of data
      const model = new Model(dataIn);
      if (!model) {
        reject("Data Model Server Error in messagingObj.js!");
      }

      model.save()
      .then(() => {
          dataIn.emailTo = 'garyvaughan1221@gmail.com';
          dataIn.template = 'feedback';
          dataIn.subjectLine = 'IR Form Feedback Submission';

            mailgunObj.sendMail(dataIn)
              .then(() => {
                resolve("Feedback saved and emailed!");
              })
              .catch((err) => {
                reject("Err in mailgunObj: " + err);
              });

          })
          .catch(err => {
            reject("Err in irModule.js: " + err);
          })


    });

  };
  self.saveFeedback = _saveFeedback;







  return self;
}


module.exports = (param) =>  {
  return new returnObj(param);
}