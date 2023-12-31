import express from 'express';
import * as orderController from '../controllers/order.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/',userAuth , orderController.addToOrder);

router.get('/',userAuth, orderController.getOrders);

export default router;
