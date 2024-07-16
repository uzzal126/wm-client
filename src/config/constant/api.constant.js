// export const BASE_URL =
//   process.env.NODE_ENV === "production"
//     ? process.env.NEXT_PUBLIC_APP_BASE_URL
//     : process.env.NEXT_PUBLIC_APP_BASE_URL_SG;
export const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL || 'https://sg-api.webmanza.com/';
export const GET_TAG_BY_ID = `${BASE_URL}product/v2/list/by/tag`;
export const GET_CAMP_DATA = `${BASE_URL}product/v2/list/by/campaign`;
export const GET_CAMP_PRODS = `${BASE_URL}product/v2/list/by/campaign-slug`;
