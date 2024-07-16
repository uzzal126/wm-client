import { useSelector } from "react-redux";
import { selectStoreData } from "../../../../../redux-handler/reducers/storeDataReducer";
import FComponent from "./fComponent";

type Props = {
  onClickFunc?: any;
};

const FooterContainer = ({ onClickFunc = () => null }: Props) => {
  let storeData = useSelector(selectStoreData);
  let data = storeData?.data;
  const menu = storeData?.menu_all;
  let footer = data.footer;

  return (
    <>
      <div onClick={onClickFunc}>
        <FComponent data={footer?.body?.column1 || {}} menu={menu} />
      </div>
      <div onClick={onClickFunc}>
        <FComponent data={footer?.body?.column2 || {}} menu={menu} />
      </div>
      <div onClick={onClickFunc}>
        <FComponent data={footer?.body?.column3 || {}} menu={menu} />
      </div>
      <div onClick={onClickFunc}>
        <FComponent data={footer?.body?.column4 || {}} menu={menu} />
      </div>
      <div onClick={onClickFunc}>
        <FComponent data={footer?.body?.column5 || {}} menu={menu} />
      </div>
    </>
  );
};

export default FooterContainer;
