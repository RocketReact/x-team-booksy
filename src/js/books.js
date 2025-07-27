import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

async function getTopBooks() {
  const BASE_URL = 'https://books-backend.p.goit.global/books/top-books';

  try {
    const response = await axios.get(`${BASE_URL}`);

    return response.data;
  } catch (error) {
    console.log(error);

    return [];
  }
}

const topBooksListEl = document.querySelector('.top-books-list');
const showMoreBtnEl = document.querySelector('.show-more-btn');

function createTopBooksList(books) {
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

const showShowMoreBtn = () => showMoreBtnEl.classList.remove('is-hidden');
const hideShowMoreBtn = () => showMoreBtnEl.classList.add('is-hidden');

let page = 1;
let perPage = 4;
let allTopBooks = [];

getTopBooks().then(data => {
  const firstTopBook = data.flatMap(el => el.books);

  const booksWithPrice = firstTopBook.filter(book => book.price > 0);
  const uniqNameBooks = booksWithPrice.filter(book => book.title);

  allTopBooks = uniqNameBooks;

  const screenWidth = window.innerWidth;
  const booksForScreen = screenWidth >= 768 ? 24 : 10;
  const firstTopTenBooks = uniqNameBooks.slice(0, booksForScreen);

  if (firstTopTenBooks.length > 0) {
    createTopBooksList(firstTopTenBooks);
  }

  if (uniqNameBooks.length > booksForScreen) {
    showShowMoreBtn();
  } else {
    hideShowMoreBtn();
  }
});

const onClick = e => {
  showMoreBtnEl.blur();

  page += 1;

  const screenWidth = window.innerWidth;
  const booksForScreen = screenWidth >= 768 ? 24 : 10;
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
