import React, { FC } from "react";
import { Col, Row, Container } from "reactstrap";
import { getBannerRdirectURL, imageDimentionHelper, isSelfURL } from "../../../helpers/misc";
import { useSelector } from "react-redux";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import Link from "next/link";

const one = "https://dummyimage.com/790x780/d1d1d1/222";
const oneM = "https://dummyimage.com/650x680/d1d1d1/222";
const two = "https://dummyimage.com/450x310/d1d1d1/222";

type Props = {
  data: any;
};

const HomeBanner2: FC<Props> = ({ data }) => {
  let storeData = useSelector(selectStoreData);
  const redirect_url_1 = getBannerRdirectURL(data?.list[0], storeData?.menu_all || []);
  const redirect_url_2 = getBannerRdirectURL(data?.list[1], storeData?.menu_all || []);
  const redirect_url_3 = getBannerRdirectURL(data?.list[2], storeData?.menu_all || []);
  const dOneImage = imageDimentionHelper(
    data?.list && data?.list[0] && data?.list[0].banner_url,
    790,
    780,
    true
  );
  const mOneImage = imageDimentionHelper(
    data?.list && data?.list[0] && data?.list[0].mobile_banner_url,
    650,
    680,
    true
  );
  const dtwo = imageDimentionHelper(
    data?.list && data?.list[1] && data?.list[1].banner_url,
    450,
    310,
    true
  );
  const dthree = imageDimentionHelper(
    data?.list && data?.list[2] && data?.list[2].banner_url,
    450,
    310,
    true
  );

  return (
    <Container className='banner-slider py-1'>
      <Row>
        <Col md='7'>
          {isSelfURL(redirect_url_1) ? (
            <>
              <Link href={redirect_url_1}>
                <img
                  src={dOneImage ? data?.list && data?.list[0] && data?.list[0].banner_url : one}
                  className='img-fluid blur-up d-none d-lg-block lazyload height-banner'
                  alt=''
                />
              </Link>
              <Link href={redirect_url_1}>
                <img
                  src={mOneImage ? data?.list && data?.list[0] && data?.list[0].mobile_banner_url : oneM}
                  className='img-fluid blur-up d-block d-lg-none lazyload height-banner'
                  alt=''
                />
              </Link>
            </>
          ) : (
            <>
              <a href={redirect_url_1} target="_blank">
                <img
                  src={dOneImage ? data?.list && data?.list[0] && data?.list[0].banner_url : one}
                  className='img-fluid blur-up d-none d-lg-block lazyload height-banner'
                  alt=''
                />
              </a>
              <a href={redirect_url_1} target="_blank">
                <img
                  src={mOneImage ? data?.list && data?.list[0] && data?.list[0].mobile_banner_url : oneM}
                  className='img-fluid blur-up d-block d-lg-none lazyload height-banner'
                  alt=''
                />
              </a>
            </>
          )}
        </Col>
        <Col md='5'>
          <Row className='row home-banner'>
            <Col sm='12'>
              {isSelfURL(redirect_url_2) ? (
                <Link href={redirect_url_2}>
                  <img
                    src={dtwo ? data?.list && data?.list[1] && data?.list[1].banner_url : two}
                    className='img-fluid blur-up lazyload'
                    alt=''
                  />
                </Link>
              ) : (
                <a href={redirect_url_2} target="_blank">
                  <img
                    src={dtwo ? data?.list && data?.list[1] && data?.list[1].banner_url : two}
                    className='img-fluid blur-up lazyload'
                    alt=''
                  />
                </a>
              )}
            </Col>
            <Col sm='12'>
              {isSelfURL(redirect_url_3) ? (
                <Link href={redirect_url_3}>
                  <img
                    src={dthree ? data?.list && data?.list[2] && data?.list[2].banner_url : two}
                    className='img-fluid blur-up lazyload'
                    alt=''
                  />
                </Link>
              ) : (
                <a href={redirect_url_3} target="_blank">
                  <img
                    src={dthree ? data?.list && data?.list[2] && data?.list[2].banner_url : two}
                    className='img-fluid blur-up lazyload'
                    alt=''
                  />
                </a>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export { HomeBanner2 };
