const checkAuth = require('../middleware/auth')
const router = require('express').Router();
const controller = require('../controllers/controller')

//Goes to the GitHub loginpage
router.get('/login',controller.login);
//Comes back from the login screes
router.get('/loginCallback', controller.loginCallback);

router.get('/', checkAuth.auth, controller.getAll);

router.get('/content/:id', checkAuth.auth, controller.findContent);

router.get('/:id', checkAuth.auth, controller.getSingle);

router.post('/',checkAuth.auth, controller.createBookmark);

router.put('/:id',checkAuth.auth, controller.updateBookmark);

router.delete('/:id',checkAuth.auth, controller.deleteBookmark);


module.exports = router;