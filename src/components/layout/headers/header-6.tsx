import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import IconNav from "./common/iconNav";
import LogoImage from "./common/logo";
import MobileMenuHandler from "./common/mobile";
import NavbarHandler from "./common/navbarHandler";
import SearchOverlay from "./common/search-overlay";
import SidebarHandler from "./common/sidebarHandler";
import TopBarDark from "./common/topbar-dark";

type Props = {
  data?: any;
};

const HeaderThree = ({ data }: Props) => {
  useEffect(() => {
    const loaderWrapper: any = document.querySelectorAll(".loader-wrapper");
    loaderWrapper.style = "display: none";
  }, []);
  let storeData = useSelector(selectStoreData);
  let headerSettings = storeData?.data?.header;

  return (
    <div>
      <header className=" header-2 header-6">
        <div className="mobile-fix-option"></div>

        <TopBarDark topClass="top-header d-sm-block" fluid />

        <Container>
          <Row>
            <Col>
              <div className="main-menu border-section border-top-0">
                <div className="d-block d-xl-none">
                  <MobileMenuHandler data={data} />
                </div>
                <div className="brand-logo layout2-logo ">
                  <LogoImage />
                </div>
                <div className="d-none d-xl-block">
                  {headerSettings?.search && <SearchOverlay inline />}
                </div>
                <div className="menu-right pull-right">
                  <div>
                    <IconNav hideAccount hideCompare hideWishlist hideSearch />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container className="d-none d-xl-block">
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center justify-content-center">
                <div className="p-0 mr-2 navbar">
                  <div className="d-none d-xl-block">
                    <SidebarHandler data={data} bg />
                  </div>
                </div>

                <div className="pb-1 d-none d-xl-block">
                  <NavbarHandler data={data?.body?.primary_menu} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
};

export default HeaderThree;
