import Link from "next/link";
import { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { useGetProductByCampaignQuery } from "@/redux-handler/api/slices/productSlice";
import CountdownTimer from "../../../helpers/countdown-component/countdown";
import { check_date_expiry, styleGenerator } from "../../../helpers/misc";
import { ProductGrid } from "../../widgets/productGrid";
import { ProductSlider } from "../../widgets/productSlider";

const defaultBanner = "/assets/images/collection/side-banner.png";

type Props = {
  dataSet: any;
  data?: any;
};

const SingleCampaign: FC<Props> = ({ dataSet, data }) => {
  const { campaignData, loading, campaignDetails } =
    useGetProductByCampaignQuery(`/${data?.id}/?page=1&items_per_page=10`, {
      selectFromResult: ({ data, error, isLoading, ...props }) => ({
        campaignData: data?.data,
        campaignDetails:
          data?.campaign_details && data?.campaign_details.length > 0
            ? data?.campaign_details[0]
            : [],
        loading: isLoading,
        ...props,
      }),
    });

  const todayInUnix = Date.now() / 1000;

  if (
    (!loading && check_date_expiry(todayInUnix, campaignDetails?.end_at)) ||
    !campaignData
  ) {
    return <></>;
  }

  return (
    <section
      className={"section-b-space ratio_asos"}
      style={{
        ...styleGenerator(dataSet?.setting?.styles),
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col sm="12" md="4" lg="3">
            <div className="h-100 b-top d-flex flex-column align-items-center py-2">
              <img
                src={data?.banner_url || defaultBanner}
                className="img-fluid rounded bg-img bg-top"
                alt=""
              />
            </div>
          </Col>
          <Col sm="12" md="8" lg="9">
            <div
              className={`justify-content-between d-flex flex-column flex-lg-row align-items-center mb-4 mt-2`}
            >
              <div className="title-basic mb-0">
                <h2 className="title">
                  <i className="ti-bolt"></i>
                  {campaignDetails
                    ? campaignDetails.name || campaignDetails.NAME
                    : "NEW"}
                </h2>
              </div>
              <div>
                {campaignDetails?.end_at && (
                  <CountdownTimer time={campaignDetails?.end_at} />
                )}
              </div>
              <Link
                href={`/campaign/${data?.id}`}
                className="btn btn-outline-secondary"
              >
                Shop More
              </Link>
            </div>

            {dataSet?.setting?.layout_type === "slider" ? (
              <ProductSlider
                data={campaignData}
                loading={loading}
                cartClass={"cart-info cart-wrap"}
                settings={dataSet?.setting}
              />
            ) : (
              <ProductGrid
                data={campaignData}
                settings={dataSet?.setting}
                loading={loading}
                cartClass={"cart-info cart-wrap"}
              />
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

type cProps = {
  data: any;
};

const CampaignWithSidebar: FC<cProps> = ({ data }) => {
  const filterData =
    data?.list && data?.list?.length > 0
      ? data?.list?.filter((f: any) => f.id !== 0)
      : [];

  return filterData && filterData.length > 0 ? (
    filterData.map((item: any, i: number) => (
      <SingleCampaign key={i} dataSet={data} data={item} />
    ))
  ) : (
    <SingleCampaign dataSet={data} />
  );
};

export { CampaignWithSidebar };
