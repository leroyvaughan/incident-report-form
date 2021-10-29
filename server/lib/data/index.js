const returnObj = function() {
  const self = this;

  self.sampleReport1 = {
    reportID: "001",
    name: "Gary Vaughan",
    contactInfo: "my phone number",
    dateToday: "11/30/2020",
    relationship: "security",
    incidentDate: "11/31/2020",
    incidentTime: "sometime",
    incidentDescription: "something happened",
    personsInvolved: "some random people",

    incidentInjuries: "somebody got their lips slapped off",
    injuriesResponse: "911 was called",
    theftOrDamage: "lips were subsequently trampled on and crushed",
    recurrenceActionTaken: "warned the person they shouldn't be such a smart alec",
    witnessesPresent: "yes, several",

    comments: "exhilarating!"
  }

  self.sampleReport2 = {
    reportID: "002",
    name: "Gary Vaughan",
    contactInfo: "a phone number",
    dateToday: "12/30/2020",
    relationship: "security",
    incidentDate: "12/31/2020",
    incidentTime: "11:59 pm",
    incidentDescription: "something happened",
    personsInvolved: "nobody"
  };



  return self;
};



module.exports = () => {
  return new returnObj();
}