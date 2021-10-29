const imgsModel = require('../models/ImgsModel');

const returnObj = function() {
  const self = this;


  const saveImage = (curObj) => {
    const errMsg = "Err in imgsModule.saveImage(): ";
    return new Promise((resolve, reject) => {

      //looking for same image already in DB
      let query = {
        'reportID': curObj.reportID,
        'imgName': curObj.imgName,
        'imgSize': curObj.imgSize
      }

      //do search query
      imgsModel.findOne(query, function(err, doc){
        if(err) {
          return reject(`${errMsg} model.findOne(${curObj.imgName})! \t${err}`);
        }

        if(!doc) {//didn't find in db
          curObj.imgID = `${curObj.key}_${getDateTimeStampObj()[2]}`;

          const model = new imgsModel(curObj);
          if (!model) {
            reject(errMsg + "bad report attachment!\t" + curObj.imgName);
          }

          model.save()
            .then(() => {
              resolve(curObj.imgID);
            })
            .catch((err) => {
              reject(`${errMsg} model.save(${curObj.imgName})! \t${err}`);
            });

        }
        else{
          //already in db, return imgID
          resolve(doc.imgID);
        }

      });

    });
  };

  const _saveImagesToDB = async (reportID, imgsObj) => {
    const errMsg = "Err in imgsModule.saveImageToDB(): ";

    try {
      let curObj, imgID, imgIDs = {};
      const keys = Object.keys(imgsObj);
      let len = keys.length, key;

      for(let ix=0; ix<len; ix++) {
        key = keys[ix];
        curObj = imgsObj[key];
        curObj.key = key;
        curObj.reportID = reportID;

        /*
          wrap this call in try block to avoid
          crash of method prematurely
        */
        try{
          imgID = await saveImage(curObj);
          imgIDs[key] = {
            'imgName': curObj.imgName,
            'imgID': imgID
          };
        }
        catch(e) {
          imgIDs['err'] = errMsg + e;
          break;
        }
      }

      //no need to check count here
      return imgIDs;
    }
    catch(e) {
      throw errMsg + e;
    }
  };
  self.saveImagesToDB = _saveImagesToDB;





  const getImageFromDB = (imgObj, reportID) => {
    return new Promise((resolve, reject) => {
      const errMsg = "Err in imgsModule.getImageFromDB(): ";
      const imgID = imgObj.imgID;

      imgsModel.findOne(
        { reportID: reportID, imgID: imgID }, (err, data) => {
          if(err) {
            reject(errMsg + err);
          }

          if(!data) {
            reject(errMsg + 'no data for ' + imgID);
          }
          else {
            let imageObj = JSON.stringify(data);
            dataOut = JSON.parse(imageObj);
            delete dataOut._id;
            resolve(dataOut);

            //for debug purposes
            // reject(errMsg + 'no data for ' + imgID);
          }
        }
      )
    });
  }

  const _getImgObjs = async (dataIn, reportID) => {
    console.log("getImgObjs()...");
    const errMsg = "Err in imgsModule.getImgObjs(): ";
    let msg = false;

    try{
      const keys = Object.keys(dataIn);
      let dataOut = dataIn, objIn, objOut, key;
      const len = keys.length;

      for(let x=0; x<len; x++) {
        key = keys[x];
        objIn = dataIn[key];

        try {
          objOut = await getImageFromDB(objIn, reportID);
          dataOut[key] = objOut;
        }
        catch(e) {
          //RARE db error?
          msg = errMsg + e;
          console.log('getImgObjs weird db err: ', e);
          break;
        }
      }

      if(msg) {
        dataOut = { "err": msg };
      }

      return dataOut;
    }
    catch(e) {
      throw errMsg + e;
    }
  };
  self.getImgObjs = _getImgObjs;





  return self;
};//end returnObj

module.exports = (param) => {
  return new returnObj(param);
}
