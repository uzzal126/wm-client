import { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import IconNav from "./common/iconNav";
import LogoImage from "./common/logo";
import MobileMenuHandler from "./common/mobile";
import NavbarHandler from "./common/navbarHandler";
import SidebarHandler from "./common/sidebarHandler";
import TopBar from "./common/topbar";

type Props = {
  data?: any;
  logoName?: any;
  topClass?: any;
  headerClass?: any;
};

const HeaderTen = ({ data, logoName, topClass, headerClass }: Props) => {
  useEffect(() => {
    const loaderWrapper: any = document.querySelectorAll(".loader-wrapper");
    loaderWrapper.style = "display:none";
  }, []);

  return (
    <div>
      <header className={`${headerClass || ""}`}>
        <div className="mobile-fix-option"></div>
        <TopBar topClass={`${topClass} top-header`} />
        <div className="metro">
          <Container className="layout3-menu">
            <Row>
              <Col sm="12">
                <Row className="main-menu">
                  <Col xs="5">
                    <div className="w-auto menu-left around-border">
                      <div className="p-0 mr-2 navbar">
                        <div className="d-none d-xl-block">
                          <SidebarHandler data={data} bg={""} />
                        </div>
                        <div className="d-block d-xl-none">
                          <MobileMenuHandler data={data} />
                        </div>
                      </div>
                      <div className="menu-right pull-right d-none d-xl-block ">
                        <NavbarHandler data={data?.body?.primary_menu} />
                      </div>
                    </div>
                  </Col>
                  <div className="col-2 align-self-center">
                    <div className="brand-logo ">
                      <LogoImage />
                    </div>
                  </div>
                  <div className="h-auto col-5 position-static">
                    <div className="text-right menu-right">
                      <IconNav hideAccount hideCompare hideWishlist />
                    </div>
                  </div>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </header>
    </div>
  );
};

export default HeaderTen;
