import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', userAuth, cartController.addToCart);

router.get('/', userAuth, cartController.getAllCartitems);

router.delete('/:_id', userAuth, cartController.removeFromCart);

export default router;
