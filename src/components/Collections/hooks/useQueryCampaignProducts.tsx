import { productsApi } from "@/redux-handler/api/slices/productSlice";
import { useAppDispatch } from "@/store";
import { useEffect, useState } from "react";

export const useQueryProducts = (param: string, pageNumber: any) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any>([]);
  const [hasMore, setHasmore] = useState(false);
  const [campaignDetails, setCampaignDetails] = useState<any>({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    getProducts(param);
  }, [param, pageNumber]);

  const getProducts = async (param: string) => {
    // console.log("get prods called", param);
    setLoading(true);
    const res: any = await dispatch(
      productsApi.endpoints.getProductByCampaign.initiate(param)
    );
    // console.log({ res });
    setTimeout(() => {
      setLoading(false);
    }, 5);

    if (res.isSuccess) {
      if (pageNumber === 1) {
        const products = Array.isArray(res?.data?.data)
          ? [...res?.data?.data]
          : [];
        setProducts(products);
      } else {
        setProducts((prevProducts: any) => {
          const newArray = new Set([...prevProducts, ...res?.data?.data]);
          const products = Array.isArray(res?.data?.data) ? newArray : [];
          return products;
        });
      }
    }
    setCampaignDetails(
      Array.isArray(res?.data?.campaign_details)
        ? res?.data?.campaign_details[0]
        : res?.data?.campaign_details
    );
    //setting pagination
    if (res?.data?.payload?.pagination?.total > 0) {
      const more =
        Math.ceil(
          res?.data?.payload?.pagination?.total /
            Number(res?.data?.payload?.pagination?.items_per_page)
        ) > pageNumber;
      // console.log(more);
      setHasmore(more);
    }
  };

  return { loading, products, hasMore, campaignDetails };
};
