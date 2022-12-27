interface IParams {
  rentType?: string;
  min?: number;
  max?: number;
  currency?: 'usd' | 'byn';
  onlyOwner?: boolean;
}

const getRequestUrl = ({ rentType, min, max, currency, onlyOwner }: {
  rentType?: string;
  min?: number;
  max?: number;
  currency?: 'usd' | 'byn';
  onlyOwner?: boolean;
}) => {
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