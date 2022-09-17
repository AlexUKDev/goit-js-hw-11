
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from "notiflix";
import { form, moreBtn, renderGallery } from "./moduls/refs";
import { renderMarkup, cleanMarckup } from "./moduls/marckupFunctions";
import { FAILE_MESSADGE, ERROR_MASSADGE, EMPTY_RESPONSE, END_MASSADGE,makeTotalMassage } from "./messages";
import { axiosRequst, axiosMoreRequst } from './moduls/requestFunctions';

form.addEventListener('submit', onSubmit);
moreBtn.addEventListener('click', onMoreBtn);

let page = 1;
let inputValue = null;

// Options obj for libs
const OPTIONS_NOTIFLIX = {
  width: "430px",
  fontSize: "25px",
  timeout: "3000",
  distance:"15px",
  cssAnimationDuration:"500",
  borderRadius: "20px",
  fontAwesomeIconStyle: "shadow",
  cssAnimationStyle: "zoom",
};
const gallaryLibOptions = {
  captionType: 'attr',
  captionsData: "alt",
  captionDelay: 250
};
const gallary = new SimpleLightbox('.gallery a', gallaryLibOptions);

async function onSubmit(e) {
    e.preventDefault();
    inputValue = e.currentTarget.elements.searchQuery.value.trim();
  
      if (!inputValue) {
        Notify.warning(FAILE_MESSADGE, OPTIONS_NOTIFLIX);
        return
      } 
    page = 1;
   
    try {
        const { data } = await axiosRequst(inputValue, page);
          if (data.hits.length === 0) {
            Notify.info(EMPTY_RESPONSE, OPTIONS_NOTIFLIX);
            return
          }
      
      cleanMarckup(renderGallery);
      renderMarkup(data.hits, renderGallery);
      
    //  условия отображения кнопки Load more
        // if (data.totalHits <= 40) {
        //     moreBtn.classList.add("is-hidden");
        //   } else {
        //   moreBtn.classList.remove("is-hidden")
        // };
      
      Notify.success(makeTotalMassage(data.totalHits), OPTIONS_NOTIFLIX);
      gallary.refresh()

      } catch (err) {
        console.log(err)
        Notify.failure(ERROR_MASSADGE, OPTIONS_NOTIFLIX);
      }
}

async function onMoreBtn() {
  page += 1;

  try {
    const { data } = await axiosMoreRequst(inputValue, page);
    renderMarkup(data.hits, renderGallery);
    gallary.refresh();
    
    const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });
    
    let countOfViwedHits = data.totalHits <= page * 40;
  
    if (countOfViwedHits) {
      // moreBtn.classList.add("is-hidden");
      Notify.info(END_MASSADGE, OPTIONS_NOTIFLIX);
    }
    
  } catch (err) {
    console.log(err);
    Notify.failure(ERROR_MASSADGE, OPTIONS_NOTIFLIX);
  }
  }

window.addEventListener('scroll', infScroll)

function infScroll() {
  const documentRect = document.documentElement.getBoundingClientRect();
  // console.log('top', document.documentElement.clientHeight);
  // console.log('bottom', documentRect.bottom);
  if (documentRect.bottom < document.documentElement.clientHeight + 300) {
    onMoreBtn()
  }
}
