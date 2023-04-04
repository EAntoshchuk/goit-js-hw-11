const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '35004383-5cd2ee797d433f0b9be31b1f4';

function fetchImages() {
  return fetch(
    '${BASE_URL}/?key=API_KEY&q=${image}&image_type=photo&yellow+flowers=horizontal&safesearch=true'
  ).then(res => res.json());
}
