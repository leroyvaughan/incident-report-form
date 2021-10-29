
const feedbackTemplate = require('./data/feedbackHtmlTemplate')();
const incidentReportTemplate = require('./data/irHtmlTemplate')();


const returnObj = function() {
  const mailgun = require("mailgun.js");
  const self = this;

  const init = function() {
    console.log("mailgunObj.init()...");
  };


  const mailgunSend = (dataIn) => {
    return new Promise((resolve, reject) => {
      console.log("mailgunSend()...");

      let htmlEmail = incidentReportTemplate;

      if(dataIn.template === 'feedback'){
        htmlEmail = feedbackTemplate;
      }

      htmlEmail.make(dataIn)
        .then((htmlBody) => {

          let emailTo;
          if(!isNull(dataIn.msgID)) {//feedback
            emailTo = dataIn.emailTo;

            //if user wants copy too...
            if (dataIn.email) {
              if(dataIn.email !== emailTo)
                emailTo = `${emailTo}, ${dataIn.email}`
            }
          }
          else{//ir report
            //set default send to report filer
            emailTo = dataIn.email;

            //set to 'emailTo' field, plus default if > 1 emailAddr
            if (dataIn.emailTo) {
              emailTo = `${emailTo}, ${dataIn.emailTo}`
            }
          }




          const data = {
            from: 'CFAN Overwatch <NO-REPLY@mailgun.nevertherabbit.com>',
            to: emailTo,
            subject: dataIn.subjectLine,
            html: htmlBody  //.make() response
          };

          //init mailgun client object
          var mg = mailgun.client({
            username: 'api',
            key: process.env.API_KEY,
            url: process.env.DOMAIN
          });

          //send the email
          mg.messages.create('mailgun.nevertherabbit.com', data)
            .then((resp) => {//msgSend success
              resolve(resp);
            })
            .catch((err) => {//msgSend failure
              reject("Error in mailgunSend(): " + err);
            });


          //for debug
          // resolve(htmlBody);

        })
        .catch((err) => {//makeHtmlEmail failure
          reject(err);
        });
      });
    };
  self.sendMail = mailgunSend;



















  init();
  return this;
};


module.exports = () => {
  return new returnObj();
}