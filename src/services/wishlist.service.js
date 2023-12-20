import { error } from '@hapi/joi/lib/base';
import WishList from '../models/wishlist';
import Book from '../models/book.model';

export const addToWishlist = async (bookDetails) => {
  try {
    console.log(bookDetails)

    const bookData = await Book.findOne({ _id: bookDetails.book_id });
    if(!bookData){
      throw new Error("book not found")
    }
    const wislListData = await WishList.findOne({
      user_id: bookDetails.user_id
    });

    if (!wislListData) {
      const data = await WishList.create({
        user_id: bookDetails.user_id,
        items: [
          {
            book_id: bookData._id,
            bookName: bookData.bookName,
            price: bookData.price
          }
        ]
      });
      return data;
    }

    wislListData.items.push({
      book_id: bookData._id,
      bookName: bookData.bookName,
      price: bookData.price
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
