import axios from 'axios';

axios.defaults.baseURL = 'https://books-backend.p.goit.global/books/';

// Получает список категорий книг
export async function getCategoryList() {
  try {
    const response = await axios.get('category-list');

    return response.data;
  } catch (error) {
    console.log(error);
    //Безопасный fallback
    return [];
  }
}

// Получает список топовых книг
export async function getTopBooks() {
  try {
    const response = await axios.get('top-books');
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Получает книги по категории
export async function getBooksByCategory(category) {
  try {
    const encodedCategory = encodeURIComponent(category);
    const response = await axios.get(`category?category=${encodedCategory}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Получает информацию о книге по ID
export async function getBooksById(id) {
  try {
    const response = await axios.get(id);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Считает общее количество книг во всех категориях
export async function getTotalBooks() {
  try {
    const categories = await getCategoryList();
    if (!categories || !Array.isArray(categories)) {
      return 0;
    }
    const uniqueBookTitles = new Set();
    for (const category of categories) {
      if (category.list_name) {
        const booksData = await getBooksByCategory(category.list_name);
        if (booksData && Array.isArray(booksData)) {
          booksData.forEach(book => {
            if (book.title) {
              const normalizedTitle = book.title.trim().toLowerCase();
              uniqueBookTitles.add(normalizedTitle);
            }
          });
        }
      }
    }
    return uniqueBookTitles.size;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

// Считает общее количество книг в определенной категории
export async function getCountBooksByCategory(category) {
  try {
    const encodedCategory = encodeURIComponent(category);
    const response = await axios.get(`category?category=${encodedCategory}`);
    return response.data.length;
  } catch (error) {
    console.log(error);
    return 0;
  }
}
