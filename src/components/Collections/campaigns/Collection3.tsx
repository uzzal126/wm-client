import { useGetProductByCampaignQuery } from "@/redux-handler/api/slices/productSlice";
import { FC, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Tabs } from "react-tabs";
import CountdownTimer from "../../../helpers/countdown-component/countdown";
import { GET_CAMPAIGNS } from "../../../helpers/services/api";
import { getQueryRequest } from "../../../helpers/services/request";

import { check_date_expiry } from "@/helpers/misc";
import { ProductGrid } from "../../widgets/productGrid";
import { ProductSlider } from "../../widgets/productSlider";

type Props = {
  settings: any;
  cartClass: any;
  setEndAt: any;
  data?: any;
};

const SingleCampaign: FC<Props> = ({ data, settings, cartClass, setEndAt }) => {
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

  if (!campaignData) {
    return <></>;
  }

  return (
    <>
      {settings?.layout_type === "slider" ? (
        <ProductSlider
          data={campaignData}
          loading={loading}
          cartClass={cartClass}
          settings={settings}
        />
      ) : (
        <ProductGrid
          data={campaignData}
          settings={settings}
          loading={loading}
          cartClass={cartClass}
        />
      )}
    </>
  );
};

type cProps = {
  data: any;
  designClass: any;
  cartClass: any;
};

const CampaignTab: FC<cProps> = ({ data, designClass, cartClass }) => {
  const [activeTab, setActiveTab] = useState<any>({});

  const [campaign, setCampaign] = useState<any>([]);
  // console.log({campaign})
  const [endAt, setEndAt] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await getQueryRequest(GET_CAMPAIGNS);
    if (res.success && res.status_code === 200) {
      const activeCamp = data?.list?.filter(
        (f: any) =>
          res.data.filter(
            (j: any) => j.id === f.id && j.active_status === "Active"
          ).length > 0
      );
      if (activeCamp.length > 0) setActiveTab(activeCamp[0]);
      setCampaign(res.data);
    }
  };

  const todayInUnix = Date.now() / 1000;
  return (
    <div>
      <section className={designClass}>
        <Container>
          <Tabs className="theme-tab">
            <div className="d-lg-flex align-items-center justify-content-between">
              <ul className="tabs tab-title">
                {data &&
                  data.list &&
                  data.list?.length > 0 &&
                  data.list?.map(
                    (item: any, i: number) =>
                      !check_date_expiry(
                        todayInUnix,
                        campaign.find((f: any) => f.id === item.id)?.end_at
                      ) &&
                      campaign.filter(
                        (f: any) =>
                          f.id === item.id && f.active_status === "Active"
                      ).length > 0 && (
                        <li
                          key={i}
                          className={`btn btn-outline rounded mx-1 py-2 ${
                            activeTab.id == item.id ? "active" : ""
                          }`}
                          onClick={() => setActiveTab(item)}
                        >
                          {campaign.find((f: any) => f.id === item.id)?.name ||
                            ""}
                        </li>
                      )
                  )}
              </ul>
              <div className="title-basic">
                <div>
                  {Array.isArray(campaign) &&
                    campaign.filter((e: any) => e?.id === activeTab?.id)[0]
                      ?.end_at && (
                      <CountdownTimer
                        time={
                          (Array.isArray(campaign) &&
                            campaign.filter(
                              (e: any) => e?.id === activeTab?.id
                            )[0]?.end_at) ||
                          undefined
                        }
                      />
                    )}
                </div>
              </div>
            </div>

            <div className="react-tabs__tab-panel react-tabs__tab-panel--selected">
              <SingleCampaign
                data={activeTab}
                settings={data?.setting}
                cartClass={cartClass}
                setEndAt={setEndAt}
              />
            </div>
          </Tabs>
        </Container>
      </section>
    </div>
  );
};

export { CampaignTab };
