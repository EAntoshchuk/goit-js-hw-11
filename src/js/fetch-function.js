import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '35004383-5cd2ee797d433f0b9be31b1f4';

export async function fetchImages(image, page, perPage) {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '35004383-5cd2ee797d433f0b9be31b1f4';

  return await axios
    .get(
      `${BASE_URL}/?key=${API_KEY}&q=${image}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
    )
    .then(res => res.data);
}
