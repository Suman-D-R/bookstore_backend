import { error } from '@hapi/joi/lib/base';
import Book from '../models/book.model';
import Cart from '../models/cart.model';
import WishList from '../models/wishlist';

export const getAllBooks = async () => {
  try {
    const data = await Book.find({});

    return data;
  } catch (error) {
    throw new Error('Error fetching all notes: ' + error.message);
  }
};

export const addToCart = async (bookDetails) => {
  try {
    const cartData = await Cart.findOne({ user_id: bookDetails.user_id });

    if (!cartData) {
      const data = await Cart.create({
        user_id: bookDetails.user_id,
        items: [
          {
            book_id: bookDetails._id,
            bookName: bookDetails.bookName,
            price: bookDetails.price,
            quantity: 1
          }
        ]
      });
      return data;
    }

    const existingItemIndex = cartData.items.findIndex(
      (item) => item.book_id === bookDetails._id
    );

    console.log('gudhq', existingItemIndex);

    if (existingItemIndex !== -1) {
      cartData.items[existingItemIndex].quantity += 1;
      cartData.total += bookDetails.price;
      await cartData.save();
      return cartData;
    }

    cartData.items.push({
      book_id: bookDetails._id,
      bookName: bookDetails.bookName,
      price: bookDetails.price,
      quantity: 1
    });
    cartData.total += bookDetails.price;
    await cartData.save();

    return cartData;
  } catch (error) {
    throw new Error('Error adding to cart: ' + error.message);
  }
};

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

export const removeFromCart = async (book_id, bookDetails) => {
  try {
    const cartData = await Cart.findOne({
      user_id: bookDetails.user_id
    });

    console.log('book_id:', book_id);
    console.log('bookDetails:', bookDetails);
    console.log('cartData:', cartData);

    const itemIndex = cartData.items.findIndex(
      (item) => item.book_id === book_id
    );

    console.log('itemIndex:', itemIndex);

    if (itemIndex !== -1) {
      cartData.items.splice(itemIndex, 1);

      await cartData.save();

      console.log('Item removed successfully.');

      return cartData;
    } else {
      throw new Error('Item not found in the cart.');
    }
  } catch (error) {
    console.error('Error removing from cart:', error.message);
    throw new Error('Error removing from cart: ' + error.message);
  }
};

export const getAllCartitems = async (userDetails) => {
  try {
    const cartData = await Cart.findOne({ user_id: userDetails.user_id });
    return cartData;
  } catch {
    throw new Error('Get cartitme serror', error.message);
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
