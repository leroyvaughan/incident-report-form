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

        const incidentTime = getFormattedTime(_d.incidentTime);
        const injuries = (!isNull(_d.incidentInjuries))? _d.incidentInjuries : "No";
        const theftOrDmg = (!isNull(_d.theftOrDamage))? _d.theftOrDamage : "No";

        _h.push(`<h1>Incident Report Filed</h1>`);
        _h.push(`<h3 style="color:#777">${_d.dateToday} @ ${_d.dateObj[1]}</h3>`);
        _h.push(`<p><b>Filed By:</b> ${_d.name}</p>`);
        _h.push(`<p><b>Relationship to Incident:</b> ${_d.relationship}</p>`);
        _h.push('<br><br>');

        _h.push('<h2>Report Details</h2><hr/>');
        _h.push(`<p><b>Incident Date:</b> ${_d.incidentDate}</p>`);
        _h.push(`<p><b>Incident Time:</b> ${incidentTime}</p>`);
        _h.push(`<p><b>Incident Description:</b> ${_d.incidentDescription}</p>`);
        _h.push(`<p><b>Injuries Involved?:</b> ${injuries}</p>`);
        _h.push(`<p><b>Theft or Damage?:</b> ${theftOrDmg}</p>`);

        if(!isNull(_d.comments)) {
          _h.push(`<p><b>Comments:</b> ${_d.comments}</p>`);
        }

        if(!isNull(_d.attachments)) {
          let _i = _d.attachments, curObj;
          _h.push(`<p><b>Attachments:</b> `);

          if(_i.err) {
            _h.push(`<span style='color:red;'>Oops. An image save error occurred!</span>`);
          }
          else {

            Object.keys(_i).forEach((key) => {
              curObj = _i[key];
              _h.push(`<span>${curObj.imgName}</span>&nbsp;`);
            });

          }

          _h.push('</p>');
        }


        const reportUrl = `https://cfan-incident-report.herokuapp.com/reports/view/${_d.reportID}`;
        _h.push('<br><h3>For the Full Report:</h3>');
        _h.push(`Click <a href='${reportUrl}'>here!</a>`);

        const htmlOut = _h.join('');

        resolve(htmlOut);
      }
      catch(e) {
        reject("Error in irHtmlTemplate: " + e);
      }
    });
  };
  self.make = makeHtml;





  return this;
};


module.exports = () => {
  return new returnObj();
};