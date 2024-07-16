import { CompareContext } from "@/contexts/Compare/CompareContext";
import CartContext from "@/contexts/cart";
import { WishlistContext } from "@/contexts/wishlist/WishlistContext";
import PostLoader from "@/helpers/preloader/PostLoader";
import { getProductsByCatId } from "@/helpers/services/request";
import { Fragment, useContext, useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { Container } from "reactstrap";
import ProductBox from "../widgets/product-box/ProductBox9";

type Props = {
  data?: any;
  col?: any;
};

const ProductCollection12 = ({ data, col }: Props) => {
  const cartContext: any = useContext(CartContext);
  const wishlistContext: any = useContext(WishlistContext);
  const compareContext: any = useContext(CompareContext);
  const quantity = cartContext.quantity;

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let ids = data?.list.map((obj: any) => JSON.stringify(obj.id)).join(",");
    getProducts(ids);
  }, [data]);

  const getProducts = async (id: string | number) => {
    setLoading(true);
    const res = await getProductsByCatId(
      id,
      data?.setting?.show?.no_of_item_show
    );
    if (res.success && res.status_code === 200) {
      setProducts(res.data);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <section className="portfolio-section portfolio-padding metro-section port-col">
        <Container fluid={col == "full"}>
          <Masonry
            breakpointCols={col == "metro" ? 4 : 6}
            className="isotopeContainer row"
            columnClassName={`isotopeSelector ${
              col == "metro"
                ? "col-xl-3 col-sm-6"
                : "col-xl-2 col-lg-3 col-md-4 col-sm-6"
            }`}
          >
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <ProductBox product={product} key={index} overlay={false} />
              ))
            ) : (
              <>
                <PostLoader />
                <PostLoader />
                <PostLoader />
              </>
            )}
          </Masonry>
        </Container>
      </section>
    </Fragment>
  );
};

export { ProductCollection12 };
