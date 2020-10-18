import galleryTpl from '../templates/picture-gallery.hbs';
import refs from './refs';

function updatePicturesMarkup(pictures) {
  const markup = galleryTpl(pictures);
  refs.picturesContainer.insertAdjacentHTML('beforeend', markup);
}

export default updatePicturesMarkup;