/**
 * @name websocket-server
 * @description
 *  websocket server
 *  socket.io를 이용하여 server 구성
 * @param {object} server express를 통해 생성한 server
 */
module.exports = (server) => {
    var io = require('socket.io')(server);

    //connection event
    io.on('connection', (socket) => {

        //socket toServer event
        socket.on('toServer', (data) => {
            socket.emit('fromServer', { data: 'hi?Im Server!' });
        });
    });
};