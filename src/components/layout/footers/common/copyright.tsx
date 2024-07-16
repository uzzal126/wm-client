import { sectionKey } from "@/redux-handler/actions";
import { Fragment } from "react";
import { Col, Container, Row } from "reactstrap";

const CopyRight = ({ data, layout, fluid }: any) => {
  return (
    <Fragment>
      <div className={`sub-footer ${layout}`}>
        <Container fluid={fluid}>
          <Row>
            <Col xl="6" md="6" sm="12">
              <div className="footer-end position-relative ">
                {data?.copyright &&
                  data?.copyright?.list &&
                  Object.keys(data?.copyright?.list).length > 0 &&
                  Object.keys(data?.copyright?.list).map((key, i) => {
                    let splitKey = key.split("_");
                    return (
                      <Fragment key={i}>
                        {splitKey[0] === sectionKey.TEXT_BLOCK && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: data?.copyright?.list[key].content,
                            }}
                          ></div>
                        )}
                      </Fragment>
                    );
                  })}
              </div>
            </Col>
            <Col xl="6" md="6" sm="12">
              <div className="payment-card-bottom position-relative ">
                {data?.method && data?.method.url && (
                  <img src={data?.method.url} alt="" className="img-fluid" />
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default CopyRight;
