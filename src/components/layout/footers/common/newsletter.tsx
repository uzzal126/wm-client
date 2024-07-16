import { Col, Row } from "react-bootstrap";
import { Button, Form, FormGroup, Input } from "reactstrap";

const Newsletter = ({ data, inner, newsletterClass }: any) => {
  return (
    <>
      {inner ? (
        <div className={`${newsletterClass || "subscribe-block"}`}>
          <h2>{data?.title}</h2>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput3"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className={`btn btn-solid my-3 ${
                  data?.btn_color ? "btn-green" : ""
                }`}
              >
                subscribe
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Row>
          <Col lg="6">
            <div className="subscribe">
              <div>
                <h4 className="pb-0">{data?.title}</h4>
                <p>{data?.subtitle}</p>
              </div>
            </div>
          </Col>
          <Col lg="6">
            <Form className="form-inline subscribe-form">
              <FormGroup className="mx-sm-3">
                <Input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter your email"
                />
              </FormGroup>
              <Button type="submit" className="mb-3 btn btn-solid">
                subscribe
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Newsletter;
