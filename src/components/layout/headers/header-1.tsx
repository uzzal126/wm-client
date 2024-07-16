import { Col, Container, Row } from "reactstrap";
import IconNav from "./common/iconNav";
import LogoImage from "./common/logo";
import MobileMenuHandler from "./common/mobile";
import NavbarHandler from "./common/navbarHandler";
import SidebarHandler from "./common/sidebarHandler";
import TopBarDark from "./common/topbar-dark";

type Props = {
  data?: any;
  logoName?: any;
  topClass?: any;
  headerClass?: any;
  noTopBar?: any;
};

const HeaderOne = ({
  data,
  logoName,
  headerClass,
  topClass,
  noTopBar,
}: Props) => {
  return (
    <div>
      <header id="sticky" className={`sticky ${headerClass}`}>
        {noTopBar ? "" : <TopBarDark topClass={`${topClass} top-header`} />}

        <Container>
          <Row>
            <Col>
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
                  <div className="mx-0 brand-logo mx-lg-3">
                    <LogoImage />
                  </div>
                </div>
                <div className="pt-1 menu-right pull-right">
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
    </div>
  );
};

export default HeaderOne;
