import simpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from '../src/js/fetch-function';

const formEl = document.querySelector('#search-form');
const inputEL = document.querySelector('input[name = "searchQuery"]');
const searchBtn = formEl.querySelector('button');
const galleryEL = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let perPage = 40;
let page = 1;
let request = inputEL.value;
let totalPages = null;

searchBtn.addEventListener('click', onSearchImg);

async function onSearchImg(event) {
  event.preventDefault();
  galleryEL.innerHTML = '';
  const request = inputEL.value.trim();
  page = 1;
  if (request === '') {
    Notiflix.Notify.failure('Enter search request please');
    return;
  }

  fetchImages(request, page, perPage)
    .then(res => {
      totalPages = Math.ceil(res.totalHits / perPage);
      console.log(totalPages);
      console.log(res);
      if (res.hits.length > 0) {
        Notiflix.Notify.success(`Hooray! We found ${res.totalHits} images.`);
        renderGallery(res);
        gallery.refresh();
        if (page < totalPages) {
          loadMoreBtnToggle();
        } else {
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        galleryEL.innerHTML = '';
      }
    })
    .catch(error => console.log(error.message));
}

function renderGallery(image) {
  const markup = image.hits
    .map(attribute => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = attribute;

      return `<div class="image-card">
      <a href="${largeImageURL}">
  <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="image-thumb">
  <p class="image-info"><b>Views:</b> ${views}</p>
  <p class="image-info"><b>Comments:</b> ${comments}</p>
  <p class="image-info"><b>Downloads:</b> ${downloads}</p>
  <p class="image-info"><b>Likes:</b> ${likes}</p>
  </div>
  </div>`;
    })
    .join('');
  galleryEL.insertAdjacentHTML('beforeend', markup);
}

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  animationSpeed: 150,
});

function loadMoreBtnToggle() {
  loadMoreBtn.classList.toggle('visually-hidden');
}

function loadMoreImages() {
  request = inputEL.value;
  page += 1;

  fetchImages.totalPages = Math.ceil(request.totalHits / perPage);

  fetchImages(request, page, perPage).then(request => {
    renderGallery(request);
    gallery.refresh();
    if (page === totalPages) {
      loadMoreBtnToggle();
    }
  });
}

loadMoreBtn.addEventListener('click', loadMoreImages);
