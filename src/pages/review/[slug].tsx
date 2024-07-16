import ReviewSubmit from "@/components/review";
import { getAuth } from "@/helpers/auth/AuthHelper";
import { ACCOUNT_DETAILS, GET_PRODUCT_DETAILS } from "@/helpers/services/api";
import { getQueryRequest, queryRequest } from "@/helpers/services/request";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import Page404 from "../404";

export default function Review() {
  const router = useRouter();
  const { slug } = router.query;
  let storeData = useSelector(selectStoreData);
  const { data } = storeData;
  const [pdDetails, setPdDetails] = useState(null);
  const [user, setUser] = useState({});
  const customer = getAuth();

  let getId =
    storeData.menu_all &&
    storeData.menu_all.length > 0 &&
    storeData.menu_all.filter(
      (f: any) => f.url === slug && f.url_type === "product"
    );

  useEffect(() => {
    if (getId && getId.length > 0) {
      callAPI(getId[0].pid);
    }
  }, [slug, getId && getId.length > 0]);

  const callAPI = async (id: any) => {
    const res = await getQueryRequest(`${GET_PRODUCT_DETAILS}/${id}`);
    const res2 = await queryRequest(ACCOUNT_DETAILS, {
      customer_id: customer && customer?.id,
    });
    if (res?.success) {
      setPdDetails(res?.data);
    }
    if (res2.success) {
      setUser(res2);
    }
  };

  if (data?.store_info?.store_cat_id === 20) {
    return (
      <div className="py-5">
        <Page404 />
      </div>
    );
  }

  return <ReviewSubmit data={pdDetails} user={user} />;
}
