import users from '../api/users';

/**
 * @name users
 * @description
 *  express route를 활용한 user router
 * @param {object} server express를 통해 생성한 server 객체
 */
module.exports = (server) => {
    server.route('/user/:user_id')
        .get(users.signin);
}