import { error } from '@hapi/joi/lib/base';
import WishList from '../models/wishlist';
import Book from '../models/book.model';

export const addToWishlist = async (book_id, bookDetails) => {
  try {
    console.log(bookDetails);

    const bookData = await Book.findOne({ _id: book_id });
    if (!bookData) {
      throw new Error("book not found");
    }

    let wishlistData = await WishList.findOne({ user_id: bookDetails.user_id });

    if (!wishlistData) {
      // If wishlist doesn't exist, create a new one with the item
      const data = await WishList.create({
        user_id: bookDetails.user_id,
        items: [
          {
            book_id: bookData._id,
            bookName: bookData.bookName,
            price: bookData.price,
            bookImage: bookData.bookImage,
          },
        ],
      });
      return data;
    }

    // Check if the item is already in the wishlist
    const isItemInWishlist = wishlistData.items.some(
      (item) => item.book_id === book_id
    );

    if (isItemInWishlist) {
      // If item is in the wishlist, remove it
      wishlistData = await WishList.findOneAndUpdate(
        { user_id: bookDetails.user_id },
        { $pull: { items: { book_id: book_id } } },
        { new: true }
      );
    } else {
      // If item is not in the wishlist, add it
      wishlistData = await WishList.findOneAndUpdate(
        { user_id: bookDetails.user_id },
        {
          $push: {
            items: {
              book_id: bookData._id,
              bookName: bookData.bookName,
              price: bookData.price,
              bookImage: bookData.bookImage,
            },
          },
        },
        { new: true }
      );
    }

    return wishlistData;
  } catch (error) {
    throw new Error('Error updating wishlist: ' + error.message);
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
