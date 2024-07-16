import Error from "@/components/error_handler/Error";
import ErrorBoundary from "@/components/error_handler/ErrorBoundary";
import SeoHead from "@/components/layout/seo/head";
import { getFontName, objectSortByKey } from "@/helpers/misc";
import axios from "axios";
import { NextPageContext } from "next";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextTopLoader from "nextjs-toploader";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import CommonLayout from "../components/layout";
import TapTop from "../components/widgets/Tap-Top";
import { AuthProvider } from "../contexts/auth/AuthProvider";
import { UserProvider } from "../contexts/auth/User";
import { CompareContextProvider } from "../contexts/Compare/CompareContext";
import { CurrencyContextProvider } from "../contexts/Currency/CurrencyContext";
import {
  BASE_URL,
  GET_ACCESS_TOKEN,
  GET_COMPONENTS,
  GET_STORE_INFO,
} from "../helpers/services/api";
import { setDataByKey } from "../redux-handler/reducers/storeDataReducer";

import FilterProvider from "@/contexts/filter/FilterProvider";
import store, { wrapper } from "@/store";
import { SessionProvider } from "next-auth/react";
import {
  Inter,
  Jost,
  Lato,
  Montserrat,
  Playfair_Display,
  Poppins,
  Roboto,
  Tinos,
} from "next/font/google";
import nookies, { setCookie } from "nookies";

import MarketingTools from "@/components/modules/marketing/marketing-tools";
import IncreaseVisitor from "@/components/visitor/increse";
import AddressProvider from "@/contexts/address/AddressProvider";
import CartProvider from "@/contexts/cart/CartContext";
import CheckoutProvider from "@/contexts/checkout/CheckoutContext";
import { WishlistContextProvider } from "@/contexts/wishlist/WishlistContext";
import { SSRProvider } from "react-bootstrap";
// Import FilePond styles
import StoreError from "@/components/error_handler/storeError";
import AOS from "aos";
import "aos/dist/aos.css";
import "filepond/dist/filepond.min.css";
import "flatpickr/dist/themes/material_green.css";
import { useEffect } from "react";
import "../animations.css";
import "../globals.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
  variable: "--font-lato",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-jost",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
});

