import HttpStatus from 'http-status-codes';
import * as orderService from '../services/order.service';

export const addToOrder = async (req, res) => {
  try {
    const data = await orderService.addToOrder(req.body);
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

export const getOrders = async (req,res)=>{
  try{
    const data = await orderService.getOrder(req.body.user_id);
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