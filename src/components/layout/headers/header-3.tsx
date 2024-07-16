import { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import LogoImage from "./common/logo";
import MobileMenuHandler from "./common/mobile";
import NavbarHandler from "./common/navbarHandler";
import SidebarHandler from "./common/sidebarHandler";

import IconNav from "./common/iconNav";

type Props = {
  data?: any;
};

const HeaderSeven = ({ data }: Props) => {
  useEffect(() => {
    const loaderWrapper: any = document.querySelectorAll(".loader-wrapper");
    loaderWrapper.style = "display:none";
  }, []);

  return (
    <>
      <header className="header-5 position-relative">
        <div className="mobile-fix-option"></div>
        <Container>
          <Row>
            <Col sm="12">
              <div className="main-menu">
                <div className="menu-left">
                  <div className="p-0 mr-2 navbar">
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
                  <div>
                    <div className="mt-1 d-none d-xl-block">
                      <NavbarHandler data={data?.body?.primary_menu} />
                    </div>
                  </div>
                  <div className="d-flex">
                    <div>
                      <IconNav />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
    </>
  );
};

export default HeaderSeven;
