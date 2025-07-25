import axios from 'axios';

async function getTopBooks() {
  const BASE_URL = 'https://books-backend.p.goit.global/books/top-books';

  const response = await fetch(`${BASE_URL}`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
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

getTopBooks()
  .then(data => {
    const topBooks = data.flatMap(category => category.books);
    allTopBooks = topBooks;
    const firstTopBook = topBooks.slice(0, 10);

    createTopBooksList(firstTopBook);

    if (allTopBooks.length > 10) {
      showShowMoreBtn();
    }
  })
  .catch(err => console.log(err));

const onClick = e => {
  page += 1;

  const start = 10 + (page - 2) * perPage;
  const end = start + perPage;
  const nextBooks = allTopBooks.slice(start, end);

  createTopBooksList(nextBooks);

  if (end > allTopBooks.length) {
    hideShowMoreBtn();
  }
};

showMoreBtnEl.addEventListener('click', onClick);
