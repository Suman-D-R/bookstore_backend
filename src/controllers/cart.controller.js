import HttpStatus from 'http-status-codes';
import * as cartService from '../services/cart.service';

export const addToCart = async (req, res) => {
  try {
    const data = await cartService.addToCart(req.body);
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
    const data = await cartService.removeFromCart(req.params._id, req.body);
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
    const data = await cartService.getAllCartitems(req.body);
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
