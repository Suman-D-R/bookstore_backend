import Book from '../models/book.model';

export const getAllBooks = async () => {
  try {
    const data = await Book.find({});

    return data;
  } catch (error) {
    throw new Error('Error fetching all notes: ' + error.message);
  }
};

export const getSortByPrice = async (sortBy) => {
  try {
    const data = await Book.find({});

    if (sortBy == 'low') {
      data.sort((a, b) => a.discountPrice - b.discountPrice);
    }
    if (sortBy == 'high') {
      data.sort((a, b) => b.discountPrice - a.discountPrice);
    }

    return data;
  } catch (error) {}
};

export const getSearchBooks = async (searchTerm) => {
  try {
    const allBooks = await Book.find({});

    const searchData = allBooks.filter((book) => {
      return book.bookName.includes(searchTerm);
    });

    return searchData;
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};
