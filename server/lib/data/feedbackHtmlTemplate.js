/*
  PRESENTLY: I didn't see any need to install a templating engine
  just to send a simple email...
*/

const returnObj = function() {
  const self = this;


  const makeHtml  = function(dataIn) {
    return new Promise((resolve, reject) => {
      try{
        const _d = dataIn;
        const _h = [];

        const phone = (!isNull(_d.phone))? _d.phone : "N/A";
        const email = (!isNull(_d.email))? _d.email : "N/A";

        _h.push(`<h1>Feedback Submission</h1>`);
        _h.push(`<h3 style="color:#777">${_d.dateObj[0]} @ ${_d.dateObj[1]}</h3>`);
        _h.push(`<p><b>Type of Submission:</b> ${_d.msgCategory}</p>`);
        _h.push('<br><br>');

        _h.push(`<p><b>Filed By:</b> ${_d.name}</p>`);
        _h.push(`<p><b>Phone:</b> ${phone}</p>`);
        _h.push(`<p><b>Email:</b> ${email}</p>`);

        if(!isNull(_d.msgText)) {
          _h.push(`<p><b>Feedback:</b> ${_d.msgText}</p>`);
        }

        const htmlOut = _h.join('');

        resolve(htmlOut);
      }
      catch(e) {
        reject("Error in feedbackHtmlTemplate: " + e);
      }
    });
  };
  self.make = makeHtml;





  return this;
};


module.exports = () => {
  return new returnObj();
};