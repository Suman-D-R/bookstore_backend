import HttpStatus from 'http-status-codes';
import * as addressService from '../services/address.service';

export const addAddress = async (req, res) => {
  try {
    const data = await addressService.addAddress(req.body);
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

export const getAddress = async (req,res)=>{
    try{
      const data = await addressService.getAddress(req.body.user_id);
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
    
  }
