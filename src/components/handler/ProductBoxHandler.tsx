import { FC } from "react";
import {
  ProductCollection1,
  ProductCollection10,
  ProductCollection11,
  ProductCollection12,
  ProductCollection2,
  ProductCollection3,
  ProductCollection4,
  ProductCollection5,
  ProductCollection7,
  ProductCollection8,
  ProductTabCollection1,
  ProductTabCollection10,
  ProductTabCollection11,
  ProductTabCollection3,
  ProductTabCollection4,
  ProductTabCollection5,
  ProductTabCollection6,
  ProductTabCollection8,
  ProductTabCollection9,
} from "../Collections";

type Props = {
  data?: any;
};

const ProductBoxHandler: FC<Props> = ({ data }) => {
  return data && data?.setting ? (
    data?.setting?.template === "tab11-sidebar-slider-grid" ? (
      <ProductTabCollection11
        data={data}
        title="title1"
        inner="title-inner1"
        designClass="section-b-space product-christmas p-t-0"
        cartClass="cart-info cart-wrap"
      />
    ) : data?.setting?.template === "tab10-sidebar-slider-grid" ? (
      <ProductTabCollection10 data={data} />
    ) : data?.setting?.template === "tab9-sidebar-slider-grid" ? (
      <ProductTabCollection9 data={data} spanClass={true} />
    ) : data?.setting?.template === "tab8-sidebar-slider-grid" ? (
      <ProductTabCollection8 data={data} />
    ) : data?.setting?.template === "tab7-sidebar-slider-grid" ? (
      <ProductTabCollection6
        data={data}
        designClass="ratio_square"
        cartClass="cart-detail"
      />
    ) : data?.setting?.template === "tab6-sidebar-slider-grid" ? (
      <ProductTabCollection5 data={data} />
    ) : data?.setting?.template === "tab5-slider-grid" ? (
      <ProductTabCollection4 data={data} bgClass="bg-block" />
    ) : data?.setting?.template === "tab4-slider-grid" ? (
      <ProductTabCollection3
        data={data}
        spanClass={true}
        designClass="tools-grey ratio_square"
      />
    ) : data?.setting?.template === "tab3-slider-grid" ? (
      <ProductTabCollection1
        data={data}
        inner="title-inner1"
        designClass="section-b-space p-t-0 ratio_asos"
        cartClass="cart-info cart-wrap"
      />
    ) : data?.setting?.template === "hover-grid" ? (
      <ProductCollection12 data={data} col="metro" />
    ) : data?.setting?.template === "collection8-slider-grid" ? (
      <ProductCollection11 data={data} />
    ) : data?.setting?.template === "collection7-grid" ? (
      <ProductCollection10 data={data} />
    ) : data?.setting?.template === "collection6-sidebar-slider-grid" ? (
      <ProductCollection8
        data={data}
        designClass="bag-product ratio_square"
        cartClass="cart-detail"
      />
    ) : data?.setting?.template === "collection5-sidebar-slider-grid" ? (
      <ProductCollection7 data={data} cartClass="cart-box" />
    ) : data?.setting?.template === "collection4-slider-grid" ? (
      <ProductCollection5
        data={data}
        cartClass="cart-detail"
        designClass="addtocart_count ratio_square"
      />
    ) : data?.setting?.template === "collection3-sidebar-slider-grid" ? (
      <ProductCollection4
        data={data}
        titleClass="title4"
        inner="title-inner4"
        designClass="section-b-space section-t-space addtocart_count ratio_square"
        cartClass="cart-info cart-wrap"
      />
    ) : data?.setting?.template === "collection2-sidebar-slider-grid" ? (
      <ProductCollection1
        data={data}
        line={true}
        // designClass="section-b-space ratio_asos"
        // designClass="section-b-space product-christmas"
        // designClass="section-b-space ratio_square"
        // designClass="layout9-box section-b-space ratio_asos"
        designClass="j-box ratio_square"
        cartClass="cart-info cart-wrap z-1"
        productDetail="h-50"
        // cartClass="cart-box"
        // cartClass="cart-detail"
        // cartClass="cart-info"
      />
    ) : data?.setting?.template === "collection1-sidebar-slider-grid" ? (
      <ProductCollection2
        data={data}
        spanClass={true}
        designClass="section-b-space tools-grey border-box ratio_square"
      />
    ) : data?.setting?.template === "collection-sidebar-slider-grid" ? (
      <ProductCollection3
        data={data}
        designClass="ratio_asos"
        cartClass="cart-detail"
        inner="title-inner1"
        innerClass="title1"
      />
    ) : (
      <p className="py-5 text-center text-danger">Please configure again</p>
    )
  ) : null;
};

export default ProductBoxHandler;
