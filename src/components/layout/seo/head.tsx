import { parseJson } from "@/helpers/misc";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import Head from "next/head";
import { useSelector } from "react-redux";

type Props = {
  title: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
  author?: string;
  copyright?: string;
};

export default function SeoHead({
  description,
  keywords,
  title,
  author,
  copyright,
  image,
  url,
}: Props) {
  let storeData = useSelector(selectStoreData);
  let data = storeData?.data;
  let storInfo = data?.store_info;
  let marketing = storInfo?.marketing_tools;

  return (
    <Head>
      <title>
        {title || data?.store_info?.business_name || data?.store_info?.domain}
      </title>
      <link
        rel="icon"
        type="image/x-icon"
        href={
          data?.logo?.fav_logo ? data?.logo?.fav_logo : "/images/favicon.ico"
        }
      ></link>
      <meta
        name="description"
        content={description || data?.seo?.meta_description}
      />
      <meta name="keywords" content={keywords || data?.seo?.meta_keywords} />
      <meta
        name="author"
        content={author || title || data?.store_info?.domain}
      />
      <meta
        name="copyright"
        content={
          copyright ||
          `© ${new Date().getFullYear()} All Rights Reserved by ${
            data?.store_info?.domain || "The Owner"
          }`
        }
      />
      <meta name="robots" content="index,nofollow" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="video.movie" />
      <meta property="og:url" content={url || data?.store_info?.domain} />
      <meta
        property="og:image"
        content={image || data?.seo?.meta_image || ""}
      />
      <meta property="og:description" content={description} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={image || data?.seo?.meta_image || ""}
      />
      <meta
        name="twitter:card"
        content={image || data?.seo?.meta_image || ""}
      />
      {Array.isArray(marketing) &&
        marketing.length > 0 &&
        marketing.map((item, indx) => (
          <div dangerouslySetInnerHTML={{ __html: parseJson(item?.code) }} />
        ))}
    </Head>
  );
}
