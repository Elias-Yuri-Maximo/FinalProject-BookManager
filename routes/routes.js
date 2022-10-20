const checkAuth = require('../middleware/auth')
const router = require('express').Router();
const controller = require('../controllers/controller')

//Goes to the GitHub loginpage
router.get('/login',controller.login);
//Comes back from the login screes
router.get('/loginCallback', controller.loginCallback);

//manager/wishlist/
router.get('/wishlist/', checkAuth.auth, controller.getAllWishlist);

router.get('/wishlist/findByAuthor', checkAuth.auth, controller.findByAuthor);

router.get('/wishlist/:id', checkAuth.auth, controller.getSingleWish);

router.post('/wishlist/', checkAuth.auth, controller.createWish);

router.put('/wishlist/:id',checkAuth.auth, controller.updateWish);

router.delete('/wishlist/:id',checkAuth.auth, controller.deleteWish);

//router.get('/:id', checkAuth.auth, controller.getSingle);








module.exports = router;