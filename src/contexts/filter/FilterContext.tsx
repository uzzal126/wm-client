import { ShopQuery } from "@/components/shop/core/type";
import { createContext } from "react";

export type paramType =
  | "page"
  | "items_per_page"
  | "min_price"
  | "max_price"
  | "brand"
  | "category_slug"
  | "filter"
  | "search"
  | "all";

export interface FilterContextType extends ShopQuery {
  queryParam: ShopQuery;
  setParam: (key: string, value: string) => void;
  setParamNew: (newParams: any) => void;
  getParams: (key: paramType) => string | number | any;
  getSlug: string;
  apiSlug: string;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export default FilterContext;