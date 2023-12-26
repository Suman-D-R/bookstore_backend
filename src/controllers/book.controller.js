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

export const getSortByPrice = async (req, res) => {
  try {
    console.log(" response data from front end",req.body);
    const data = await bookService.getSortByPrice(req.params.sortBy);
    
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

export const getSearchBooks = async (req, res) => {
  try {
    const data = await bookService.getSearchBooks(req.body.searchTerm);
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
