import Link from "next/link";

type Props = {
  link?: string;
  text?: string;
  onClickFunc?: () => any;
  fontSize?: number | string;
  showIcon?: boolean;
  textSize?: number | string;
};

function ContinueShoppingBtn({
  link = "/",
  text = "Continue Shopping",
  onClickFunc = () => null,
  fontSize = 30,
  textSize = 16,
  showIcon = true,
}: Props) {
  return (
    <Link href={link} onClick={onClickFunc}>
      <div className="d-flex align-items-center justify-content-center">
        <div
          style={{
            background: "var(--theme-deafult)",
            color: "white",
          }}
          className="p-3 rounded-sm d-flex align-items-center"
        >
          {showIcon && (
            <i
              className="fa fa-shopping-cart"
              style={{
                fontSize: fontSize,
              }}
            />
          )}
          <span
            style={{ color: "white", fontWeight: 600, fontSize: textSize }}
            className="mx-3"
          >
            {text}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ContinueShoppingBtn;
