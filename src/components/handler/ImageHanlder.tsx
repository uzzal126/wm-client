import Link from "next/link";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import { linkHandler } from "../../helpers/misc";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";

type Props = {
  data?: any;
};

const ImageHandler: FC<Props> = ({ data }) => {
  let storeData = useSelector(selectStoreData);
  const menu_all = storeData.menu_all;
  const is_url_self = data?.link?.url_type?.length > 0;
  const url = is_url_self ? linkHandler(data?.link, menu_all) : data?.link?.url;

  return (
    <Container fluid={data?.fluid} className={data?.fluid ? "p-0" : ""}>
      {is_url_self ? (
        <Link href={url} style={{ cursor: "pointer" }}>
          <div className="py-3" style={{ cursor: "pointer" }}>
            <img
              src={
                data?.url ||
                "https://dummyimage.com/1920x400/c7c7c7/595959&text=Image+Box"
              }
              alt=""
              className="img-fluid"
            />
          </div>
        </Link>
      ) : (
        <a href={url} target={"_blank"}>
          <div className="py-3">
            <img
              src={
                data?.url ||
                "https://dummyimage.com/1920x400/c7c7c7/595959&text=Image+Box"
              }
              alt=""
              className="img-fluid"
            />
          </div>
        </a>
      )}
    </Container>
  );
};

export default ImageHandler;
