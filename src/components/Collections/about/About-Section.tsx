import { kebabCase, styleGenerator } from "@/helpers/misc";
import { svgFreeShipping } from "@/helpers/services/script";
import { FC } from "react";
import { Col, Container, Media, Row } from "reactstrap";

const aboutUs = "/assets/images/beauty/about-us.jpg";

type sProps = {
  service: any;
};
const ServiceSection: FC<sProps> = ({ service }) => {
  return (
    <Col sm="4" className="service-block1">
      {service?.icon.includes("webmanza.com") ? (
        <img
          src={service?.icon}
          alt={service?.title}
          style={{
            width: 30,
          }}
        />
      ) : service?.icon.includes("http") ? (
        <div dangerouslySetInnerHTML={{ __html: svgFreeShipping }} />
      ) : (
        <></>
      )}
      <i
        className={`fa ${kebabCase(service?.icon)} mx-2`}
        aria-hidden="true"
        style={{
          color: "var(--theme-deafult)",
          fontSize: "40px",
          padding: "2px",
        }}
      ></i>
      {/* // <IconPickerItem icon={service?.icon} size={24} /> */}
      <h5>{service?.title}</h5>
      <p>{service?.subtitle}</p>
    </Col>
  );
};

type Props = {
  data: any;
};
const AboutWithService: FC<Props> = ({ data }) => {
  return (
    <section
      className="beauty-about"
      style={{
        ...styleGenerator(data?.setting?.styles),
      }}
    >
      <Container>
        <Row>
          <Col xl="5" lg="6" md="12" className="text-center offset-xl-1">
            <Media
              src={data?.image || aboutUs}
              alt=""
              className="img-fluid blur-up lazyload"
            />
          </Col>
          <Col xl="5" lg="6" md="12">
            <div className="about-section">
              <div>
                <h2>{data?.title || "about us"}</h2>
                <div className="about-text">
                  {data?.details ? (
                    <div dangerouslySetInnerHTML={{ __html: data?.details }} />
                  ) : null}
                </div>
                <div className="pb-0 service small-section">
                  <Row>
                    {data?.list &&
                      data?.list.length > 0 &&
                      data?.list.map((s: any, i: number) => {
                        return <ServiceSection key={i} service={s} />;
                      })}
                  </Row>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutWithService;
