import { getDateTimeStampObj } from '../misc/helpers';

const SampleData = () => {

  const formData = {
    postAction: 'save',
    curStep: 'summaryView',
    reportID: "001",
    name: "Gary Vaughan",
    email: 'garyvaughan1221@gmail.com',
    phone: "2535551221",
    relationship: "security",
    briefDescription: "Someone was wildin' out and got checked.",
    dateToday: "11/30/2020",
    dateObj: getDateTimeStampObj(),
    incidentDate: "11/31/2020",
    incidentTime: "12:21",
    incidentDescription: "An irate person was being rude to people and being disrespectful to Church staff",
    personsInvolved: "Some random people and one unlucky victim",
    incidentInjuries: "Yup, Somebody got their lips slapped off!",
    injuriesResponse: "911 was called",
    theftOrDamage: "YES, their lips were subsequently trampled on and crushed!  :-(",
    recurrenceActionTaken: "The vicitim was warned that they shouldn't be such a smart alec in the future...",
    witnessesPresent: "yes, several. lol",
    comments: "exhilarating!",
    attachments: {
      img1: {
        base64String: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAABDElEQVR42u3SMQEAAAgDoJnc6FrA0xMyUMl04FmJhViIhVhiIRZiIRaIhViIBWIhFmKBWIiFWCAWYiEWiIVYiAViIRZigViIhVggFmIhFoiFWIgFYiEWYoFYiIVYIBZiIRaIhViIBWIhFmKBWIiFWCAWYiEWiIVYiAViIRZigViIhVggFmIhFoiFWIgFYiEWYoFYiIVYIBZiIRaIhViIBWIhFmKBWIiFWIglFmIhFmKBWIiFWCAWYiEWiIVYiAViIRZigViIhVggFmIhFoiFWIgFYiEWYoFYiIVYIBZiIRaIhViIBWIhFmKBWIiFWCAWYiEWiIVYiAViIRZigViIhVggFmIhFoiFWIgFtwWFo+BrzonMUQAAAABJRU5ErkJggg==",
        imgName: 'sample blue',
        imgSize: 1009,
        imgType: 'png'
      },
      img2: {
        base64String: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAABIElEQVR42u3SMREAAAjEMN6/aEAAI2NyldB01Qa/YiyMhbEwlrEwFsbCWGAsjIWxwFgYC2OBsTAWxgJjYSyMBcbCWBgLjIWxMBYYC2NhLDAWxsJYYCyMhbHAWBgLY4GxMBbGAmNhLIwFxsJYGAuMhbEwFhgLY2EsMBbGwlhgLIyFscBYGAtjgbEwFsYCY2EsjAXGwlgYC4yFsTAWGAtjYSwwFsbCWGAsjIWxwFgYC2OBsTAWxsJYxsJYGAtjgbEwFsYCY2EsjAXGwlgYC4yFsTAWGAtjYSwwFsbCWGAsjIWxwFgYC2OBsTAWxgJjYSyMBcbCWBgLjIWxMBYYC2NhLDAWxsJYYCyMhbHAWBgLY4GxMBbGAmNhLIwFxsJYGAtuAyoWK3r5Q+B5AAAAAElFTkSuQmCC",
        imgName: 'sample red',
        imgSize: 1009,
        imgType: 'png'
      }
    },
    emailTo: "me@me.com, you@you.com"
  };

  return formData;
};

export {
  SampleData
}

