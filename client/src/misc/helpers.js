// String.prototype.replaceAll = function (search, replacement) {
//   var target = this;
//   return target.replace(new RegExp(search, 'g'), replacement);
// };


const toProper = function(strIn) {
  return strIn.charAt(0).toUpperCase() + strIn.slice(1);
}

const isNull = function (inVar) {
  if (typeof inVar === 'undefined') {
    return true;
  }
  else if (typeof inVar === 'string') {
    if (inVar === '') {
      return true;
    }
  }
  else if (inVar === null) {
    return true;
  }
  else if (typeof inVar === 'object') {
    if (Object.keys(inVar).length < 1) {
      return true;
    }
  }

  return false;
};


const getDate = function (inVal) {
  // var date = inVal.replaceAll("-", "/");
  let date = inVal;
  var ix = date.indexOf("T");

  if (ix >= 0) {
    date = date.substr(0, ix);
  }

  var dateObject = new Date(date);
  return dateObject.toDateString().substr(3);
}

const getNow = function (dateIn) {
  var dt = (!isNull(dateIn)) ? dateIn : new Date();
  dt = JSON.stringify(dt);
  return dt.replaceAll('"', '');
};

const makeTimeStamp = function () {
  //must be a date object
  var now = new Date(getNow());
  return now.getTime();
}

const getTimeStamp = function (now) {
  // Create an array: [year, month, day]
  var date = [now.getFullYear(), now.getMonth() + 1, now.getDate()];

  // Create an array with the current hour, minute and second
  var time = [now.getHours(), now.getMinutes(), now.getSeconds()];

  // Determine AM or PM suffix based on the hour
  var suffix = (time[0] < 12) ? "AM" : "PM";

  // Convert hour from military time
  time[0] = (time[0] < 12) ? time[0] : time[0] - 12;

  // If hour is 0, set it to 12
  time[0] = time[0] || 12;

  // If seconds and minutes are less than 10, add a zero
  for (var i = 1; i < 3; i++) {
    if (time[i] < 10) {
      time[i] = "0" + time[i];
    }
  }

  // Return the formatted string
  return [date.join("-"), time.join(":") + " " + suffix, now.getTime(), getNow(now)];
};

const getDateTimeStampObj = function (dateIn) {
  var now = new Date();

  if (!isNull(dateIn)) {
    now = new Date(dateIn);
  }

  return getTimeStamp(now);
};


const getFormattedTime = function (timeIn) {
  let time = timeIn.split(':');
  let hour = time[0];

  // Determine AM or PM suffix based on the hour
  let suffix = (hour < 12) ? "AM" : "PM";

  // Convert hour from military time
  hour = (hour < 12) ? hour : hour - 12;

  // If hour is 0, set it to 12
  hour = hour || 12;

  // if(hour < 10 &&) { hour = "0" + hour }

  let returnVal = `${hour}:${time[1]} ${suffix}`;
  return returnVal;
};


export {
  isNull,
  getDate,
  getNow,
  makeTimeStamp,
  getTimeStamp,
  getDateTimeStampObj,
  getFormattedTime,
  toProper
}