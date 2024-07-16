"use client";
import Link from "next/link";
import { FC } from "react";
import { Container } from "react-bootstrap";

import CountdownTimer from "@/helpers/countdown-component/countdown";
import { check_date_expiry, styleGenerator } from "@/helpers/misc";
import { useGetProductByCampaignQuery } from "@/redux-handler/api/slices/productSlice";
import { ProductGrid } from "../../widgets/productGrid";
import { ProductSlider } from "../../widgets/productSlider";

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
        <div
          className={`justify-content-between d-flex flex-column flex-lg-row align-items-center mb-4`}
        >
          <div className="title-basic">
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
            href={`/campaign/${campaignDetails?.slug}`}
            className="btn btn-outline-secondary rounded"
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
            loading={loading}
            cartClass={"cart-info cart-wrap"}
            settings={dataSet?.setting}
          />
        )}
      </Container>
    </section>
  );
};

type cProps = {
  data: any;
};

const CampaignSingle: FC<cProps> = ({ data }) => {
  const filterData =
    data.list && data.list.length > 0
      ? data.list.filter((f: any) => f.id !== 0)
      : [];
  return filterData && filterData.length > 0 ? (
    filterData.map((item: any, i: number) => (
      <SingleCampaign key={i} dataSet={data} data={item} />
    ))
  ) : (
    <SingleCampaign dataSet={data} />
  );
};
export { CampaignSingle };
