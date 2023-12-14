import HttpStatus from 'http-status-codes';
import * as bookService from '../services/book.service';

export const getAllBooks = async (req, res) => {
  try {
    const data = await bookService.getAllBooks(req.body.user_id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};
