import Head from "next/head";
import { RenderHead, RenderHtmlDom } from "./render";

export default function FacebookLiveChat({ marketing_tools }: any) {

  const fb_chat = Array.isArray(marketing_tools)
    ? marketing_tools.find(e => e?.slug === "livechat")
    : null;

  if (!fb_chat) return <></>;

  let code = { head: "", body: '' };
  try {
    code = fb_chat && fb_chat?.code && typeof (fb_chat?.code) === 'string' ? JSON.parse(fb_chat?.code) : ''
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

