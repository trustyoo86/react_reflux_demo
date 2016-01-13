var generic_pool = require('generic-pool');
var mysql = require('mysql');
var appConfig = require('../appConfig');
var pool = generic_pool.Pool({
                              name : 'mysql',
                              //DB Connection 생성
                              create : function (cbFunc) {
                                var config = appConfig.dbConfig;
                                var client = mysql.createConnection(config);

                                client.connect(function (error) {
                                  if (error) {
                                    console.log(error);
                                  }
                                  cbFunc(error, client);
                                });
                              },
                              //DB Connection 소멸
                              destroy : function (client) {
                                client.end();
                              },
                              min : 1,
                              max : 100,
                              idleTimeoutMillis : 300000,
                              log : false
                            });

process.on('exit', function () {
  pool.drain(function () {
    pool.destroyAllNow();
  });
});

module.exports = pool;