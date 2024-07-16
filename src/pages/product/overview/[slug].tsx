import { betterParse } from "@/helpers/misc";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import SeoHead from "../../../components/layout/seo/head";
import { CardBtn } from "../../../components/widgets/product-box/includes/btns";
import { GET_PRODUCT_DETAILS } from "../../../helpers/services/api";
import { getQueryRequest } from "../../../helpers/services/request";
import PageViewer from "../../../libs/pageBuilder/pageViewer";
import { selectStoreData } from "../../../redux-handler/reducers/storeDataReducer";
import { getLinkFromState } from "../../../redux-handler/reduxHandler";

export default function ProductOverview() {
  const router = useRouter();
  let storeData = useSelector(selectStoreData);
  let data = storeData?.data;
  const { slug } = router.query;
  const [product, setProduct] = useState<any>([]);
  const [overview, setOverview] = useState<any>([]);
  const [overviewData, setOverviewData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      let prod: any = getLinkFromState(storeData.menu_all, slug, "product");
      if (typeof prod === "string" && prod?.length > 0) callAPI(prod);
    } else {
    }
  }, [slug, storeData.menu_all]);

  const callAPI = async (id: any) => {
    const res = await getQueryRequest(`${GET_PRODUCT_DETAILS}/${id}`);
    setLoading(false);
    if (res?.success && res?.status_code === 200) {
      setProduct(res?.data);
      let ovr =
        res?.data.overview && res?.data.overview !== ""
          ? betterParse(res?.data.overview)
          : {};
      setOverview(ovr);
      let first =
        ovr && ovr.data && ovr.data.length > 0 ? ovr.data[0].body : [];
      setOverviewData(first);

      if (
        (ovr.method === "1" && ovr.has) ||
        (ovr.data.length === 0 && ovr.url)
      ) {
        router.push(ovr.url);
      }
    }
  };

  if (loading)
    return (
      <div
        className="mx-0 mt-4 row margin-default"
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          display: "flex",
          minHeight: "500px",
        }}
      >
        Loading....
      </div>
    );

  return !loading && product && Object.keys(product).length > 0 ? (
    <div style={{ minHeight: "500px" }}>
      <SeoHead
        title={product?.name}
        description={product?.seo?.description}
        keywords={product?.seo?.keywords}
        url={`${data?.store_info?.domain}/product/${slug}`}
        image={product?.thumbnail.src}
      />
      <Tab.Container id="left-tabs-example" defaultActiveKey="0">
        <Container>
          <div className="mb-2 d-flex flex-column flex-lg-row justify-content-end align-items-center">
            <div>
              <Nav variant="pills">
                {overview &&
                  Object.keys(overview).length > 0 &&
                  overview.data &&
                  overview.data.length > 0 &&
                  overview.data.map((item: any, i: number) => (
                    <Nav.Item key={i}>
                      <Nav.Link
                        eventKey={i}
                        onClick={() => setOverviewData(item.body)}
                      >
                        {item.label}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                <Nav.Item className="ml-3">
                  <CardBtn
                    product={product}
                    style="details"
                    className="border nav-link"
                    preOrder={false}
                  />
                </Nav.Item>
              </Nav>
            </div>
          </div>
        </Container>
        {overviewData && overviewData.length > 0 && (
          <PageViewer value={overviewData || overview.data[0].body} />
        )}
      </Tab.Container>
    </div>
  ) : (
    <div>Loading....</div>
  );
}
