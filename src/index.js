import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from "notiflix";

const refs = {
  form:document.querySelector('#search-form'),
  submit: document.querySelector('[type="submit"]'),
  moreBtn: document.querySelector('button[type="button"].load-more'),
  renderDiv: document.querySelector('div.gallery')

}

refs.form.addEventListener('submit', onSubmit)

const KEY = '29756284-9fd5906fdaeaa95b8e4b48e13';
const BASE_URL = 'https://pixabay.com/api/';

// const options = {
//   key: KEY,
//   q: "cat",
//   image_type: "photo",
//   orientation: "horizontal",
//   safesearch: "true",
//   page: "1",
//   per_page: "40",
// }

axios.defaults.baseURL = BASE_URL;
// axios.defaults.headers.common['Authorization'] = KEY;


function onSubmit(e) {
  e.preventDefault();

  let inputValue = e.currentTarget.elements.searchQuery.value;
  console.log(inputValue);

 axios.get(`?key=${KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&page=1&per_page=40`)
  .then(res => {
    // console.log(res.data.hits)
    renderMarkup(res.data.hits)
  });
}

function renderMarkup(image) {
    const markup = image
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
      <a class="photo-link" href="${largeImageURL}">
        <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy"  width="300" height="300"/>
      </a>

    <p class="info-item">
      <b> Лайки:
       ${likes}</b>
    </p>
    <p class="info-item">
      <b> Просмотры: ${views}</b>
    </p>
    <p class="info-item">
      <b> Комментарии: ${comments}</b>
    </p>
    <p class="info-item">
      <b> Загрузки: ${downloads}</b>
    </p>

`;
    })
    .join('');

  refs.renderDiv.insertAdjacentHTML('beforeend', markup);

}




















// fetch(`${BASE_URL}?key=${KEY}&q=cat&image_type=photo&orientation=horizontal`)
//   .then((res) => {
//   return res.json()
// }).then((data) => {
//   console.log(data.hits)
// }).catch(err=>console.log)