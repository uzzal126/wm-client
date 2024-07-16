import { FC } from "react";
import { Col, Container, Row } from "reactstrap";
import MasterServiceContent from "./MasterServiceConternt";

type Props = {
  data: any;
  sectionClass: any;
};

const ServiceLayout1: FC<Props> = ({ data, sectionClass }) => {
  return (
    <Container>
      <section className={sectionClass}>
        <Row>
          {data &&
            data.list.length > 0 &&
            data.list.map((item: any, index: number) => {
              return (
                <Col
                  md={data?.list?.length > 3 ? "3" : "4"}
                  className="service-block"
                  key={index}
                >
                  <MasterServiceContent
                    icon={item.icon}
                    title={item.title}
                    service={item.content}
                  />
                </Col>
              );
            })}
        </Row>
      </section>
    </Container>
  );
};

export { ServiceLayout1 };
