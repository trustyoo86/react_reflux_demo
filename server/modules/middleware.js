import express    from 'express';
import bodyParser from 'body-parser';

/**
 * @name middleware
 * @description
 *  express로 생성된 server를 use 등으로 사용할 수 있도록 만듬
 * @param {object} server express를 통해 생성한 server 객체
 */
module.exports = (server) => {
    server.use(express.static(path.join(__dirname, '..', '..', 'dist')));
    server.use('/node_modules/', express.static(path.join(__dirname, '..', '..', '/node_modules')));
    server.use(bodyParser.urlencoded({extended : true}));
    server.use(bodyParser.json());
    server.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    server.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
    });
};