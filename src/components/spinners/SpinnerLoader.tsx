import { Spinner } from "react-bootstrap";

function SpinnerLoader({
  height = 30,
  width = 30,
  variant = "primary",
  className = "",
}) {
  return (
    <div className={`d-flex align-items-center flex-column ${className}`}>
      <Spinner
        animation="border"
        variant={variant}
        style={{ width: width, height: height }}
      />
    </div>
  );
}

export default SpinnerLoader;
