import ProfilePage from "@/components/account/common/profile-page";
import SeoHead from "@/components/layout/seo/head";
import { getLocal } from "@/helpers/storage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";

const Profile = () => {
  let storeData = useSelector(selectStoreData);
  const router = useRouter();
  const { data } = storeData;
  const user = getLocal("user");

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, []);

  return (
    <>
      <SeoHead
        title={`My Account | ${data?.store_info?.site_title}`}
        description={data?.seo?.description}
      />
      <ProfilePage />
    </>
  );
};

export default Profile;
