import gallery from './gallery-items.js'
import { refs } from './refs.js'

const galleryMarkUp = ({ preview, original, description }) => {
    return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      >
    </a>
  </li>
  `;
};

const addListItem = gallery =>
    gallery.reduce((acc, img) => acc + galleryMarkUp(img), '');

const addToScreen = (parent, position, element) => {
    parent.insertAdjacentHTML(position, element);
};

addToScreen(refs.jsGallery, 'beforeend', addListItem(gallery));


refs.jsGallery.addEventListener('click', onOpenModal);

function onOpenModal(e) {
    e.preventDefault();
    refs.jsLightBox.classList.add('is-open');
    setAttributePicture(e.target.dataset.source, e.target.alt);
    refs.btnClose.addEventListener('click', onCloseModal);
    refs.lightBoxOverlay.addEventListener('click', onLightBoxOverlayClick);
    window.addEventListener('keydown', onKeyPress);
}
function setAttributePicture(src, alt) {
    refs.lightBoxImage.setAttribute('src', src);
    refs.lightBoxImage.setAttribute('alt', alt);
}
function onCloseModal() {
    refs.lightBoxImage.setAttribute('src', '');
    refs.lightBoxImage.setAttribute('alt', '');
    refs.jsLightBox.classList.remove('is-open');
    refs.btnClose.removeEventListener('click', onCloseModal);
    refs.lightBoxOverlay.removeEventListener('click', onLightBoxOverlayClick);
    window.removeEventListener('keydown', onKeyPress);
}

function onLightBoxOverlayClick(e) {
    if (e.target !== e.currentTarget) {
        return;
    }
    onCloseModal();
}

function onKeyPress(e) {
    if (e.code !== 'Escape') {
        return;
    }
    onCloseModal();
}


