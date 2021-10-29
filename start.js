/*

  separating logic between this file and server.js
  makes testing easier...

*/


const app = require('./server.js');

const apiPort = process.env.PORT || 5000;

// start server on the specified port, binding host
app.listen(apiPort, function () {
  console.log("server started on " + apiPort);
});