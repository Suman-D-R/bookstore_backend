import express from 'express';
import * as bookController from '../controllers/book.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('', userAuth, bookController.getAllBooks);

router.post('/addtocart', userAuth, bookController.addToCart);

router.get('/getCartitems', userAuth, bookController.getAllCartitems);

router.delete('/removefromcart/:_id', userAuth, bookController.removeFromCart);

router.post('/wishlist', userAuth, bookController.addToWishlist);

router.get('/getWishlistItems', userAuth, bookController.getAllWishListitems);

export default router;
