import { createClient } from "contentful";

const ContentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE || "",
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENV || "master", // defaults to 'master' if not set
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
});

export default ContentfulClient;
