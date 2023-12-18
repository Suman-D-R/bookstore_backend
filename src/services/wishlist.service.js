import { error } from '@hapi/joi/lib/base';
import WishList from '../models/wishlist';

export const addToWishlist = async (bookDetails) => {
  try {
    const wislListData = await WishList.findOne({
      user_id: bookDetails.user_id
    });

    if (!wislListData) {
      const data = await WishList.create({
        user_id: bookDetails.user_id,
        items: [
          {
            book_id: bookDetails._id,
            bookName: bookDetails.bookName,
            price: bookDetails.price
          }
        ]
      });
      return data;
    }

    wislListData.items.push({
      book_id: bookDetails._id,
      bookName: bookDetails.bookName,
      price: bookDetails.price
    });
    await wislListData.save();

    return wislListData;
  } catch (error) {
    throw new Error('Error adding to cart: ' + error.message);
  }
};

export const getAllWishListitems = async (userDetails) => {
  try {
    const cartData = await WishList.findOne({ user_id: userDetails.user_id });
    return cartData;
  } catch {
    throw new Error('Get cartitme serror', error.message);
  }
};

export const removeFromWishlist = async (book_id, bookDetails) => {
  try {
    const wishlistData = await WishList.findOne({
      user_id: bookDetails.user_id
    });

    const itemIndex = wishlistData.items.findIndex(
      (item) => item.book_id === book_id
    );

    if (itemIndex !== -1) {
      wishlistData.items.splice(itemIndex, 1);

      await wishlistData.save();

      console.log('Item removed successfully.');

      return wishlistData;
    } else {
      throw new Error('Item not found in the cart.');
    }
  } catch (error) {
    console.error('Error removing from cart:', error.message);
    throw new Error('Error removing from cart: ' + error.message);
  }
};
