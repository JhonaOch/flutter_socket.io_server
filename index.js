const express = require('express');
const app = express();
const path = require('path');

//APp de Express
require('dotenv').config();

//Node Sever
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');











//Path publico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));




server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);
    console.log('Server is running on port', process.env.PORT);
});