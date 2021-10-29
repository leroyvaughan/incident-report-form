

const returnObj = function (mailgunObj) {
  const self = this;

  const irModule = require('../lib/irModule')(mailgunObj);

  const httpPosts = {
    "save": irModule.saveReport,
    "update": irModule.updateReport
  };

  //httpPost
  const _postData = (req, res) => {
    const body = req.body;

    if (!body) {
      return res.status(500).send('Post Data is null!');
    }
    else{
      try{
        let postAction = httpPosts[body.postAction];

        postAction(body)
          .then(() => {
            return res.status(200).send();
          })
          .catch((err) => {
            return res.status(500).send(err);
          });
      }
      catch(e) {
        return res.status(500).send("err: " + e);
      }
    }
  };
  self.postData = _postData;



  //SINGLE REPORT
  const _getReport = (req, res) => {
    if(!req.params.id) {
      return res.status(500).send('No report ID!');
    }

    irModule.getReportById(req.params)
      .then((resp) => {
        return res.status(200).json(resp);
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  };
  self.getReport = _getReport;


  //ALL REPORTS
  const _getReports = (req, res) => {
    irModule.getAllReports()
      .then((resp) => {
        return res.status(200).json({ data: resp });
      })
      .catch((err) => {
        console.log("error in getAllReports: " + err);
        return res.status(500).send();
      });
  }
  self.getReports = _getReports;

  return self;
};


module.exports = (param) => {
  return new returnObj(param);
}