const checkAuth = require('../middleware/auth')
const router = require('express').Router();
const controller = require('../controllers/controller')

//Goes to the GitHub loginpage
router.get('/login',controller.login);
//Comes back from the login screes
router.get('/loginCallback', controller.loginCallback);

//manager/wishlist/
router.get('/wishlist/', checkAuth.auth, controller.getAll);

router.get('/wishlist/findByAuthor', checkAuth.auth, controller.findByAuthor);

router.get('/content/:id', checkAuth.auth, controller.findContent);

router.get('/:id', checkAuth.auth, controller.getSingle);

router.post('/',checkAuth.auth, controller.createBookmark);

router.put('/:id',checkAuth.auth, controller.updateBookmark);

router.delete('/:id',checkAuth.auth, controller.deleteBookmark);


module.exports = router;