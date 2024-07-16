import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { bgGenaretor, styleGenerator } from "../../../../helpers/misc";
import { selectStoreData } from "../../../../redux-handler/reducers/storeDataReducer";
import { MenuCompare, MenuUser, MenuWishlist } from "./iconComponent";

type Props = {
  topClass?: any;
  fluid?: boolean;
};

const TopBar = ({ topClass, fluid = false }: Props) => {
  let storeData = useSelector(selectStoreData);
  let { header } = storeData?.data;
  const { data } = storeData;

  return (
    <div
      id="topHeader"
      className={`top-header ${topClass ? topClass : ""}`}
      style={{
        ...styleGenerator(data?.header?.styles?.topbar),
        backgroundColor:
          bgGenaretor(data?.header?.styles?.topbar?.background) || "#f8f8f8",
      }}
    >
      <Container fluid={fluid}>
        <Row>
          <Col lg="6">
            <div className="header-contact">
              <ul>
                {data && data?.hotline && (
                  <>
                    {data?.hotline?.text && (
                      <li
                        style={{
                          color:
                            bgGenaretor(
                              data?.header?.styles?.topbar?.font_color
                            ) || "#999999",
                        }}
                      >
                        {data?.hotline?.text}
                      </li>
                    )}
                    {data?.hotline?.mobile && (
                      <li>
                        <i
                          className="fa fa-phone"
                          aria-hidden="true"
                          style={{
                            color:
                              bgGenaretor(
                                data?.header?.styles?.topbar?.font_color
                              ) || "#999999",
                          }}
                        ></i>
                        <span
                          style={{
                            color:
                              bgGenaretor(
                                data?.header?.styles?.topbar?.font_color
                              ) || "#999999",
                          }}
                        >
                          Call Us:
                        </span>
                        <span
                          // href={`tel:${data?.hotline?.mobile}`}
                          style={{
                            textDecoration: "none",
                            color: data?.header?.styles?.topbar?.font_color
                              ? bgGenaretor(
                                  data?.header?.styles?.topbar?.font_color
                                )
                              : "#7F786D",
                          }}
                        >
                          {data?.hotline?.mobile}
                        </span>
                      </li>
                    )}
                    {data?.hotline?.email && (
                      <li>
                        <i
                          className="fa fa-envelope"
                          aria-hidden="true"
                          style={{
                            color:
                              bgGenaretor(
                                data?.header?.styles?.topbar?.font_color
                              ) || "#999999",
                          }}
                        ></i>
                        <span
                          style={{
                            color:
                              bgGenaretor(
                                data?.header?.styles?.topbar?.font_color
                              ) || "#999999",
                          }}
                        >
                          Email:
                        </span>
                        <a
                          href={`mailto:${data?.hotline?.email}`}
                          style={{
                            textDecoration: "none",
                            color: data?.header?.styles?.topbar?.font_color
                              ? bgGenaretor(
                                  data?.header?.styles?.topbar?.font_color
                                )
                              : "#7F786D",
                          }}
                        >
                          {data?.hotline?.email}
                        </a>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </div>
          </Col>
          <Col lg="6" className="text-right">
            <ul className="header-dropdown">
              <MenuCompare
                data={header}
                color={
                  bgGenaretor(data?.header?.styles?.topbar?.font_color) ||
                  "#999999"
                }
              />
              <MenuWishlist
                data={header}
                color={
                  bgGenaretor(data?.header?.styles?.topbar?.font_color) ||
                  "#999999"
                }
              />
              <MenuUser
                data={header}
                color={
                  bgGenaretor(data?.header?.styles?.topbar?.font_color) ||
                  "#999999"
                }
              />
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBar;
