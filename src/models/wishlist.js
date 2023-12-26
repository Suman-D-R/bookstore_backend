import { Schema, model } from 'mongoose';

const wishlistSchema = new Schema({
  user_id: {
    type: String
  },
  items: [
    {
      book_id: {
        type: String
      },
      bookName: {
        type: String
      },
      price: {
        type: Number
      },
      bookImage: {
        type: String
      }
    }
  ]
});

export default model('Wishlist', wishlistSchema);
