import { getCategoryList, getTopBooks } from './api.js';

const topBooksListEl = document.querySelector('.top-books-list');
const dropdownMenuEl = document.querySelector('.dropdown-menu');
const showMoreBtnEl = document.querySelector('.show-more-btn');

const allCategories = await getCategoryList();
const categoryName = allCategories.map(category => category.list_name);

export let allTopBooks = [];

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

getTopBooks().then(data => {
  const firstTopBook = data.flatMap(el => el.books);

  const booksWithPrice = firstTopBook.filter(book => book.price > 0);
  const uniqNameBooks = booksWithPrice.filter(book => book.title);

  allTopBooks.push(...uniqNameBooks);

  const booksForScreen = getBooksPerScreen();

  const firstTopTenBooks = uniqNameBooks.slice(0, booksForScreen);

  if (firstTopTenBooks.length > 0) {
    createTopBooksList(firstTopTenBooks);
    createCategoryBooksList(categoryName);
  }

  if (uniqNameBooks.length > booksForScreen) {
    showShowMoreBtn();
  } else {
    hideShowMoreBtn();
  }
});

export function getBooksPerScreen() {
  const screenWidth = window.innerWidth;
  return screenWidth >= 768 ? 24 : 10;
}

export const showShowMoreBtn = () =>
  showMoreBtnEl.classList.remove('is-hidden');

export const hideShowMoreBtn = () => showMoreBtnEl.classList.add('is-hidden');

export { topBooksListEl };
