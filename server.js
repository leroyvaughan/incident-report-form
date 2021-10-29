const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
require('./server/lib/global-vars');

const db = require('./server/db');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const appRouter = require('./server/routes/router');

const app = express();
app.use(cors());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use('/api', appRouter);




if(!process.env.isServer) {
    /*  DEBUG MODE  */
    app.get('/', (req, res) => {
        res.send('Hello Worlds!');
    })
}
else{
    /*  PRODUCTION BUILD */
    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, 'client/build')));

    // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}




module.exports = app;