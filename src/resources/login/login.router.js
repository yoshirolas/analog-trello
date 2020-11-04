const router = require('express').Router();
const loginService = require('./login.service');

router.route('/').post(async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const token = await loginService.getToken({ login, password });
    res.status(200).json(token);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
