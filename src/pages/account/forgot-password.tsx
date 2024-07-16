import ForgotPassword from "@/components/account/common/ForgotPassword";
import SeoHead from "@/components/layout/seo/head";
import { useSelector } from "react-redux";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";

const ForgotPasswordPage = () => {
  let storeData = useSelector(selectStoreData);
  const { data } = storeData;

  // console.log(session);
  return (
    <>
      <SeoHead
        title={`Forgot Password | ${data?.store_info?.site_title}`}
        description={data?.seo?.description}
      />
      <div className="d-flex flex-column align-items-center">
        <ForgotPassword />
      </div>
    </>
  );
};

export default ForgotPasswordPage;
