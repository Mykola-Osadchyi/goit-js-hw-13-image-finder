import { error, info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import apiService from './apiService.js'
import refs from './refs';
import updatePicturesMarkup from './update-gallery-markup.js';
import LoadMoreBtn from './components/load-more-button';

import showInModal from './modal';

const loadMoreBtn = new LoadMoreBtn({
  selector: 'button[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', searchResult);
refs.picturesContainer.addEventListener('click', showInModal);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function searchResult(event) {
  event.preventDefault();
  const form = event.currentTarget;
  apiService.query = form.elements.query.value;

  if (!apiService.query) {
    error({ text: 'The field is empty. Please enter a specific query.' });
    return;
  } 

  clearPicturesContainer();
  apiService.resetPage();
  fetchImages();
  form.reset();
}

function fetchImages() {
  loadMoreBtn.disable();

  apiService.fetchPictures().then(hits => {
    if (hits.length === 0) {
      info({ text: 'Images not found', });
      loadMoreBtn.hide();
      return;
    } else {
    updatePicturesMarkup(hits);
    loadMoreBtn.show();
    loadMoreBtn.enable();}
  });
};

function clearPicturesContainer() {
  refs.picturesContainer.innerHTML = '';
};