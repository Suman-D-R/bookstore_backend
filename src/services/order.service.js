import Order from '../models/order.model';
import Cart from '../models/cart.model';

export const addToOrder = async (bookDetails) => {
  try {
    console.log(bookDetails)
    const cartItems = await Cart.findOne({ user_id: bookDetails.user_id });
    if(!cartItems){
      throw new Error("no cart items")
    }
    const orderData = await Order.findOne({ user_id: bookDetails.user_id });

    

    if (!orderData) {

      const data = await Order.create({
        user_id: bookDetails.user_id,
        orderData:[{items: cartItems.items,
        total: cartItems.price,
        address: [
          {
            // fullName:bookDetails.fullName,
            // mobileNumber:bookDetails.mobileNumber,
            address: bookDetails.address,
            city: bookDetails.city,
            state: bookDetails.state,
            type: bookDetails.type
          }
        ],}]
        // date: bookDetails.data
      });
      return data;


    }

    orderData.orderData.push({
      user_id: bookDetails.user_id,
      items: cartItems.items,
      total: cartItems.price,
      address: [
        {
          address: bookDetails.address,
          city: bookDetails.city,
          state: bookDetails.state,
          type: bookDetails.type
        }
      ],
      date: bookDetails.data
    });
    await orderData.save();

    return orderData;
  } catch (error) {
    throw new Error('Error adding to cart: ' + error.message);
  }
};


export const getOrder = async (user_id) => {
  try{
    const data = await Order.findOne({user_id:user_id});
    if(!data){
      throw new Error('no orders')
    }
    return  data;
  }catch(error){
    throw error
  }
}
