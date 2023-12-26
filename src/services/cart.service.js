import { error } from '@hapi/joi/lib/base';
import Cart from '../models/cart.model';
import Book from '../models/book.model';

export const addToCart = async (book_id,bookDetails) => {
  try {
    const bookData = await Book.findOne({ _id:book_id });

    if (!bookData) {
      throw new Error('Book not found');
    }

    if (bookData.quantity <= 0) {
      throw new Error('Book is out of stock');
    }

    await Book.findByIdAndUpdate(
      { _id: book_id },
      { quantity: bookData.quantity - 1 },
      { new: true }
    );

    const updateResult = await Cart.findOneAndUpdate(
      { user_id: bookDetails.user_id, 'items.book_id': book_id },
      {
        $inc: {
          'items.$.quantity': 1,
          total: bookData.price
        }
      },
      { new: true }
    );

    if (!updateResult) {
      const cartData = await Cart.findOne({ user_id: bookDetails.user_id });

      if (!cartData) {
        const data = await Cart.create({
          user_id: bookDetails.user_id,
          items: [
            {
              book_id: bookData._id,
              bookImage:bookData.bookImage,
              bookName: bookData.bookName,
              price: bookData.price,
              quantity: 1
            }
          ],
          total: bookData.price
        });
        return data;
      }

      cartData.items.push({
        book_id: bookData._id,
        bookImage:bookData.bookImage,
        bookName: bookData.bookName,
        price: bookData.price,
        quantity: 1
      });

      cartData.total += bookData.price;
      await cartData.save();

      return cartData;
    }

    return updateResult;
  } catch (error) {
    throw new Error('Error adding to cart: ' + error.message);
  }
};

export const removeFromCart = async (book_id, bookDetails) => {
  try {
    const cartData = await Cart.findOne({
      user_id: bookDetails.user_id
    });

    if (!cartData) {
      throw new Error('Item not found in the cart.');
    }

    const itemIndex = cartData.items.findIndex(
      (item) => item.book_id === book_id
    );

    console.log('itemIndex:', itemIndex);

    if (itemIndex !== -1) {
      cartData.items.splice(itemIndex, 1);

      await cartData.save();

      console.log('Item removed successfully.');

      return cartData;
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

export const ispurchase = async (bookDetails) => {
  try {
    const cartData = await Cart.findOne({
      user_id: bookDetails.user_id
    });

    if (cartData.items.length === 0) {
      throw new Error('Cart is empty');
    }

    cartData.isParchese = true;
    await cartData.save();

    return cartData;
  } catch (error) {
    console.error('Error in ispurchase:', error);
    throw error;
  }
};

