import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { useSelector } from "react-redux";
import PopUp from "./Popup";
import FacebookLiveChat from "./facebook-live-chat";
import FacebookPixel from "./facebook-pixel";
import GoogleAnalytics from "./ggl-analytics";

export default function MarketingTools() {
  let storeData = useSelector(selectStoreData);
  const { data } = storeData;
  const marketing_tools =
    data && data?.store_info && data?.store_info?.marketing_tools
      ? JSON.parse(data?.store_info?.marketing_tools)
      : [];

  return (
    <>
      <FacebookPixel marketing_tools={marketing_tools} />
      <FacebookLiveChat marketing_tools={marketing_tools} />
      <GoogleAnalytics marketing_tools={marketing_tools} />
      <PopUp marketing_tools={marketing_tools}/>
    </>
  );
}
