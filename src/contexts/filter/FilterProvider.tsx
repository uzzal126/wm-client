import { queryStringify } from "@/components/shop/core/helper";
import { ShopQuery } from "@/components/shop/core/type";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterContext, { paramType } from "./FilterContext";

export const PRICE_MAX = 100000000;

const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  let storeData = useSelector(selectStoreData);
  const { data } = storeData;
  const router = useRouter();
  const { slug, id } = router.query;
  const [queryParam, setQueryParam] = useState<ShopQuery>({
    page: Number(router.query.page) || 1,
    items_per_page: Number(router.query.items_per_page) || 10,
    min_price: Number(router.query.min_price) || 0,
    max_price:
      data?.general_settings?.shop_page?.layout === "no_sidebar"
        ? PRICE_MAX
        : Number(router.query.max_price) <= PRICE_MAX
        ? Number(router.query.max_price)
        : PRICE_MAX,
    brand: router.query.brand?.toString() || "",
    sort: router.query.sort?.toString() || "",
    order: router.query.order?.toString() || "",
    category_slug:
      (router.query.slug || router.query.category_slug)?.toString() || "",
    filter: router.query.filter || "",
    search: router.query.search?.toString() || "",
  });

  useEffect(() => {
    setQueryParam({
      brand: (router.query.brand || "").toString(),
      page: Number(router.query.page || queryParam.page) || 1,
      items_per_page:
        Number(router.query.items_per_page || queryParam.items_per_page) || 10,
      min_price:
        Number(router.query.min_price || queryParam.min_price) >= 0 &&
        Number(router.query.max_price || queryParam.max_price) <= PRICE_MAX
          ? Number(router.query.min_price || queryParam.min_price)
          : 0,
      max_price:
        data?.general_settings?.shop_page?.layout === "no_sidebar"
          ? PRICE_MAX
          : Number(router.query.max_price || queryParam.max_price) <= PRICE_MAX
          ? Number(router.query.max_price || queryParam.max_price)
          : PRICE_MAX,
      category_slug: (slug || "").toString(),
      sort: router.query.sort?.toString() || "",
      order: router.query.order?.toString() || "desc",
      filter: router.query.filter || "",
      search: (router.query.search || "").toString(),
    });
  }, [router.query]);

  const setParam = (key: string, value: string) => {
    console.log({key, value})
    let params: any = {
      ...queryParam,
    };
    if (key === "sort") {
      if (value === "idNew") {
        params["order"] = "desc";
        params["sort"] = "id";
      } else if (value === "idOld") {
        params["order"] = "asc";
        params["sort"] = "id";
      } else if (value === "nameAsc") {
        params["sort"] = "name";
        // params["sort"] = "name";
        params["order"] = "asc";
      } else if (value === "nameDesc") {
        params["sort"] = "name";
        // params["sort"] = "name";
        params["order"] = "desc";
      } else if (value === "HighToLow") {
        params["sort"] = "price";
        params["order"] = "desc";
      } else if (value === "LowToHigh") {
        params["sort"] = "price";
        params["order"] = "asc";
      }
    } else {
      params[key] = value;
    }
    const newSlug = queryStringify(params);
    if (
      router.pathname.includes("/category") ||
      router.pathname.includes("/categories")
    ) {
      router.push(`/category/${newSlug}`);
    } else if (
      router.pathname.includes("/campaign") ||
      router.pathname.includes("/campaigns")
    ) {
      router.push(`/campaign/${id}/${newSlug}`);
    } else if (router.pathname.includes("/products")) {
      router.push(`/products/?${newSlug}`);
    } else {
      router.push(`/shop/?${newSlug}`);
    }
  };
  
  const setParamNew = (newParams: any) => {
    let params: any = {
      ...queryParam,
    };
    params['min_price'] = newParams.min_price
    params['max_price'] = newParams.max_price
    // if (key === "sort") {
    //   if (value === "idNew") {
    //     params["order"] = "desc";
    //     params["sort"] = "id";
    //   } else if (value === "idOld") {
    //     params["order"] = "asc";
    //     params["sort"] = "id";
    //   } else if (value === "nameAsc") {
    //     params["sort"] = "name";
    //     // params["sort"] = "name";
    //     params["order"] = "asc";
    //   } else if (value === "nameDesc") {
    //     params["sort"] = "name";
    //     // params["sort"] = "name";
    //     params["order"] = "desc";
    //   } else if (value === "HighToLow") {
    //     params["sort"] = "price";
    //     params["order"] = "desc";
    //   } else if (value === "LowToHigh") {
    //     params["sort"] = "price";
    //     params["order"] = "asc";
    //   }
    // } else {
    //   params[key] = value;
    // }
    const newSlug = queryStringify(params);
    if (
      router.pathname.includes("/category") ||
      router.pathname.includes("/categories")
    ) {
      router.push(`/category/${newSlug}`);
    } else if (
      router.pathname.includes("/campaign") ||
      router.pathname.includes("/campaigns")
    ) {
      router.push(`/campaign/${id}/${newSlug}`);
    } else if (router.pathname.includes("/products")) {
      router.push(`/products/?${newSlug}`);
    } else {
      router.push(`/shop/?${newSlug}`);
    }
  };

  const getParams = (key: paramType) => {
    let params = { ...queryParam };
    if (key !== "all") {
      return params[key];
    } else {
      return queryParam;
    }
  };

  const getSlug = () => {
    return queryStringify(queryParam);
  };

  const apiSlug = (arg?: ShopQuery) => {
    const params = Object.fromEntries(
      Object.entries(arg || queryParam).filter(([_, v]) => v !== "")
    );

    const queryString = new URLSearchParams(params).toString();
    return queryString;
  };
  //page=1&items_per_page=10&max_price=500&min_price=0?page=1&items_per_page=10&max_price=500&min_price=0
  return (
    <FilterContext.Provider
      value={{
        ...queryParam,
        queryParam,
        setParam,
        getParams,
        setParamNew,
        getSlug: getSlug(),
        apiSlug: apiSlug(),
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within an FilterProvider");
  }
  return context;
};

export default FilterProvider;