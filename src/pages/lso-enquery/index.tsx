import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { useSelector } from "react-redux";
import Page404 from "../404";
import CustomerServicePage from "../imei";

export default function LSO() {
  let storeData = useSelector(selectStoreData);
  const { data } = storeData;
  if (data?.store_info?.store_cat_id === 20) {
    return (
      <div className="py-5">
        <Page404 />
      </div>
    );
  }
  return <CustomerServicePage />;
}
