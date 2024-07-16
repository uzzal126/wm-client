type Props = {
  img: string;
  prodName: string;
  price: number | string;
  qty: number | string;
};

const ProductInfo = ({ img, prodName, price, qty = 1 }: Props) => {
  return (
    <tr>
      <td colSpan={2}>
        <div className="d-flex align-items-center">
          <div className="me-5 position-relative">
            <img
              className="img-thumbnail rounded-lg mr-2"
              alt={prodName}
              src={img}
              style={{ width: "50px" }}
            />
          </div>
          <div
            className="d-flex flex-column justify-content-center mx-2"
            style={{ minWidth: "80px" }}
          >
            <span className="fs-6 text-gray-800 text-hover-primary">
              {prodName} x {qty}
            </span>
          </div>
        </div>
      </td>
      <td className="text-right font-weight-bold" colSpan={1}>
        ৳ {price}
      </td>
    </tr>
  );
};

export default ProductInfo;
