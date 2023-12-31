import Address from '../models/address.model';

export const addAddress = async (userDetails) => {
  try {

    const {data,user_id}= userDetails;
    const userData = await Address.findOne({ user_id: user_id });

    

    if (!userData) {
      const response = await Address.create({
        user_id: user_id,
        address: [
          {
            fullName: data.fullName,
            mobileNumber: data.mobileNumber,
            address: data.address,
            city: data.city,
            state: data.state,
            type: data.type
          }
        ]
      });
      return response;
    }

    userData.address.push({
      fullName: data.fullName,
      mobileNumber: data.mobileNumber,
      address: data.address,
      city: data.city,
      state: data.state,
      type: data.type
    });

    console.log(userData);

    userData.save();

    return userData;
  } catch (error) {
    throw new Error('Error adding to cart: ' + error.message);
  }
};


export const getAddress = async (user_id) => {
    try{
      const data = await Address.findOne({user_id:user_id});
      if(!data){
        throw new Error('no address found')
      }
      return  data;
    }catch(error){
      throw error
    }
  }
