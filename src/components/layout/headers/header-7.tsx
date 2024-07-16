import { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import IconNav from "./common/iconNav";
import LogoImage from "./common/logo";
import MobileMenuHandler from "./common/mobile";
import NavbarHandler from "./common/navbarHandler";
import SidebarHandler from "./common/sidebarHandler";
import TopBar from "./common/topbar-dark";

type Props = {
  data?: any;
  headerClass?: any;
  topClass?: any;
};

const HeaderTwo = ({ data, headerClass, topClass }: Props) => {
  useEffect(() => {
    const loaderWrapper: any = document.querySelectorAll(".loader-wrapper");
    loaderWrapper.style = "display:none";
  }, []);

  return (
    <div>
      <header className={`${headerClass}`}>
        <div className="mobile-fix-option"></div>

        <TopBar topClass={topClass} />

        <Container>
          <Row>
            <Col>
              <div className="main-menu border-section border-top-0">
                <div className="menu-left">
                  <div className="p-0 mr-2 navbar">
                    <div className="d-none d-xl-block">
                      <SidebarHandler data={data} bg={""} />
                    </div>
                    <div className="d-block d-xl-none">
                      <MobileMenuHandler data={data} />
                    </div>
                  </div>
                </div>
                <div className="brand-logo layout2-logo ">
                  <LogoImage />
                </div>
                <div className="menu-right pull-right">
                  <div>
                    <IconNav hideAccount hideCompare hideWishlist />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container className="d-none d-xl-block">
          <Row>
            <Col>
              <div className="main-nav-center">
                <NavbarHandler data={data?.body?.primary_menu} />
              </div>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
};

export default HeaderTwo;
