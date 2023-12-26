import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
  user_id: {
    type: String
  },
  items: [
    {
      book_id: {
        type: String
      },
      bookImage:{
        type:String
      },
      bookName: {
        type: String
      },
      price: {
        type: Number
      },
      quantity: {
        type: Number
      }
    }
  ],
  total: {
    type: Number,
    default: 0
  },
  isParchese: {
    type: Boolean,
    default: false
  }
});

export default model('Cart', cartSchema);
