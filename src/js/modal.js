import * as basicLightbox from 'basiclightbox'
import 'basiclightbox/dist/basicLightbox.min.css';

export default function showInModal(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  };
  const instance = basicLightbox.create(
    `<img src=${event.target.dataset.source}>`,
  );
  instance.show();
}