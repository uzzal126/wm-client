import React, { FC } from "react";
import { Container, Row, Col, Media } from "reactstrap";

const service1 = "/assets/images/icon/service1.png";
const service2 = "/assets/images/icon/service2.png";
const service3 = "/assets/images/icon/service3.png";
const service4 = "/assets/images/icon/service4.png";

const Data = [
  {
    img: service1,
    title: "free shipping",
    service:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. ",
  },
  {
    img: service2,
    title: "24 X 7 service",
    service:
      "Contrary to popular belief, Lorem Ipsum is not simply random text.",
  },
  {
    img: service3,
    title: "festival offer",
    service:
      "Contrary to popular belief, Lorem Ipsum is not simply random text.",
  },
  {
    img: service4,
    title: "online payment",
    service:
      "Contrary to popular belief, Lorem Ipsum is not simply random text.",
  },
];

type Props = {
  img: any;
  title: any;
  service: any;
};

const ServiceContent: FC<Props> = ({ img, title, service }) => {
  return (
    <Col lg="3" md="6" className="service-block1">
      <Media src={img} alt="" />
      <h4>{title}</h4>
      <p>{service} </p>
    </Col>
  );
};
const ServiceLayout2 = () => {
  return (
    <Container>
      <section className="service section-b-space  border-section border-top-0">
        <Row className="partition4 ">
          {Data.map((data, i) => {
            return (
              <ServiceContent
                key={i}
                img={data.img}
                title={data.title}
                service={data.service}
              />
            );
          })}
        </Row>
      </section>
    </Container>
  );
};

export { ServiceLayout2 };
