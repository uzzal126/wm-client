import React, { useContext } from "react";
import { Media } from "reactstrap";
import Slider from "react-slick";
import { getProducts } from "@/data/query";
import { CurrencyContext } from "@/contexts/Currency/CurrencyContext";

const NewProduct = () => {
  const CurContect: any = useContext(CurrencyContext);
  const symbol = CurContect?.state?.symbol;

  var loading = false;

  var data = getProducts("fashion");

  return (
    // <!-- side-bar single product slider start -->
    <div className="theme-card">
      <h5 className="title-border">new product</h5>
      <Slider className="offer-slider slide-1">
        <div>
          {!data || data?.length === 0 || loading ? (
            "loading"
          ) : (
            <>
              {data &&
                data?.slice(0, 3).map((product: any, index: number) => (
                  <div className="media" key={index}>
                    <a href="">
                      <Media
                        className="img-fluid blur-up lazyload"
                        src={product.images[0].src}
                        alt={product.images[0].alt}
                      />
                    </a>
                    <div className="media-body align-self-center">
                      <div className="rating">
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>
                      </div>
                      <a href={"#"}>
                        <h6>{product.title}</h6>
                      </a>
                      <h4>
                        {symbol}
                        {product.price}
                      </h4>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
        <div>
          {!data || data?.length === 0 || loading ? (
            "loading"
          ) : (
            <>
              {data &&
                data?.slice(4, 7).map((product: any, index: number) => (
                  <div className="media" key={index}>
                    <a href="">
                      <Media
                        className="img-fluid blur-up lazyload"
                        src={product.images[0].src}
                        alt={product.images[0].alt}
                      />
                    </a>
                    <div className="media-body align-self-center">
                      <div className="rating">
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>
                      </div>
                      <a href={"#"}>
                        <h6>{product.title}</h6>
                      </a>
                      <h4>
                        {symbol}
                        {product.price}
                      </h4>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </Slider>
    </div>
    //  <!-- side-bar single product slider end -->
  );
};

export default NewProduct;
