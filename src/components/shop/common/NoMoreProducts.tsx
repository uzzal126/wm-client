import ContinueShoppingBtn from "@/components/buttons/ContinueShoppingBtn";

function NoMoreProducts() {
  return (
    <div>
      <div className="text-center col-sm-12 empty-cart-cls">
        <img
          src={`/assets/images/empty-search.jpg`}
          className="mx-auto mb-4 img-fluid"
          alt=""
        />
        <h3>
          <strong>No Products Found!</strong>
        </h3>
        <h4>Explore more shortlist some items.</h4>
        <div className="mt-3">
          <ContinueShoppingBtn
            link="/shop"
            text="Explore More"
            onClickFunc={() => null}
            fontSize={22}
            showIcon={false}
          />
        </div>
      </div>
    </div>
  );
}

export default NoMoreProducts;
