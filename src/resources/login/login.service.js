const userService = require('./../users/user.service');
const bcrypt = require('bcrypt');
const { getJwt } = require('./../../common/jwt');
const createErr = require('http-errors');


const getToken = async ({login, password}) => {
    const users = await userService.getByLogin(login);
    for (const user of users) {
        const isValidPassword = await bcrypt.compare(password, user.password); //TODO:  move to utils
        if (isValidPassword) {
            const payload = {
                userId: user._id,
                login: user.login
            };
            const jwt = await getJwt(payload);
            return {token: jwt};
        }
    }

    throw new createErr(403, `Forbidden`);
};

module.exports = { getToken };