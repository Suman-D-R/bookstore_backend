import HttpStatus from 'http-status-codes';
import * as bookService from '../services/book.service';

export const getAllBooks = async (req, res) => {
  try {
    const data = await bookService.getAllBooks();
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

export const addToCart = async (req, res) => {
  try {
    const data = await bookService.addToCart(req.body);
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

export const addToWishlist = async (req, res) => {
  try {
    const data = await bookService.addToWishlist(req.body);
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

export const removeFromCart = async (req, res) => {
  try {
    const data = await bookService.removeFromCart(req.params._id, req.body);
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

export const getAllCartitems = async (req, res) => {
  try {
    const data = await bookService.getAllCartitems(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'successfull'
    });
  } catch {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

export const getAllWishListitems = async (req, res) => {
  try {
    const data = await bookService.getAllWishListitems(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'successfull'
    });
  } catch {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};
