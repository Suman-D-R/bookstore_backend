import express from 'express';
import * as bookController from '../controllers/book.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('', userAuth, bookController.getAllBooks);

router.get('/sortbyprice/:sortBy', userAuth, bookController.getSortByPrice);

router.get('/sortbysearch', userAuth, bookController.getSearchBooks);



export default router;
