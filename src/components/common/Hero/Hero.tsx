import { Button } from "react-bootstrap";

type fieldType = {
  image?: string;
  banner_url?: string;
  mobile_image_url: string;
  title?: string;
  button_style?: string;
  button_text?: string;
  button_url?: string;
  subtitle?: string;
};

type Props = {
  data: fieldType;
};
function Hero({ data }: Props) {
  return (
    <>
      <div className="h-100">
        <div
          className="shadow-sm d-flex d-lg-none flex-column align-items-start h-100"
          style={{
            backgroundImage: `url(${
              data?.mobile_image_url ||
              data?.image ||
              data?.banner_url ||
              "/images/dummy_pic.png"
            })`,
            minHeight: "500px",
          }}
        >
          <div
            className="px-5 py-3 mb-3 text-left d-flex flex-column justify-content-center mobile-center"
            style={{
              background: "rgba(40, 40, 40, 0.7)",
              minHeight: "500px",
              maxWidth: "600px",
              lineHeight: 1.2,
            }}
          >
            <h1 style={{ color: "white" }}>{data?.title}</h1>
            <h3 style={{ fontWeight: 500, color: "white" }}>
              {data?.subtitle}
            </h3>
            {data?.button_text && (
              <a href={data?.button_url || "#"} className="my-3">
                <Button
                  variant={data?.button_style || "primary"}
                  className="p-3 rounded"
                >
                  {data?.button_text}
                </Button>
              </a>
            )}
          </div>
        </div>
        <div
          className="rounded-lg shadow-sm d-none d-lg-flex flex-column align-items-start h-100"
          style={{
            backgroundImage: `url(${
              data?.image || data?.banner_url || "/images/dummy_pic.png"
            })`,
            minHeight: "700px",
          }}
        >
          <div
            className="px-5 py-3 mb-3 text-left d-flex flex-column justify-content-center mobile-center"
            style={{
              background: "rgba(40, 40, 40, 0.7)",
              minHeight: "700px",
              maxWidth: "600px",
              lineHeight: 1.2,
            }}
          >
            <h1 style={{ color: "white" }}>{data?.title}</h1>
            <h3 style={{ fontWeight: 500, color: "white" }}>
              {data?.subtitle}
            </h3>
            {data?.button_text && (
              <a href={data?.button_url || "#"} className="my-3">
                <Button
                  variant={data?.button_style || "primary"}
                  className="p-3 rounded"
                >
                  {data?.button_text}
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
