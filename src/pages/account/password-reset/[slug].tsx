import PasswordReset from "@/components/account/common/PasswordReset";
import SeoHead from "@/components/layout/seo/head";
import { EMAIL_SECRET } from "@/helpers/services/api";
import { queryRequest } from "@/helpers/services/request";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Label } from "reactstrap";

const PasswordResetPage = () => {
  let storeData = useSelector(selectStoreData);
  const router = useRouter();
  const { data } = storeData;
  const { slug } = router.query;
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  useEffect(() => {
    if (slug) {
      checkToken(slug);
    }
  }, [slug]);

  const checkToken = async (token: any) => {
    setLoading(true);
    try {
      const res = await queryRequest(EMAIL_SECRET, {
        email_secrete: token,
      });
      // console.log({ res });
      if (res?.success && res?.status_code === 200) {
        setLoading(false);
      } else {
        setErr(true);
      }
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
  };
  if (!loading && err) {
    return (
      <div className="d-flex flex-column align-items-center py-5">
        <i
          className="fa fa-exclamation-triangle"
          style={{
            fontSize: 60,
          }}
        />
        <h2 className="py-2">Invalid or Expired Link !</h2>
      </div>
    );
  }
  return (
    <>
      <SeoHead
        title={`Password Reset | ${data?.store_info?.site_title}`}
        description={data?.seo?.description}
      />
      <div className="d-flex flex-column align-items-center">
        {loading ? (
          <div className="d-flex align-items-center flex-column">
            <Spinner
              animation="border"
              variant="primary"
              // color="var(--theme-deafult)"
              style={{ width: 50, height: 50 }}
            />
            <Label className="py-2">Please wait ...</Label>
          </div>
        ) : (
          <PasswordReset token={slug} />
        )}
      </div>
    </>
  );
};

export default PasswordResetPage;
