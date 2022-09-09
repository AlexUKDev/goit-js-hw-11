import axios from "axios";
const KEY_API = '29756284-9fd5906fdaeaa95b8e4b48e13';
const BASE_URL = 'https://pixabay.com';

export async function axiosRequst(query, pageNumb) {
   const optionsRequest = {
    baseURL: BASE_URL,
    method: 'get',
    params: {
      key: KEY_API,
      q: query,
      image_type: "photo",
      orientaton: "horizontal",
      page: pageNumb,
      per_page: 40,
      safesearch: true
    }
  }
  const response = await axios.get('api/', optionsRequest);
  // console.log(response);
  // Here is Obj but return promise in global!
  return response
}

export async function axiosMoreRequst(query,pageNumb) {
   const optionsRequest = {
    baseURL: BASE_URL,
    method: 'get',
    params: {
      key: KEY_API,
      q: query,
      image_type: "photo",
      orientaton: "horizontal",
      page: pageNumb,
      per_page: 40,
      safesearch: true
    }
  }
  const response = await axios.get('api/', optionsRequest);
  // console.log(response);
  // Here is Obj but return promise in global!
  return response
}