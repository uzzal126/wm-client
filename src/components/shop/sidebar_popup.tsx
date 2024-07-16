import React from "react";
import { Container, Row } from "reactstrap";
import { ShopProps } from "./core/type";
import Popupsidebar from "./common/Popupsidebr";

const SidebarPopup = ({ response }: ShopProps) => {
  return (
    <section className="section-b-space ratio_asos">
      <div className="collection-wrapper">
        <Container>
          <Row>
            <Popupsidebar
              response={response}
              // colClass=""
            />
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default SidebarPopup;
