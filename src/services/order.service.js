import Order from '../models/order.model';
import Cart from '../models/cart.model';
import Address from '../models/address.model';

export const addToOrder = async (bookDetails) => {
  try {
    const cartItems = await Cart.findOne({ user_id: bookDetails.user_id });
    if(!cartItems){
      throw new Error("no cart items")
    }
    const address = await Address.findOne({user_id: bookDetails.user_id});
    if(!address){
      throw new Error("no address found ")
    }
    const addressData = address.address.find((val)=>val._id == bookDetails.data)
    if (!addressData) {
      throw new Error("Address not found for the specified _id");
    }
    

    const orderData = await Order.findOne({ user_id: bookDetails.user_id });

    

    if (!orderData) {
     console.log("sadhbfjfvihsdfhisdfsdf")
      const data = await Order.create({
        user_id: bookDetails.user_id,
        orderData:[{
        items: cartItems.items,
        total: cartItems.price,
        address: [
          {
            fullName:addressData.fullName,
            mobileNumber:addressData.mobileNumber,
            address: addressData.address,
            city: addressData.city,
            state: addressData.state,
            type: addressData.type,
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
          address: addressData.address,
          city: addressData.city,
          state: addressData.state,
          type: addressData.type
        }
      ],
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
