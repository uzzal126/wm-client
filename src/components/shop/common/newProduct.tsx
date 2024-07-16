import SkeletonLoader from "@/components/spinners/SkeletonLoader";
import { productsApi } from "@/redux-handler/api/slices/productSlice";
import { useAppDispatch } from "@/store";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Slider from "react-slick";
import { Media } from "reactstrap";
import {
  getProductURL,
  getThumbnail,
  groupByThree,
} from "../../../helpers/misc";
import {
  PriceParties,
  RatingMake,
} from "../../widgets/product-box/includes/parties";

type Props = {
  data: any;
};

const NewProduct: FC<Props> = ({ data }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    const id = data?.ids?.join();

    const param = `/${id}?page=1&items_per_page=${
      data?.setting?.show?.no_of_item_show || 20
    }`;
    const res = await dispatch(
      productsApi.endpoints.getProductByCategory.initiate({ params: param })
    );

    if (res.isSuccess) {
      if (res.data.success && res.data.status_code === 200) {
        const group: any = groupByThree(res?.data?.data, 3);
        setProducts(group || []);
      } else {
        setProducts([]);
      }
      setLoading(res.isLoading);
    }
  };

  if (loading)
    return (
      <div className="theme-card">
        <h5 className="title-border">{data?.title || "Recent Products"}</h5>
        <SkeletonLoader amount={3} />
      </div>
    );
  if (!products || products?.length === 0) return <></>;

  return (
    <div className="theme-card">
      <h5 className="title-border">{data?.title || "Recent Products"}</h5>

      <Slider className="offer-slider slide-1">
        {products && products.length > 0 ? (
          products.map((groupProduct: any, i: number) => (
            <div key={i}>
              {groupProduct.length > 0 &&
                groupProduct.map((product: any, index: number) => (
                  <div className="media" key={index}>
                    <Link href={getProductURL(product)}>
                      <Media
                        className="img-fluid blur-up lazyload"
                        src={getThumbnail(product)}
                        alt={product?.thumbnail?.alt}
                      />
                    </Link>
                    <div className="media-body align-self-center">
                      <RatingMake total={product?.rating?.avg} size={16} />
                      <Link href={getProductURL(product)}>
                        <h6>{product.name}</h6>
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

export default NewProduct;
