import Head from "next/head";
import { RenderHead, RenderHtmlDom } from "./render";

export default function FacebookPixel({ marketing_tools }: any) {
  const fb_pixel = Array.isArray(marketing_tools)
    ? marketing_tools.find(e => e?.slug === "fb-pixel")
    : null;

  if (!fb_pixel) return <></>;

  let code = { head: "", body: '' };
  try {
    code = fb_pixel && fb_pixel?.code && typeof (fb_pixel?.code) === 'string' ? JSON.parse(fb_pixel?.code) : ''
  } catch (e) { }

  const head = code && code?.head && typeof (code?.head) === 'string' ? JSON.parse(code?.head) : '';
  const body = code && code?.body && typeof (code?.body) === 'string' ? JSON.parse(code?.body) : '';

  if (!code) return <></>;

  return <>
    {head && <Head>
      <RenderHead data={head} />
    </Head>}
    {body && <RenderHtmlDom data={body} />}
  </>;

}
