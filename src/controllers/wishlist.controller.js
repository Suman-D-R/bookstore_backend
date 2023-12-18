import HttpStatus from 'http-status-codes';
import * as wishlist from '../services/wishlist.service';

export const addToWishlist = async (req, res) => {
  try {
    const data = await wishlist.addToWishlist(req.body);
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

export const getAllWishListitems = async (req, res) => {
  try {
    const data = await wishlist.getAllWishListitems(req.body);
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

export const removeFromWishlist = async (req, res) => {
  try {
    const data = await wishlist.removeFromWishlist(req.params._id, req.body);
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
