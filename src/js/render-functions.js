import { getCategoryList, getTopBooks } from './api.js';

export const topBooksListEl = document.querySelector('.top-books-list');
const dropdownMenuEl = document.querySelector('.dropdown-menu');
const showMoreBtnEl = document.querySelector('.show-more-btn');

const allCategories = await getCategoryList();
const categoryName = allCategories.map(category => category.list_name);

export let allTopBooks = [];
export let page = 1;
export const perPage = 4;

// Render functions for displaying books and categories
export function displayBooks(books, isInitialLoad) {
  topBooksListEl.innerHTML = '';
  resetPage();

  const filterBooks = filterDublicateBooks(books);

  updateAllBooks(filterBooks);

  const booksForScreen = getBooksPerScreen();
  const firstBook = filterBooks.slice(0, booksForScreen);

  if (firstBook.length > 0) {
    createTopBooksList(firstBook);
  }

  if (isInitialLoad) {
    createCategoryBooksList(categoryName);
  }
  if (filterBooks.length > booksForScreen) {
    showShowMoreBtn();
  } else {
    hideShowMoreBtn();
  }
}

export function createTopBooksList(books) {
  const markup = books
    .map(
      book => `
        <li class="top-book-item">
            <img
              class="top-book-img"
              src="${book.book_image}"
              alt="${book.title}"
              width="343" height="488"
              loading="lazy"
            />
          <div class="top-book-info">
          <div class="top-book-info-wrap">
            <h3 class="top-book-title">${book.title}</h3>
            <p class="top-book-price">$${book.price}</p>
            </div>
            <p class="top-book-author">${book.author}</p>
          </div>
          <button class="top-book-btn" type="button">
            Learn More
          </button>
        </li>
      `
    )
    .join('');

  topBooksListEl.insertAdjacentHTML('beforeend', markup);
}

async function createCategoryBooksList(arr) {
  const markup = arr
    .map(item => `<li class="dropdown-item"><p>${item}</p></li>`)
    .join('');

  dropdownMenuEl.insertAdjacentHTML('beforeend', markup);
}
// !
export async function createShowCase(count, total) {
  topBooksListEl.innerHTML = '';
  const markup = `<p>Showing ${count} of ${total}</p>`;

  showCountEl.insertAdjacentHTML('beforeend', markup);
}

// Pagination functions
export function getBooksPerScreen() {
  const screenWidth = window.innerWidth;
  return screenWidth >= 768 ? 24 : 10;
}

export function getPage() {
  return page;
}

export function incrementPage() {
  page += 1;
}

export function resetPage() {
  page = 1;
}

// Filter and utility functions
function filterDublicateBooks(books) {
  const uniqueTitle = new Set();

  return books.filter(book => {
    if (book.price <= 0) return false;
    if (!book.title) return false;

    const normalizeTitle = book.title.trim().toLowerCase();

    if (uniqueTitle.has(normalizeTitle)) return false;

    uniqueTitle.add(normalizeTitle);
    return true;
  });
}

export function updateAllBooks(books) {
  allTopBooks.length = 0;
  allTopBooks.push(...books);
}

export const showShowMoreBtn = () =>
  showMoreBtnEl.classList.remove('is-hidden');

export const hideShowMoreBtn = () => showMoreBtnEl.classList.add('is-hidden');

getTopBooks().then(data => {
  const initialBooks = data.flatMap(el => el.books);
  displayBooks(initialBooks, true);
});
