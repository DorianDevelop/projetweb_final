const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
const authController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth')


router.route('/signup')
    .post(asyncHandler(checkEmail), asyncHandler(authController.signup));

router.route('/signin')
    .post(asyncHandler(authController.signin));

router.post('/', auth, (req, res)=>{
    res.send(req.user)
})

module.exports = router;