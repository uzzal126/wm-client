export interface ShopResponse {
  category: any;
  data: any;
  payload: any;
  isLoading: boolean;
}

export interface ShopQuery {
  page: number;
  items_per_page: number;
  min_price: number;
  max_price: number;
  brand: string;
  filter: any;
  search: string;
  category_slug: string;
  sort?: string;
  order?: string;
}
export interface ShopProps {
  response: ShopResponse;
}
