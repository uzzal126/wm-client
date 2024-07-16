import { useSelector } from "react-redux";
import { selectStoreData } from "../../../../../redux-handler/reducers/storeDataReducer";
import SocialMedia from "../../../footers/common/socialMedia";

const Social = () => {
  const storeData = useSelector(selectStoreData);
  const data = storeData?.data;
  const footer = data.footer;

  //console.log(footer?.body?.column1.list);

  let social: any =
    footer?.body?.column1 && footer?.body?.column1?.list
      ? Object.entries(footer?.body?.column1?.list).filter(([key]) =>
          key.includes("social")
        )
      : footer?.body?.column2 && footer?.body?.column2?.list
      ? Object.entries(footer?.body?.column2?.list).filter(([key]) =>
          key.includes("social")
        )
      : footer?.body?.column3 && footer?.body?.column3?.list
      ? Object.entries(footer?.body?.column3?.list).filter(([key]) =>
          key.includes("social")
        )
      : footer?.body?.column4 && footer?.body?.column4?.list
      ? Object.entries(footer?.body?.column4?.list).filter(([key]) =>
          key.includes("social")
        )
      : footer?.body?.column5 && footer?.body?.column5?.list
      ? Object.entries(footer?.body?.column5?.list).filter(([key]) =>
          key.includes("social")
        )
      : [];

  social = social.length > 0 ? (social[0].length > 1 ? social[0][1] : []) : [];

  return (
    <div className="d-flex align-items-center">
      <h4 className="mb-0">Social Media:</h4>
      <SocialMedia
        data={social?.list || []}
        socialClass={"footer-social mt-0 lh-1"}
      />
    </div>
  );
};

export default Social;
