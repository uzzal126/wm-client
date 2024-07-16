import CampaignSingle from "@/components/Collections/campaigns/campaignSingle";
import SeoHead from "@/components/layout/seo/head";
import PostLoader from "@/helpers/preloader/PostLoader";
import { GET_CAMPAIGNS } from "@/helpers/services/api";
import { getQueryRequest } from "@/helpers/services/request";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import Page404 from "../404";

export default function Campaigns() {
  const storeData = useSelector(selectStoreData);
  const { data } = storeData;
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCampData();
  }, []);

  const getCampData = async () => {
    const res = await getQueryRequest(GET_CAMPAIGNS);
    setLoading(false);
    if (res.success && res.status_code === 200) {
      setCampaigns(res.data);
    }
  };

  if (loading)
    return (
      <div className="row mx-0 margin-default mt-4">
        <div className="col-xl-3 col-lg-4 col-6">
          <PostLoader />
        </div>
        <div className="col-xl-3 col-lg-4 col-6">
          <PostLoader />
        </div>
        <div className="col-xl-3 col-lg-4 col-6">
          <PostLoader />
        </div>
        <div className="col-xl-3 col-lg-4 col-6">
          <PostLoader />
        </div>
      </div>
    );

  if (data?.store_info?.store_cat_id === 20) {
    return (
      <div className="py-5">
        <Page404 />
      </div>
    );
  }

  return (
    <>
      <SeoHead
        title={`Campaigns | ${data?.store_info?.site_title}`}
        description={data?.seo?.description}
        keywords={data?.seo?.keywords}
        author={data?.store_info?.domain}
        copyright={data?.store_info?.business_name}
      />

      {Array.isArray(campaigns) && campaigns?.length > 0 ? (
        campaigns?.map((item, indx) => (
          <CampaignSingle key={indx} data={item} />
        ))
      ) : (
        <div className="col-xs-12">
          <div>
            <div className="col-sm-12 empty-cart-cls text-center">
              <img src={""} className="img-fluid mb-4 mx-auto" alt="" />
              <h3>
                <strong>No Running Campaign Right Now :(</strong>
              </h3>
              {/* <h4>Explore more shortlist some items.</h4> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
