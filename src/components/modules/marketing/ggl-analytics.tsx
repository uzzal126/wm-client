
import Head from "next/head";
import { RenderHead, RenderHtmlDom } from "./render";

export default function GoogleAnalytics({ marketing_tools }: any) {
  const ggl_analytics = Array.isArray(marketing_tools)
    ? marketing_tools.find(e => e?.slug === "ggl-analytics")
    : null;

  if (!ggl_analytics) return <></>;

  let code = { head: "", body: '' };
  try {
    code = ggl_analytics && ggl_analytics?.code && typeof (ggl_analytics?.code) === 'string' ? JSON.parse(ggl_analytics?.code) : ''
  } catch (e) { }

  const head = code && code?.head && typeof (code?.head) === 'string' ? JSON.parse(code?.head) : '';
  const body = code && code?.body && typeof (code?.body) === 'string' ? JSON.parse(code?.body) : '';

  if (!code) return <> </>;

  return <>
    {head && <Head>
      <RenderHead data={head} />
    </Head>}
    {body && <RenderHtmlDom data={body} />}
  </>;
}
