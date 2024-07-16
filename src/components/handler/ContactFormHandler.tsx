import { Button, Col, Container, Form, Row } from "react-bootstrap";

const ContactFormHandler = ({ data }: { data?: any }) => {
  return (
    <section className="section-b-space blog-section">
      <Container>
        <div
          className="p-3 mx-auto rounded shadow box"
          style={{ maxWidth: 560 }}
        >
          {data?.body &&
            data?.body?.form &&
            data?.body?.form?.fields.map((field: any, i: any) => (
              <Row key={i}>
                {field.fields &&
                  field.fields.length > 0 &&
                  field.fields.map(
                    (child: any, j: any) =>
                      field.show && (
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId={`field-${i}`}
                            key={j}
                          >
                            {field.label && (
                              <Form.Label>
                                {child.label} {field.required ? "*" : ""}
                              </Form.Label>
                            )}
                            <Form.Control
                              type={child.type}
                              as={
                                child.type === "textarea" ? "textarea" : "input"
                              }
                              placeholder={child.placeholder}
                              required={field.required}
                            />
                          </Form.Group>
                        </Col>
                      )
                  )}
              </Row>
            ))}
          <div className={`text-${data?.body?.form?.button?.position}`}>
            <Button
              variant={data?.body?.form?.button?.variant}
              type={data?.body?.form?.button?.type}
              className="rounded"
            >
              {data?.body?.form?.button?.text}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactFormHandler;
