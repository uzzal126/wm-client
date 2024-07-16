"use client";
import SeoHead from "@/components/layout/seo/head";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getLocal } from "@/helpers/storage";
import ProfilePage from "@/components/account/common/profile-page";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { useEffect } from "react";

const Profile = () => {
  let storeData = useSelector(selectStoreData);
  const router = useRouter();
  const { data } = storeData;
  const user = getLocal("user");
  // console.log({ user });
  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, []);
  //console.log(session);
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
