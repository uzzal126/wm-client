import { FC } from "react";
import {
  CampaignSingle,
  CampaignTab,
  CampaignTabWithSidebar,
  CampaignWithSidebar,
} from "../Collections/campaigns";

type Props = {
  data?: any;
};

const CampaignHandler: FC<Props> = ({ data }) => {
  return data && data?.setting ? (
    data?.setting?.template === "single-grid-slider" ? (
      <CampaignSingle data={data} />
    ) : data?.setting?.template === "single-slider-grid-sidebar" ||
      data?.setting?.template === "single-slider-sidebar" ? (
      <CampaignWithSidebar data={data} />
    ) : data?.setting?.template === "tab-slider-grid" ? (
      <CampaignTab
        data={data}
        designClass="section-b-space ratio_asos"
        cartClass="cart-info cart-wrap"
      />
    ) : data?.setting?.template === "tab-grid-sidebar-slider" ? (
      <CampaignTabWithSidebar
        data={data}
        designClass="section-b-space ratio_asos"
        cartClass="cart-info cart-wrap"
      />
    ) : (
      <p className="py-5 text-center text-danger">Please configure again</p>
    )
  ) : null;
};

export default CampaignHandler;
