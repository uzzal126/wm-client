import { getGalleryRdirectURL, isSelfURL } from "@/helpers/misc";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import Link from "next/link";
import { useSelector } from "react-redux";

const GalleryMasterSlider = ({ img, classes, title, item }: any) => {
  let storeData = useSelector(selectStoreData);
  const redirect_url = getGalleryRdirectURL(item, storeData?.menu_all || []);

  return isSelfURL(redirect_url) ? (
    <div className={`position-relative ${classes ? classes : "text-center"}`}>
      <Link href={redirect_url}>
        <img
          src={
            img === "https: //dummyimage.com/1920x550/969496/ffffff.jpg"
              ? "https://dummyimage.com/1920x550/969496/ffffff.jpg"
              : img
          }
          alt={title}
          className="img-fluid"
        />
      </Link>
    </div>
  ) : (
    <div className={`position-relative ${classes ? classes : "text-center"}`}>
      <a href={redirect_url} target="_blank">
        <img
          src={
            img === "https: //dummyimage.com/1920x550/969496/ffffff.jpg"
              ? "https://dummyimage.com/1920x550/969496/ffffff.jpg"
              : img
          }
          alt={title}
          className="img-fluid"
        />
      </a>
    </div>
  );
};

export default GalleryMasterSlider;
