import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { getBooksByCategory } from './api.js';
import {
  displayBooks,
  getBooksPerScreen,
  createTopBooksList,
  hideShowMoreBtn,
  getPage,
  incrementPage,
  allTopBooks,
} from './render-functions.js';
import iziToast from 'izitoast';

const dropdownMenuEl = document.querySelector('.dropdown-menu');
const showMoreBtnEl = document.querySelector('.show-more-btn');

const perPage = 4;

// Show more button
const onClick = e => {
  showMoreBtnEl.blur();

  incrementPage();
  const page = getPage();

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
  const selectedCategory = e.target.textContent;
  const books = await getBooksByCategory(selectedCategory);

  displayBooks(books);
}
dropdownMenuEl.addEventListener('click', onClickedCategory);
