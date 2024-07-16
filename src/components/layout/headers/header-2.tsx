import { Fragment } from "react";
import { Col, Container, Row } from "reactstrap";
import IconNav from "./common/iconNav";
import LogoImage from "./common/logo";
import MobileMenuHandler from "./common/mobile";
import NavbarHandler from "./common/navbarHandler";
import SidebarHandler from "./common/sidebarHandler";
import TopBar from "./common/topbar";

type Props = {
  data?: any;
};

const HeaderNine = ({ data }: Props) => {
  return (
    <Fragment>
      <header className="header-gym">
        <div className="mobile-fix-option"></div>
        <TopBar topClass={"top-header"} />

        <Container>
          <Row>
            <Col sm="12">
              <div className="main-menu">
                <div className="menu-left">
                  <div className="navbar pr-lg-4">
                    <div className="d-none d-xl-block">
                      <SidebarHandler data={data} bg={""} />
                    </div>
                    <div className="d-block d-xl-none">
                      <MobileMenuHandler data={data} />
                    </div>
                  </div>
                  <div className="mx-0 mx-lg-3 brand-logo position-static">
                    <LogoImage />
                  </div>
                </div>
                <div className="menu-right pull-right">
                  <div className="mt-1 d-none d-xl-block">
                    <NavbarHandler data={data?.body?.primary_menu} />
                  </div>
                  <div>
                    <IconNav hideAccount hideCompare hideWishlist />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
    </Fragment>
  );
};

export default HeaderNine;
