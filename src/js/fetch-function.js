import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '35004383-5cd2ee797d433f0b9be31b1f4';
let perPage = 40;
let page = 1;

export async function fetchImages(request, page, perPage) {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '35004383-5cd2ee797d433f0b9be31b1f4';

  return await axios
    .get(
      `${BASE_URL}/?key=${API_KEY}&q=${request}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
    )
    .then(res => res.data);
}
