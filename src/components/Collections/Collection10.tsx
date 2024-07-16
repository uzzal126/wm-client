import Link from "next/link";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Container, Row } from "reactstrap";
import { linkHandler } from "../../helpers/misc";
import PostLoader from "../../helpers/preloader/PostLoader";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import ProductSection from "../widgets/product-box/ProductBox11";
import { useQueryProducts } from "./hooks/useQueryProducts";

type Props = {
  data: any;
};

const ProductCollection10: FC<Props> = ({ data }) => {
  const settings = data?.setting;
  let storeData = useSelector(selectStoreData);
  const allMenus = storeData.menu_all;
  const cat_list = Array.isArray(data) ? data?.filter(e => e?.id !== 0) : [];
  if (cat_list.length === 0) return <></>;
  let ids = cat_list.map(obj => JSON.stringify(obj.id)).join(",");
  const param = `/${ids}?page=1&items_per_page=${
    settings?.show?.no_of_item_show || 20
  }`;

  const { loading, products, hasMore } = useQueryProducts(param);

  return (
    <>
      <section className="section-b-space ratio_asos">
        <Container>
          <div>
            {!products || products.length === 0 || loading ? (
              <div className="mx-0 row margin-default">
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
            ) : (
              <>
                <Row
                  className="game-product grid-products"
                  xl={data?.setting?.show?.desktop_row}
                  lg={data?.setting?.show?.tablet_row}
                  sm={data?.setting?.show?.mobile_row}
                >
                  {products &&
                    products.length > 0 &&
                    products.map((product, index) => (
                      <ProductSection product={product} key={index} />
                    ))}
                </Row>
                {hasMore && (
                  <div className="my-4">
                    <div style={{ textAlign: "center" }}>
                      <Link
                        href={linkHandler(
                          Array.isArray(data?.list) && data?.list?.length > 0
                            ? data?.list[0]
                            : 0,
                          allMenus
                        )}
                        className="rounded btn btn-sm btn-outline-primary"
                      >
                        More Products <i className="ml-2 fa fa-arrow-right" />
                      </Link>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export { ProductCollection10 };
