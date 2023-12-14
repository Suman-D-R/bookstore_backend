import express from 'express';
import * as bookController from '../controllers/book.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('', userAuth, bookController.getAllBooks);

export default router;
