

String.prototype.Proper = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;

    return target.replace(new RegExp(search, 'g'), replacement);
};


/**
 * **************************************************************
    MISCELLANEOUS FUNCTIONS
 * **************************************************************
 */


const _isNull = function (inVar) {
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
global.isNull = _isNull;





global.getDateFromStr = function (inVal) {
    var date = inVal.replaceAll("-", "/");
    var ix = date.indexOf("T");

    if (ix >= 0) {
        date = date.substr(0, ix);
    }

    var dateObject = new Date(date);
    return dateObject.toDateString().substr(3);
}

global.getNow = function (dateIn) {
    var dt = (!isNull(dateIn)) ? dateIn : new Date();
    dt = JSON.stringify(dt);
    return dt.replaceAll('"', '');
};
global.makeTimeStamp = function () {
    //must be a date object
    var now = new Date(getNow());
    return now.getTime();
}
global.getFormattedTime = function(timeIn) {
    let time = timeIn.split(':');
    let hour = time[0];

    // Determine AM or PM suffix based on the hour
    let suffix = (hour < 12) ? "AM" : "PM";

    // Convert hour from military time
    hour = (hour < 12)? hour : hour - 12;

    // If hour is 0, set it to 12
    hour = hour || 12;

    // if(hour < 10 &&) { hour = "0" + hour }

    let returnVal = `${hour}:${time[1]} ${suffix}`;
    return returnVal;
};
global.getTimeStamp = function (now) {
    // Create an array with the current month, day and time
    var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];

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
    return [date.join("/"), time.join(":") + " " + suffix, now.getTime(), getNow(now)];
};
global.getDateTimeStampObj = function (dateIn) {
    var now = new Date();

    if (!isNull(dateIn)) {
        now = new Date(dateIn);
    }

    return getTimeStamp(now);
};














