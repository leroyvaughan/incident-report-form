const irModel = require('../models/irModel');
const iMod = require('./imgsModule')();

const returnObj = function(mailgunObj) {
  const self = this;


  const SaveReportToDB = (dataIn) => {
    const errMsg = "Err in irModule.SaveReportToDB(): ";

    return new Promise((resolve, reject) => {
      try {
        let _d = dataIn;
        let hasErr = false, errMsg, saveImagesErr;

        //frontEnd code SHOULD not send empty array
        // -- SEE: .../components/form-parts/Attachments.jsx
        if(_d.attachments) {

          //save imgs separately and return array of imgIDs
          iMod.saveImagesToDB(_d.reportID, _d.attachments)
            .then((resp) => {
              _d.attachments = resp;
            })
            .catch((err) => {
              hasErr = true;
              saveImagesErr = err;
            })
            .finally(() => {
              //create & save report model of data
              const model = new irModel(_d);

              if (!model) {
                reject(errMsg + "bad report data!");
              }
              else {
                if(hasErr && !_d.attachments.err) {
                  _d.attachments = { "err": saveImagesErr };
                }

                model.save()
                  .then(() => {
                    resolve(_d);
                  })
                  .catch(err => {
                    reject(errMsg + err);
                  });

              }
            });
        }
        else{
          resolve(_d);
        }
      }
      catch(e) {
        reject(errMsg + e);
      }
    });
  };


  const reportSave = (dataIn) => {
    return new Promise((resolve, reject) => {

      //add {timestamp} as reportID
      dataIn['reportID'] = dataIn.dateObj[2];
      delete dataIn.curStep;

      SaveReportToDB(dataIn)
        .then((newData) => {
          newData.template = 'incidentReport';
          newData.subjectLine = 'New Incident Report Submission';

          mailgunObj.sendMail(newData)
            .then(() => {
              resolve("Report saved and emailed!");
            })
            .catch((err) => {
              reject("Err in mailgunObj: " + err);
            });
        })
        .catch((err) => {
          reject(err);
        })
    });
  };
  self.saveReport = reportSave;









  //HTTPPOST TO UPDATE AN EXISTING REPORT
  const reportUpdate = (dataIn) => {
    return new Promise((resolve, reject) => {
      console.log("reportUpdate()...");

      try{
        dataIn.lastEditDate = getDateTimeStampObj();

        //not updating images...just save new and reference those imgID's
        let _d = dataIn;
        let hasErr = false, errMsg, saveImagesErr;

        //frontEnd code SHOULD not send empty array
        // -- SEE: .../components/form-parts/Attachments.jsx
        if (_d.attachments) {

          //save imgs separately and return array of imgIDs
          iMod.saveImagesToDB(_d.reportID, _d.attachments)
            .then((resp) => {
              _d.attachments = resp;
            })
            .catch((err) => {
              hasErr = true;
              saveImagesErr = err;
            })
            .finally(() => {
              irModel.replaceOne(
                {
                  reportID: _d.reportID },
                  _d,
                  function (err, result) {
                    if (err) {
                      reject("Err updating report...\t" + err);
                    }
                    else {
                      resolve();
                    }
                  }
              );
            });
        }
      }
      catch(e) {
        reject("Err updating report...\t" + e);
      }

    });
  };
  self.updateReport = reportUpdate;





  //HTTPGET FOR A SINGLE REPORT BY ID
  const getSingleReport = (dataIn) => {
    return new Promise((resolve, reject) => {
      console.log("getSingleReport()...");

      irModel.findOne(
        { reportID: dataIn.id }, (err, data) => {
          if (err) {
            reject("Error in irModule.getSingleReport: " + err);
          }

          if (!data) {
            reject("Report not found!");
          }
          else{
            try {
              let report = JSON.stringify(data);
              let dataOut = JSON.parse(report);
              delete dataOut._id;

              if(dataOut.attachments) {
                if(isNull(dataOut.attachments.err)) {
                  iMod.getImgObjs(dataOut.attachments, dataOut.reportID)
                    .then((resp) => {
                      dataOut.attachments = resp;
                      resolve(dataOut);
                    })
                    .catch((err) => {
                      //don't reject becuase img attachments err
                      //still want to see the report
                      dataOut.attachments = { "err": err };
                      resolve(dataOut);
                    });
                }
              }
              else {
                resolve(dataOut);
              }
            }
            catch(e) {
              reject("Error getting report...\t" + e);
            }
          }
        })

      });
  };
  self.getReportById = getSingleReport;


  //HTTPGET FOR ALL REPORTS (max 100)
  const getReports = (dataIn) => {
    return new Promise((resolve, rject) => {
      console.log("getReports()...");

      irModel.find({}, (err, data) => {
        if (err) {
          reject("Error in irModule.getReports: " + err);
        }

        if (!data.length) {
          reject("No Reports to display!");
        }
        else{
          resolve(data);
        }
      })
    });
  };
  self.getAllReports = getReports;



  return self;
};//end returnObj

module.exports = (param) => {
  return new returnObj(param);
}
