import http from 'http';

/**
 * @name boot
 * @description
 *  serer를 구동시키기 위한 module
 * @param {object} server express를 통해 생성한 server
 */
module.exports = (server) => {
    http.createServer(server).listen(80, () => {
        console.log('Server start at port 80');
    });
};