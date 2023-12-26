import Address from '../models/address.model';

export const addAddress = async (userDetails) => {
  try {
    const userData = await Address.findOne({ user_id: userDetails.user_id });

    if (!userData) {
      const data = await Address.create({
        user_id: userDetails.user_id,
        address: [
          {
            fullName: userDetails.fullName,
            mobileNumber: userDetails.mobileNumber,
            address: userDetails.address,
            city: userDetails.city,
            state: userDetails.state,
            type: userDetails.type
          }
        ]
      });
      return data;
    }

    userData.address.push({
      fullName: userDetails.fullName,
      mobileNumber: userDetails.mobileNumber,
      address: userDetails.address,
      city: userDetails.city,
      state: userDetails.state,
      type: userDetails.type
    });

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
