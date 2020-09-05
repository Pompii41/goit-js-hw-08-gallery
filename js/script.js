import galleryItems from "./gallery-items.js";

const ref = {
  ulGallery: document.querySelector(".gallery"),
  closeBtn: document.querySelector(
    '.lightbox__button[data-action="close-lightbox"]'
  ),
  lightBox: document.querySelector(".lightbox"),
  bigImg: document.querySelector(
    ".lightbox > .lightbox__content > .lightbox__image"
  ),
  leftButton: document.querySelector(".left"),
  rightButton: document.querySelector(".right"),
};

const createMarkup = ({ preview, original, description }) =>
  `<li class="gallery__item">
<a
  class="gallery__link"
  href= ${original}
>
  <img
    class="gallery__image"
    src=${preview}
    data-source=${original}
    alt=${description}
  />
</a>
</li>`;

const createGalery = (galleryItems) =>
  galleryItems.map((item) => createMarkup(item)).join("");

ref.ulGallery.insertAdjacentHTML("beforeend", createGalery(galleryItems));

const showImg = (e) => {
  e.preventDefault();
  ref.lightBox.classList.add("is-open");
  ref.bigImg.src = e.target.dataset.source;
};

const closeImg = (e) => {
  ref.lightBox.classList.remove("is-open");
  ref.bigImg.src = "";
};

const controlGallery = (e) => {
  if (
    e.target.classList.contains("gallery__image") &&
    !ref.lightBox.classList.contains(".is-open")
  ) {
    showImg(e);
  }

  if (
    (ref.lightBox.classList.contains("is-open") && e.target === ref.closeBtn) ||
    e.target.classList.contains(".lightbox__content") ||
    e.code === "Escape"
  ) {
    closeImg(e);
  }
};

function next() {
  const currentIndex = galleryItems.findIndex(
    (element) => element.original === ref.bigImg.src
  );
  ref.bigImg.src =
    currentIndex < galleryItems.length - 1
      ? galleryItems[currentIndex + 1].original
      : galleryItems[0].original;
}

function previous() {
  const currentIndex = galleryItems.findIndex(
    (element) => element.original === ref.bigImg.src
  );
  ref.bigImg.src =
    currentIndex === 0
      ? galleryItems[galleryItems.length - 1].original
      : galleryItems[currentIndex - 1].original;
}
ref.leftButton.addEventListener("click", previous);
ref.rightButton.addEventListener("click", next);
document.addEventListener("click", controlGallery);
document.addEventListener("keydown", controlGallery);
