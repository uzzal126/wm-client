import Link from "next/link";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";

// import { CardBtn } from "@/components/widgets/product-box/includes/btns";
import { PriceParties } from "@/components/widgets/product-box/includes/parties";
import { useWishlist } from "@/contexts/wishlist/WishlistContext";
import { ImageHelper } from "@/helpers/lazy-load-image/image-lazy-load";
import { getThumbnail } from "../../../helpers/misc";

export default function WishList() {
  const { removeFromWish, wishlistItems: wishlist, isLoading } = useWishlist();

  if (isLoading)
    return (
      <div className="d-flex align-items-center flex-column">
        <Spinner
          animation="border"
          variant="primary"
          style={{ width: 50, height: 50 }}
        />
      </div>
    );

  return (
    <div>
      {wishlist && wishlist?.length > 0 ? (
        <Container>
          <Row>
            <Col sm="12">
              <table className="table ">
                <thead>
                  <tr className="table-head wishlist-header">
                    <th scope="col">Product Image</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                {wishlist &&
                  wishlist?.length > 0 &&
                  wishlist?.map((item: any, index: any) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td className="align-middle no-border">
                            <div
                              style={{
                                maxWidth: 70,
                              }}
                            >
                              <Link href={`/product/${item?.slug}`}>
                                <ImageHelper
                                  src={
                                    item?.variants?.length >= 0 &&
                                    item?.variants[0]?.thumbnail?.length > 5
                                      ? item?.variants[0]?.thumbnail
                                      : getThumbnail(item)
                                  }
                                  className="rounded img-fluid"
                                  alt=""
                                />
                              </Link>
                            </div>
                          </td>
                          <td className="align-middle no-border">
                            <Link href={`/product/${item.slug}`}>
                              <h4 className="wishlist-text">
                                {item?.title || item?.name}
                              </h4>
                            </Link>
                          </td>
                          <td className="align-middle no-border">
                            <PriceParties
                              product={item}
                              styles="wishlist-price"
                            />
                          </td>
                          <td className="align-middle no-border">
                            {/* <CardBtn product={item} style="wishlist" /> */}
                            <Button
                              variant="danger"
                              size="sm"
                              className="m-1 border-0 rounded wishlist-delete"
                              onClick={() => removeFromWish(item)}
                            >
                              <i className="px-1 py-1 fa fa-trash" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            </Col>
          </Row>
        </Container>
      ) : (
        <section className="cart-section section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <div>
                  <div className="my-2 text-center col-sm-12 empty-cart-cls">
                    <h3>
                      <strong>Your Wishlist is Empty</strong>
                    </h3>
                    <h4>Explore more shortlist some items.</h4>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </div>
  );
}
