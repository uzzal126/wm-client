import Head from "next/head";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectStoreData } from "../redux-handler/reducers/storeDataReducer";

const ThemeSettings = ({ children }) => {
  let storeData = useSelector(selectStoreData);

  let general_settings = storeData?.data?.general_settings;
  let shop_settings = storeData?.data?.store_info;
  let logo = storeData?.data?.logo;

  useEffect(() => {
    if (general_settings?.dark_mode && general_settings?.layout_type) {
      document.body.className = `${
        general_settings?.dark_mode ? "dark" : "light"
      }  ${general_settings.layout_type}`;
    }

    document.documentElement.style.setProperty(
      "--theme-deafult",
      general_settings?.primary_color || "#ff4c3b"
    );

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [general_settings]);

  const handleScroll = () => {
    if (process.browser) {
      if (document.documentElement.scrollTop > 600) {
        document?.querySelector(".tap-top")?.style = "display: block";
      } else {
        document?.querySelector(".tap-top")?.style = "display: none";
      }
    }
  };

  return (
    <>
      <Head>
        <title>
          {shop_settings?.site_title + " | " + shop_settings?.business_name}
        </title>
        <link rel="icon" href={logo?.fav_logo} />
        <meta
          name="description"
          content={
            storeData?.data?.seo?.description || shop_settings?.site_title
          }
        />
        <meta
          name="keywords"
          content={storeData?.data?.seo?.keywords || shop_settings?.site_title}
        />
        <meta
          name="author"
          content={shop_settings?.domain || shop_settings?.site_title}
        />
        <meta
          name="copyright"
          content={shop_settings?.business_name || shop_settings?.site_title}
        />
        <meta name="robots" content="index,nofollow" />
      </Head>
      <div>{children}</div>
    </>
  );
};

export default ThemeSettings;
