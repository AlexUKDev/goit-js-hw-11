
export const FAILE_MESSADGE = "Oops, there is no results with that query. Please try again";
export const EMPTY_RESPONSE = "Sorry, there are no images matching your search query. Please try again.";
export const ERROR_MASSADGE = "ERROR";
export const END_MASSADGE = "We're sorry, but you've reached the end of search results.";
export function makeTotalMassage(totalHits) {
  return `"Hooray! We found ${totalHits} images."`
}