const tinos = Tinos({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-tinos",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

const selectedFont: any = {
  poppins: poppins,
  roboto: roboto,
  tinos: tinos,
  inter: inter,
  jost: jost,
  montserrat: montserrat,
  lato: lato,
  playfair: playfair,
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (pageProps?.store) {
    store.dispatch(
      setDataByKey({
        key: "apiAccess",
        data: pageProps?.store.apiAccess,
      })
    );
    store.dispatch(
      setDataByKey({
        key: "sectionKey",
        data: pageProps?.store.sectionKey,
      })
    );
    store.dispatch(
      setDataByKey({
        key: "data",
        data: pageProps?.store.data,
      })
    );
  } else {
    if (pageProps?.access) {
      store.dispatch(
        setDataByKey({
          key: "apiAccess",
          data: pageProps?.access,
        })
      );
    }

    if (pageProps?.components) {
      const list: any = {};
      for (let i = 0; i < pageProps?.components?.length; i++) {
        const obj = pageProps?.components[i];
        list[obj?.slug?.toUpperCase()] = obj?.slug;
      }
      store.dispatch(
        setDataByKey({
          key: "sectionKey",
          data: list,
        })
      );
    }

    if (pageProps?.menus) {
      store.dispatch(
        setDataByKey({
          key: "menu_list",
          data: pageProps?.menus.filter((e: any) => e?.url_type == "category"),
        })
      );

      store.dispatch(
        setDataByKey({
          key: "menu_all",
          data: pageProps?.menus,
        })
      );
    }

    if (pageProps?.storeInfo) {
      const theme_info = objectSortByKey(pageProps?.storeInfo?.theme_info);
      store.dispatch(
        setDataByKey({
          key: "data",
          data: { ...pageProps?.storeInfo, theme_info },
        })
      );
    }
  }

  if (pageProps?.error) return <StoreError />;
  if (pageProps?.error) return <Error error={pageProps.error} />;

  const LocalState = store.getState();

  const data: any = LocalState?.store?.data;

  useEffect(() => {
    AOS.init({
      duration: 750,
      anchorPlacement: "top-bottom",
      offset: 150,
    });
    AOS.refresh();
  }, []);

  return (
    <SSRProvider>
      <ErrorBoundary>
        <SessionProvider>
          <Provider store={store}>
            <div
              style={
                selectedFont[
                  getFontName(data?.store_info?.site_font, "body_font") ||
                    "poppins"
                ]?.style
              }
              className={`${
                selectedFont[
                  getFontName(data?.store_info?.site_font, "body_font") ||
                    "poppins"
                ]?.variable
              } ${
                data?.store_info?.domain === "motorolabd.com"
                  ? "motorola-dark"
                  : ""
              }`}
            >
              <SeoHead
                title={`${data?.store_info?.site_title}`}
                description={
                  data?.seo?.meta_description || data?.store_info?.site_title
                }
                keywords={`${
                  data?.seo?.meta_keywords || data?.store_info?.site_title
                }, WebManza`}
                author={`${data?.store_info?.site_title}`}
                copyright={`© ${new Date().getFullYear()} All Rights Reserved by ${
                  data?.store_info?.domain || "The Owner"
                }`}
                image=""
                url=""
              />
              <MarketingTools />
              <IncreaseVisitor data={LocalState?.store?.apiAccess} />

              {router.pathname == "/tracking" ? (
                <Component {...pageProps} />
              ) : (
                <ThemeProvider
                  attribute="class"
                  defaultTheme={
                    data?.store_info?.domain === "motorolabd.com"
                      ? "dark"
                      : "light"
                  }
                >
                  <AuthProvider>
                    <UserProvider>
                      <CompareContextProvider>
                        <CurrencyContextProvider>
                          <AddressProvider>
                            <CheckoutProvider>
                              <CartProvider>
                                <WishlistContextProvider>
                                  <FilterProvider>
                                    <CommonLayout>
                                      <NextTopLoader
                                        color="var(--theme-deafult)"
                                        showSpinner={false}
                                      />
                                      <Component {...pageProps} />
                                    </CommonLayout>
                                  </FilterProvider>
                                </WishlistContextProvider>
                              </CartProvider>
                            </CheckoutProvider>
                          </AddressProvider>
                        </CurrencyContextProvider>
                      </CompareContextProvider>
                    </UserProvider>
                  </AuthProvider>
                  <ToastContainer
                    position="bottom-right"
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                  />
                  <TapTop />
                </ThemeProvider>
              )}
            </div>
          </Provider>
        </SessionProvider>
      </ErrorBoundary>
    </SSRProvider>
  );
}

type InitPropTypes = {
  req: any;
  Component: any;
  ctx: NextPageContext;
};

MyApp.getInitialProps = async ({ req, Component, ctx }: InitPropTypes) => {
  try {
    const origin: any = ctx.req?.headers?.host;

    const fetchCache = getCacheData();
    const response = await fetchCache(origin, ctx);

    return {
      pageProps: response,
    };
  } catch (error: any) {
    const origin: any = ctx.req?.headers?.host;
    console.log({
      origin: origin || "null",
      error: `🔴Data fetching error : ${error.message}`,
    });
    return {
      pageProps: {
        error: `Error occurred during data fetching (${error.message})`,
      },
    };
  }
};

export const getCacheData = () => {
  let cache: any = {};
  return async function getCache(origin: string, ctx: any) {
    if (
      typeof window !== "undefined" &&
      origin &&
      localStorage.getItem(`local-cache-${origin}`)
    ) {
      console.log(`🟩 local cache hit: ${origin}`);
      return {
        data: JSON.parse(localStorage.getItem(`local-cache-${origin}`) || ""),
      };
    }
    if (cache[`${origin}`]) {
      console.log(`🟩 local cache hit 2 origin: ${origin}`);
      return {
        ...cache[origin],
      };
    } else {
      const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
          Origin: origin,
        },
      });
      const cookies = nookies.get(ctx);
      let token = cookies?.token;
      let refresh_token = "";

      const returnNewData = async (
        token: string = "",
        refresh_token: string = ""
      ) => {
        const response1Promise = await fetch(GET_COMPONENTS, {
          headers: { Authorization: `${token}`, Origin: origin },
        }).then((response) => response.json());

        const response3Promise = await fetch(GET_STORE_INFO, {
          headers: { Authorization: `${token}`, Origin: origin },
        }).then((response) => response.json());

        const [data1, data2] = await Promise.all([
          response1Promise,
          response3Promise,
        ]);
        let access = {
          access_token: `${token}`,
          refresh_token: `${refresh_token}`,
        };

        cache[`${origin}`] = {
          access,
          components: data1?.data,
          storeInfo: data2?.data,
        };

        if (typeof window !== "undefined") {
          localStorage.setItem(
            `local-cache-${origin}`,
            JSON.stringify({
              access,
              components: data1?.data,
              storeInfo: data2?.data,
            })
          );
        }
        return {
          access,
          components: data1?.data,
          storeInfo: data2?.data,
        };
      };

      const getNewToken: any = async (invalidToken = false) => {
        const { data: response } = await axiosInstance.post(GET_ACCESS_TOKEN);
        if (response && response?.access_token) {
          token = `Bearer ${response?.access_token}`;
          refresh_token = `Bearer ${response?.refresh_token}`;
          // console.log(response)
          setCookie(ctx, "token", `${token}`, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
          setCookie(ctx, "refresh_token", `${refresh_token}`, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
          if (invalidToken) {
            const newData: any = await returnNewData(token, refresh_token);
            return newData;
          }
        } else {
          console.log({
            origin: origin || "null",
            error: "🔴 error occurred while getting token",
          });
          return { error: response.message };
        }
      };

      if (!token && !refresh_token) {
        // console.log('in not token')
        getNewToken();
      }

      const response1Promise = await fetch(GET_COMPONENTS, {
        headers: { Authorization: `${token}`, Origin: origin },
      }).then((response) => response.json());

      const response3Promise = await fetch(GET_STORE_INFO, {
        headers: { Authorization: `${token}`, Origin: origin },
      }).then((response) => response.json());

      if (!response1Promise?.success || !response3Promise?.success) {
        return getNewToken(true);
      }
      if (response1Promise?.success && response3Promise?.success) {
        const [data1, data2] = await Promise.all([
          response1Promise,
          response3Promise,
        ]);
        let access = {
          access_token: `${token}`,
          refresh_token: `${refresh_token}`,
        };
        cache[`${origin}`] = {
          access,
          components: data1?.data,
          storeInfo: data2?.data,
        };
        if (typeof window !== "undefined") {
          localStorage.setItem(
            `local-cache-${origin}`,
            JSON.stringify({
              access,
              components: data1?.data,
              storeInfo: data2?.data,
            })
          );
        }
        return {
          access,
          components: data1?.data,
          storeInfo: data2?.data,
        };
      }
    }
  };
};

export default wrapper.withRedux(MyApp);
