
export function renderMarkup(data, renderRef) {
    const markup = data
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
      <a href="${largeImageURL}" title="${tags}">
      <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" height="350"/>
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <span>${likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b>
          <span>${views}</span>
        </p>
        <p class="info-item">
          <b>Comments</b>
          <span>${comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b>
          <span>${downloads}</span>
        </p>
      </div>
      </div>
        `;
    })
    .join('');

  renderRef.insertAdjacentHTML('beforeend', markup);
}

export function cleanMarckup(markup) {
  markup.innerHTML = '';
}