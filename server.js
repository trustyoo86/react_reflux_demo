'use strict';
var express = require('express');
var http = require('http');
var fs = require('fs');
var AppConfig = require('./appConfig');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + '/dist'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
var userApi = require('./rest_api/users');

app.post('/api/user/signin', userApi.signin);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

var server = http.createServer(app);

var io = require('socket.io')(server);

//socket.io
io.on('connection', function (socket) {
  console.log('websocket is connected!');
  console.log(socket.id);
  console.log(socket.requestedProtocols);
  socket.on('toServer', function (data) {
    console.log(data);
    socket.emit('fromServer', {data:'hi?!Im Server!'});
  });
  socket.emit('fromServer', {data:'hi?'});

  socket.on('requestId', function (data) {
    console.log('resquest id is mount!');
    socket.emit('responseId', {id : socket.id});
  });



  socket.on('message', function (data) {
    io.emit('message', {
      response : {
        from : 'browser',
        sendData : data
      }
    });
  });
});

server.listen(AppConfig.httpConfig.port, function () {
  console.log('Server listen to localhost:8080');
});