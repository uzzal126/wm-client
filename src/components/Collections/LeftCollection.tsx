import { productsApi } from "@/redux-handler/api/slices/productSlice";
import { useAppDispatch } from "@/store";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { ImageHelper } from "../../helpers/lazy-load-image/image-lazy-load";
import { getProductURL, getThumbnail, groupByThree } from "../../helpers/misc";
import PostLoader from "../../helpers/preloader/PostLoader";
import { GET_TAG_PRODUCTS, TAG_LIST } from "../../helpers/services/api";
import { getQueryRequest } from "../../helpers/services/request";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import {
  PriceParties,
  RatingMake,
} from "../widgets/product-box/includes/parties";

type Props = {
  data: any;
  tagCollection?: boolean;
  settings?: any;
  border?: any;
  show?: any;
};

const LeftCollection: FC<Props> = ({ data, tagCollection, border, show }) => {
  let storeData = useSelector(selectStoreData);
  const categoryList = storeData?.menu_list;

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any>([]);
  const [category, setCategory] = useState<any>({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    getProducts(data?.id);
  }, [data]);
  const getProducts = async (id: any) => {
    // console.log('tagCollection', tagCollection)
    if (tagCollection) {
      const res = await getQueryRequest(
        `${GET_TAG_PRODUCTS}/${id}/?page=1&items_per_page=10`
      );
      const res2 = await getQueryRequest(TAG_LIST);
      setLoading(false);

      if (res?.success && res?.data?.length > 0) {
        setProducts(groupByThree(res?.data, show || 3));
      }

      if (res2?.success && res2?.data?.length > 0) {
        const tag = res2?.data?.filter((e: any) => e?.id == id)[0];
        if (tag) {
          setCategory(tag);
        }
      }
    } else {
      const param = `/${id}?page=1&items_per_page=${
        data?.setting?.show?.no_of_item_show || 20
      }`;
      const post = { params: param };
      const res = await dispatch(
        productsApi.endpoints.getProductByCategory.initiate(post)
      );

      if (res.isSuccess) {
        if (res?.data?.success && res?.data?.status_code === 200) {
          setProducts(groupByThree(res?.data?.data, show || 3));
          setCategory(
            res?.data?.category.length > 0 ? res?.data?.category[0] : {}
          );
        } else {
          setProducts([]);
          setCategory([]);
        }
        setLoading(res.isLoading);
      }
    }
  };

  if (loading)
    return (
      <div>
        <PostLoader />
        <PostLoader />
      </div>
    );

  return (
    <div className={`theme-card ${border} `}>
      <h5 className="title-border">
        {category?.text || category?.title || "Not found!"}
      </h5>
      <Slider className="offer-slider slide-1">
        {loading ? (
          <div>
            <PostLoader />
            <PostLoader />
          </div>
        ) : products && products.length > 0 ? (
          products.map((groupProduct: any, i: number) => (
            <div key={i}>
              {groupProduct.length > 0 &&
                groupProduct.map((product: any, index: number) => (
                  <div className="media" key={index}>
                    <Link href={getProductURL(product)}>
                      <ImageHelper
                        alt={product?.thumbnail?.alt}
                        src={getThumbnail(product)}
                        className="img-fluid blur-up lazyload"
                        size
                        style={{
                          maxWidth: 150,
                        }}
                      />
                    </Link>
                    <div className="media-body align-self-center">
                      <RatingMake total={product?.rating?.avg} size={16} />
                      <Link href={getProductURL(product)}>
                        <h6>{product?.name}</h6>
                      </Link>
                      <PriceParties product={product} />
                    </div>
                  </div>
                ))}
            </div>
          ))
        ) : (
          <span>No Data Found!</span>
        )}
      </Slider>
    </div>
  );
};

export default LeftCollection;
