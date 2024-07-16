import { useCart } from "@/contexts/cart/CartContext";
import { getProductURL, getThumbnail } from "@/helpers/misc";
import Link from "next/link";
import { Fragment } from "react";
import { Media } from "reactstrap";

const CartHeader = ({ item, symbol }: any) => {
  const { removeFromCart } = useCart()

  return (
    <Fragment>
      <li>
        <div className="media">
          <Link href={getProductURL(item)}>
            <Media alt="" className="mr-3" src={getThumbnail(item)} />
          </Link>
          <div className="media-body">
            <Link href={getProductURL(item)}>
              <h4>{item.name || item?.title}</h4>
            </Link>
            {item?.variants &&
              item?.variants?.length > 1 &&
              item?.variant >= 0 && (
                <>
                  <h4>
                    {item?.variants[item?.variant]?.option1 &&
                      item?.variants[item?.variant]?.value1 && (
                        <span>{`${item?.variants[item?.variant]?.option1} : ${item?.variants[item?.variant]?.value1
                          }`}</span>
                      )}
                  </h4>
                  <h4>
                    {item?.variants[item?.variant]?.option2 &&
                      item?.variants[item?.variant]?.value2 && (
                        <span>{`${item?.variants[item?.variant]?.option2} : ${item?.variants[item?.variant]?.value2
                          }`}</span>
                      )}
                  </h4>
                  <h4>
                    {item?.variants[item?.variant]?.option3 &&
                      item?.variants[item?.variant]?.value3 && (
                        <span>{`${item?.variants[item?.variant]?.option3} : ${item?.variants[item?.variant]?.value3
                          }`}</span>
                      )}
                  </h4>
                </>
              )}
            <h4>
              <span>
                {item.qty} x {symbol}{" "}
                {/* {(item.price - (item.price * item.discount) / 100).toFixed(2)} */}
                {item?.variant >= 0
                  ? item?.variants[item?.variant]?.selling_price -
                  (item?.discount?.amount || 0)
                  : item?.price?.min - (item?.discount?.amount || 0)}
                {/* {(item?.total)?.toFixed(2)} */}
              </span>
            </h4>
          </div>
        </div>
        <div className="close-circle">
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={() => removeFromCart(item)}
          ></i>
        </div>
      </li>
    </Fragment>
  );
};

export default CartHeader;
