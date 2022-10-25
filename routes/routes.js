const checkAuth = require('../middleware/auth')
const router = require('express').Router();
const oauth = require('../controllers/oauth');
const wishlist = require('../controllers/wishlist');
const readings = require('../controllers/readings');
const users = require('../controllers/users');
const shelf = require('../controllers/shelf');
let i = 0
//Goes to the GitHub loginpage
router.get('/login', oauth.login);
//Comes back from the login screes
router.get('/loginCallback', oauth.loginCallback);

//manager/wishlist/

router.get('/wishlist/', checkAuth.auth, wishlist.getAllWishlist);
router.post('/wishlist/', checkAuth.auth, wishlist.createWish);
router.get('/wishlist/findByAuthor', checkAuth.auth, wishlist.findByAuthor);
router.get('/wishlist/findByTitle', checkAuth.auth, wishlist.findByTitle); 
router.get('/wishlist/findByGenre', checkAuth.auth, wishlist.findByGenre); 
router.get('/wishlist/:id', checkAuth.auth, wishlist.getSingleWish);
router.put('/wishlist/:id',checkAuth.auth, wishlist.updateWish);
router.delete('/wishlist/:id',checkAuth.auth, wishlist.deleteWish);
//


//manager/readings/
router.get('/readings/', checkAuth.auth, readings.getAllReadings); 
router.post('/readings/', checkAuth.auth, readings.createReading); 
router.get('/readings/:id', checkAuth.auth, readings.getSingleReading); 
router.put('/readings/:id',checkAuth.auth, readings.updateReading); 
router.delete('/readings/:id',checkAuth.auth, readings.deleteReading); 


//manager/users/
router.get('/users/', checkAuth.auth, users.getAllUsers); 
router.post('/users/', checkAuth.auth, users.createUser); 
router.get('/users/:id', checkAuth.auth, users.getSingleUser); 
router.put('/users/:id',checkAuth.auth, users.updateUser); 
router.delete('/users/:id',checkAuth.auth, users.deleteUser);

//manager/shelf/
router.get('/shelf/', checkAuth.auth, shelf.getAllShelf); 
router.post('/shelf/', checkAuth.auth, shelf.createShelf); 

router.get('/shelf/findByAuthor/', checkAuth.auth, shelf.findByAuthor);
router.get('/shelf/findByTitle/', checkAuth.auth, shelf.findByTitle); 
router.get('/shelf/findByGenre/', checkAuth.auth, shelf.findByGenre); 

router.get('/shelf/:id', checkAuth.auth, shelf.getSingleShelf); 
router.put('/shelf/:id',checkAuth.auth, shelf.updateShelf); 
router.delete('/shelf/:id',checkAuth.auth, shelf.deleteShelf); 



module.exports = router;