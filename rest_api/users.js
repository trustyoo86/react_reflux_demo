var dbPool = require('./dbConnection');
var appConfig = require('../appConfig');
//var Base64 = require('js-base64').Base64;

var users = {
  /**
   * sign in
   * @param req
   * @param res
   */
  signin : function (req, res) {
    var obj = req.body;
      //email = Base64.decode(obj.email),
      //password = Base64.decode(obj.password),
    try {
      var data = {
        status : 'success',
        data : {
          user_name : '테스트',
          user_id : 2,
          email : 'test@linkit.kr',
          auth_grp : 1,
          phone : '010-111-2222',
          reg_date : '2016-02-22',
          user_img : '/not_profile.png'
        }
      };

      res.json(data);
    } catch (e) {
      res.json(e.toString());
    }



  }
}

module.exports = users;