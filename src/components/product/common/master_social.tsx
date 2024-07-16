import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import {
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "next-share";
import { useSelector } from "react-redux";

type Props = {
  name: string;
  url: string;
  image: string;
  categories?: string[];
  small?: boolean;
};

const MasterSocial = ({
  categories,
  image,
  name,
  url: paramUrl,
  small = false,
}: Props) => {
  let storeData = useSelector(selectStoreData);
  let store = storeData?.data?.store_info;

  let url = `https://${store?.domain}/${paramUrl}`;

  return (
    <ul
      className="mt-0 product-social d-flex"
      style={{ fontSize: small ? 18 : 28 }}
    >
      <li className="pr-2 mx-1">
        <FacebookShareButton
          url={url}
          quote={`${name} | ${url}`}
          hashtag={categories && categories.toString()}
        >
          <i className="fa-brands fa-facebook"></i>
        </FacebookShareButton>
      </li>
      <li className="pr-2 mx-1">
        <PinterestShareButton
          url={url}
          media={`${image} | ${url}`}
          description={`${name} | ${url}`}
        >
          <i className="fa-brands fa-pinterest"></i>
        </PinterestShareButton>
      </li>
      <li className="pr-2 mx-1">
        <TelegramShareButton url={url} title={name}>
          <i className="fa-brands fa-telegram"></i>
        </TelegramShareButton>
      </li>
      <li className="pr-2 mx-1">
        <TwitterShareButton url={url} title={name}>
          <i className="fa-brands fa-twitter"></i>
        </TwitterShareButton>
      </li>
      <li className="pr-2 mx-1">
        <WhatsappShareButton url={url} title={name} separator=":: ">
          <i className="fa-brands fa-whatsapp"></i>
        </WhatsappShareButton>
      </li>
      <li className="pr-2 mx-1">
        <LinkedinShareButton url={url}>
          <i className="fa-brands fa-linkedin"></i>
        </LinkedinShareButton>
      </li>
      <li className="pr-2 mx-1">
        <FacebookMessengerShareButton url={url} appId={""}>
          <i className="fa-brands fa-facebook-messenger"></i>
        </FacebookMessengerShareButton>
      </li>
    </ul>
  );
};

export default MasterSocial;
