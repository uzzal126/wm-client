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
};

const HeaderSix = ({ data }: Props) => {
  useEffect(() => {
    const loaderWrapper: any = document.querySelectorAll(".loader-wrapper");
    loaderWrapper.style = "display:none";
  }, []);

  return (
    <div>
      <header className="sticky header-tools top-0">
        <div className="mobile-fix-option"></div>
        <TopBar topClass={"top-header"} />
        <div className="logo-menu-part">
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
                    <div className="brand-logo ">
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
        </div>
      </header>
    </div>
  );
};

export default HeaderSix;
