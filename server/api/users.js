var dbPool = require('../config/dbConenction');
var appConfig = require('../config/appConfig');

var users = {
    signin : function (req, res) {
        var user_id = req.params.user_id,
            response = {
                status_cd : null,
                status_msg : null,
                data : null
            };

        dbPool.acquire((err, db) => {
            if (err) {
                return ;
            } else {
                db.query('select * from users where user_id=?', [user_id], (err, rows, fields) => {
                    if (err) {
                        response.status_cd = 500;
                        response.status_msg = err.toString();
                    } else {
                        response.status_cd = 200;
                        response.status_msg = 'Success';
                        response.data = rows[0];
                    }

                    res.json(response);
                });
            }

        });
    }
};

module.exports = users;