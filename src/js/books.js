import { getBooksByCategory } from './api.js';
import {
  createTopBooksList,
  hideShowMoreBtn,
  topBooksListEl,
  allTopBooks,
  getBooksPerScreen,
} from './render-functions.js';

const dropdownMenuEl = document.querySelector('.dropdown-menu');
const showMoreBtnEl = document.querySelector('.show-more-btn');

let page = 1;
let perPage = 4;

// Show more button
const onClick = e => {
  showMoreBtnEl.blur();

  page += 1;

  const booksForScreen = getBooksPerScreen();

  const start = booksForScreen + (page - 2) * perPage;
  const end = start + perPage;
  const nextBooks = allTopBooks.slice(start, end);

  createTopBooksList(nextBooks);

  if (end >= allTopBooks.length) {
    hideShowMoreBtn();
    iziToast.error({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'bottomCenter',
    });
  }
};
showMoreBtnEl.addEventListener('click', onClick);

// Select category from dropdown menu
async function onClickedCategory(e) {
  topBooksListEl.innerHTML = '';
  page = 1;

  getBooksPerScreen();

  const selectedCategory = e.target.textContent;
  const books = await getBooksByCategory(selectedCategory);

  createTopBooksList(books);
}
dropdownMenuEl.addEventListener('click', onClickedCategory);
