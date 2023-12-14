import Book from '../models/book.model';

export const getAllBooks = async (userId) => {
  try {
    const data = await Book.find({ admin_user_id: userId });

    return data;
  } catch (error) {
    throw new Error('Error fetching all notes: ' + error.message);
  }
};
