import { Button, Card, CardText, CardTitle, Col, Row } from "reactstrap";

type TypeAddressList = {
  address: any;
  selectedAdr: any;
  setSelectedAdr: any;
  handleEditAddress: any;
  handleDeleteAddress: any;
};

export default function AddressList({
  address,
  selectedAdr,
  setSelectedAdr,
  handleEditAddress,
  handleDeleteAddress,
}: TypeAddressList) {
  return (
    <Row>
      {address?.length > 0 ? (
        address?.map((item: any, indx: string | number) => (
          <Col sm="6" onClick={() => setSelectedAdr(indx)}>
            <Card body className="position-relative" key={indx}>
              <CardTitle>{item?.full_name || item?.name}</CardTitle>
              <CardText className="mb-0">
                <p>{item?.phone || item?.mobile}</p>
                <p className="mb-0">{`${
                  item?.region
                    ? (item?.region?.title ||
                        item?.region?.name ||
                        item?.region_name) + ", "
                    : ""
                } ${
                  item?.city
                    ? (item?.city?.title ||
                        item?.city?.name ||
                        item?.city_name) + ", "
                    : ""
                } ${
                  item?.area
                    ? (item?.area?.title ||
                        item?.area?.name ||
                        item?.area_name) + ", "
                    : ""
                } ${item?.address ? item?.address : ""}`}</p>
              </CardText>
              <div className="position-absolute top-0 end-0 d-flex flex-column">
                {indx == selectedAdr ? (
                  <Button color="success">
                    <i className="fa fa-check-circle" />
                  </Button>
                ) : (
                  ""
                )}
                <Button
                  color="primary"
                  className="mt"
                  onClick={() => handleEditAddress(indx)}
                >
                  <i className="fa fa-pencil"></i>
                </Button>
                <Button
                  color="danger"
                  className="mt"
                  onClick={() => handleDeleteAddress(indx)}
                >
                  <i className="fa fa-trash"></i>
                </Button>
              </div>
            </Card>
          </Col>
        ))
      ) : (
        <Col>
          <h5 style={{ textAlign: "center" }}>No Addresses.</h5>
        </Col>
      )}
    </Row>
  );
}
