import {IParams, RentType} from "../types";

const getRequestUrl = ({ rentType, min, max, currency, onlyOwner }: IParams) => {
  let url = new URL('https://r.onliner.by/sdapi/ak.api/search/apartments');

  if (rentType) {
    url.searchParams.append('rentType', rentType);
  }
  if (min) {
    url.searchParams.append('price min', min.toString());
  }
  if (max) {
    url.searchParams.append('price max', max.toString());
  }
  if (currency) {
    url.searchParams.append('currency', currency);
  } else {
    url.searchParams.append('currency', 'usd');
  }
  if (onlyOwner) {
    url.searchParams.append('only_owner', 'true');
  }

  return url.href;
}

export default getRequestUrl;