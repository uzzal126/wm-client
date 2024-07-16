import { ShopQuery } from "./type";

export const queryStringify = (queryParam: ShopQuery) => {
  let url = "";
  let param = {
    page: queryParam.page.toString(),
    items_per_page: queryParam.items_per_page.toString(),
    brand: queryParam.brand.toString(),
    filter: queryParam.filter.toString(),
    max_price: queryParam.max_price.toString(),
    min_price: queryParam.min_price.toString(),
    sort: (queryParam.sort && queryParam.sort.toString()) || "",
    order: (queryParam.order && queryParam.order.toString()) || "",
    search: queryParam.search.toString(),
  };
  const params = Object.fromEntries(
    Object.entries(param).filter(([_, v]) => v !== "")
  );

  const queryString = new URLSearchParams(params).toString();
  if (queryParam.category_slug) {
    url = `${queryParam.category_slug}/?${queryString}`;
  } else {
    url = `?${queryString}`;
  }
  return url;
};
