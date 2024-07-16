import { ProductSlider } from "@/components/widgets/productSlider";
import CountdownTimer from "@/helpers/countdown-component/countdown";
import { check_date_expiry } from "@/helpers/misc";
import PostLoader from "@/helpers/preloader/PostLoader";
import {
  productsApi,
  useGetProductByCampaignQuery,
} from "@/redux-handler/api/slices/productSlice";
import { useAppDispatch } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

export default function CampaignSingle({ data }: { data: any }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getProducts();
  }, []);

  // rtk query is req
  const {
    data: campaignProds,
    error: campErr,
    isLoading: campProdsLoading,
  } = useGetProductByCampaignQuery(`/${data?.id}/?page=1&items_per_page=10`);
  const getProducts = async () => {
    const param = `/${data?.id}/?page=1&items_per_page=10`;
    const res = await dispatch(
      productsApi.endpoints.getProductByCampaign.initiate(param)
    );

    if (res.isSuccess) {
      if (res.data.success && res.data.status_code === 200) {
        setProducts(res?.data?.data || []);
      } else {
        setProducts([]);
      }
      setLoading(res.isLoading);
    }
  };

  const todayInUnix = Date.now() / 1000;

  if ((!loading && check_date_expiry(todayInUnix, data?.end_at)) || !data?.id) {
    return <></>;
  }

  if (loading)
    return (
      <div className="row mx-0 margin-default mt-4">
        <div className="col-xl-3 col-lg-4 col-6">
          <PostLoader />
        </div>
        <div className="col-xl-3 col-lg-4 col-6">
          <PostLoader />
        </div>
        <div className="col-xl-3 col-lg-4 col-6">
          <PostLoader />
        </div>
        <div className="col-xl-3 col-lg-4 col-6">
          <PostLoader />
        </div>
      </div>
    );

  if (products?.length === 0)
    return (
      <div className="col-xs-12">
        <div>
          <div className="col-sm-12 empty-cart-cls text-center">
            <img src={""} className="img-fluid mb-4 mx-auto" alt="" />
            <h3>
              <strong>No Products Found</strong>
            </h3>
            {/* <h4>Explore more shortlist some items.</h4> */}
          </div>
        </div>
      </div>
    );

  return (
    <section
      className={"section-b-space ratio_asos"}
      // style={{
      //     ...styleGenaretor(dataSet?.setting?.styles)
      // }}
    >
      <Container>
        <div className={`justify-content-between d-flex align-items-center`}>
          <div className="title-basic">
            <h2 className="title">
              <i className="ti-bolt"></i>
              {data?.name || "New"}
              <br /> <small className="text-muted">{""}</small>
            </h2>
            <div>
              <CountdownTimer time={data?.end_at} />
            </div>
          </div>
          <Link href={`/campaign/${data?.id}`}>
            <Button variant="outline">Shop More</Button>
          </Link>
        </div>
        <ProductSlider
          data={products}
          loading={loading}
          cartClass={"cart-info cart-wrap"}
          settings={{
            show: {
              desktop_row: 6,
              mobile_row: 3,
              no_of_item_show: 10,
              tablet_row: 5,
            },
            slider: {
              dots: false,
              autoplay: true,
              arrow: true,
            },
          }}
        />
      </Container>
    </section>
  );
}
