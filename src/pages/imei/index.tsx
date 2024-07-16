import { CHECK_IMEI_LSO, GET_STP_LIST } from "@/helpers/services/api";
import { getQueryRequest, queryRequest } from "@/helpers/services/request";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dummy_stp_list } from "../../eo-list";
import { searchValueInArrayObjects } from "../../helpers/misc";
import Page404 from "../404";

export default function CustomerServicePage() {
  let storeData = useSelector(selectStoreData);
  const { data } = storeData;
  const route = useRouter();
  const path = route.pathname;
  const [imei, setImei] = useState("");
  const [lso, setLso] = useState("");
  const [message_i, setMessageI] = useState(null);
  const [message_l, setMessageL] = useState(null);
  const [stp_list, setStpList] = useState<any>([]);
  const [results, setResults] = useState<any>([]);
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStpList();
  }, []);

  const getStpList = async () => {
    const res = await getQueryRequest(`${GET_STP_LIST}/stp_list`);
    setLoading(false);
    if (res?.success && res?.data && Array.isArray(res?.data)) {
      setStpList(res?.data);
      setResults(res?.data);
    } else {
      setResults(dummy_stp_list);
      setStpList(dummy_stp_list);
    }
  };

  const handleIMEICheck = async () => {
    setMessageI(null);
    const res = await queryRequest(`${CHECK_IMEI_LSO}`, {
      s_type: "imei",
      s_key: imei,
    });
    if (res?.success && res?.data) {
      setMessageI(res?.data["Msg"]);
    }
  };

  const handleLSOCheck = async () => {
    setMessageL(null);
    const res = await queryRequest(`${CHECK_IMEI_LSO}`, {
      s_type: "lso",
      s_key: lso,
    });
    if (res?.success && res?.data) {
      setMessageL(res?.data);
    }
  };

  if (data?.store_info?.store_cat_id === 20) {
    return (
      <div className="py-5">
        <Page404 />
      </div>
    );
  }

  return (
    <div className="mt-10 page-content contact-us">
      <div className="container">
        <div className="my-profile" style={{ paddingTop: 2 }}>
          <div className="row align-items-center">
            <div
              className="ml-auto mr-auto col-lg-10"
              style={{ marginLeft: 50 }}
            >
              <div className="imei-page">
                <div className="tab tab-nav-boxed tab-nav-underline show-code-action">
                  <ul className="nav nav-tabs " role="tablist">
                    <li className="flex-1 mr-2 nav-item">
                      <Link
                        href={`/imei`}
                        className={`nav-link d-flex flex-column ${
                          path == "/imei" ? "active" : ""
                        }`}
                      >
                        <i
                          className="fas fa-mobile-screen-button"
                          style={{
                            fontSize: "50px",
                            marginBottom: "13px",
                          }}
                        ></i>
                        <span>IMEI</span>
                      </Link>
                    </li>
                    <li className="flex-1 mr-2 nav-item">
                      <Link
                        href={`lso-enquery`}
                        className={`nav-link d-flex flex-column ${
                          path == "/lso-enquery" ? "active" : ""
                        }`}
                      >
                        <i
                          className="fas fa-pager"
                          style={{
                            fontSize: "50px",
                            marginBottom: "13px",
                          }}
                        ></i>
                        <span>LSO Enquery</span>
                      </Link>
                    </li>
                    <li className="flex-1 nav-item">
                      <Link
                        href={`/customer-care`}
                        className={`nav-link d-flex flex-column ${
                          path == "/customer-care" ? "active" : ""
                        }`}
                      >
                        <i
                          className="fas fa-headset"
                          style={{
                            fontSize: "50px",
                            marginBottom: "13px",
                          }}
                        ></i>
                        <span>Customer Care</span>
                      </Link>
                    </li>
                  </ul>
                  <div className="py-5 tab-content">
                    <div
                      className={`tab-pane ${path == "/imei" ? "active" : ""}`}
                      id="imei-tab"
                    >
                      <div
                        className="post-wrap "
                        data-post-image="wolmart-post-small"
                      >
                        <article className="d-lg-flex">
                          <figure className="post-media">
                            <a href="#" aria-label="Post Media">
                              <img
                                style={{}}
                                width={400}
                                height={280}
                                src="/images/symphony-imei.jpg"
                                className="attachment-wolmart-post-small size-wolmart-post-small wp-post-image"
                                alt="post"
                              />{" "}
                            </a>
                          </figure>
                          <div
                            className="flex-1 pl-5 post-details"
                            style={{ marginTop: 50 }}
                          >
                            <h3 className="post-title">
                              <a href="#">imei 1 Number (15 Digits)</a>
                            </h3>{" "}
                            <div className="post-content">
                              <div className="card-body">
                                {/* <div className='pl-0 card-head'>
                                  <h2>Customer Info</h2>
                                </div> */}
                                <div className="scrollable">
                                  <div className="sticky-sidebar">
                                    <div className="widget widget-products">
                                      <div className="mb-5 input-group w-100">
                                        <input
                                          type="number"
                                          className="pt-2 pb-2 form-control"
                                          placeholder="Your IMEI Number"
                                          value={imei}
                                          onChange={(e) =>
                                            setImei(e.target.value)
                                          }
                                          required
                                        />
                                      </div>
                                      <div className="text-sm-center">
                                        <button
                                          className="btn btn-primary"
                                          onClick={handleIMEICheck}
                                        >
                                          <span>Check</span>
                                        </button>
                                      </div>
                                      {message_i && (
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: message_i,
                                          }}
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                    <div
                      className={`tab-pane ${
                        path == "/lso-enquery" ? "active" : ""
                      }`}
                      id="lso-tab"
                    >
                      <div
                        className="post-wrap "
                        data-post-image="wolmart-post-small"
                      >
                        <article className="d-lg-flex">
                          <figure className="post-media">
                            <a href="#" aria-label="Post Media">
                              <img
                                style={{}}
                                width={400}
                                height={280}
                                src="/images/symphony-imei.jpg"
                                className="attachment-wolmart-post-small size-wolmart-post-small wp-post-image"
                                alt="post"
                              />{" "}
                            </a>
                          </figure>
                          <div
                            className="flex-1 pl-5 post-details"
                            style={{ marginTop: 50 }}
                          >
                            <h3 className="post-title">
                              <a href="#">LSO Enquery</a>
                            </h3>{" "}
                            <div className="post-content">
                              <div className="card-body">
                                {/* <div className='pl-0 card-head'>
                                                                      <h2>Customer Info</h2>
                                                                    </div> */}
                                <div className="scrollable">
                                  <div className="sticky-sidebar">
                                    <div className="widget widget-products">
                                      <div className="mb-5 input-group w-100">
                                        <input
                                          type="text"
                                          className="pt-2 pb-2 form-control"
                                          placeholder="LSO or IMEI1 Number"
                                          value={lso}
                                          onChange={(e) => {
                                            setLso(e.target.value);
                                          }}
                                          required
                                        />
                                      </div>
                                      <div className="text-sm-center">
                                        <button
                                          className="mb-5 btn btn-primary"
                                          onClick={handleLSOCheck}
                                        >
                                          <span>Submit</span>
                                        </button>
                                      </div>
                                      {message_l && (
                                        <article className="d-block">
                                          <table
                                            className="table"
                                            style={{
                                              borderCollapse: "collapse",
                                            }}
                                          >
                                            <thead>
                                              <tr>
                                                <th>LSO Code</th>
                                                <th>Branch Name</th>
                                                <th>IMEI</th>
                                                {/* <th>Customer Name</th>
                                              <th>Customer Contact</th> */}
                                                <th>Model Name</th>
                                                <th>Receive Date</th>
                                                <th>Job Status</th>
                                              </tr>
                                            </thead>

                                            <tbody>
                                              <tr>
                                                <td>
                                                  {message_l["LSOCode"]
                                                    ? message_l["LSOCode"]
                                                    : ""}
                                                </td>
                                                <td>
                                                  {message_l["BranchName"]
                                                    ? message_l["BranchName"]
                                                    : ""}
                                                </td>
                                                <td>
                                                  {message_l["IMEI"]
                                                    ? message_l["IMEI"]
                                                    : ""}
                                                </td>
                                                {/* <td>{message_l['IMEI'] ? message_l['IMEI'] : ""}</td>
                                              <td>{message_l['IMEI'] ? message_l['IMEI'] : ""}</td> */}
                                                <td>
                                                  {message_l["ModelName"]
                                                    ? message_l["ModelName"]
                                                    : ""}
                                                </td>
                                                <td>
                                                  {message_l["ReceiveDate"]
                                                    ? message_l["ReceiveDate"]
                                                    : ""}
                                                </td>
                                                <td>
                                                  {message_l["JobStatus"]
                                                    ? message_l["JobStatus"]
                                                    : ""}
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </article>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                    <div
                      className={`tab-pane ${
                        path == "/customer-care" ? "active" : ""
                      }`}
                      id="support-tab"
                    >
                      <div>
                        <div>
                          <form
                            style={{
                              paddingBottom: "20px",
                              paddingTop: "10px",
                            }}
                            className={`form-inline subscribe-form`}
                          >
                            <input
                              type={`text`}
                              placeholder={`Search...`}
                              className={`form-control mr-2`}
                              value={key}
                              onChange={(e) => setKey(e.target.value)}
                            />
                            <button
                              type={`submit`}
                              className={`btn-solid btn-secondary`}
                              style={{ borderRadius: "5px" }}
                              onClick={(e) => {
                                e.preventDefault();
                                setResults(
                                  searchValueInArrayObjects(stp_list, key)
                                );
                              }}
                            >
                              Search
                            </button>
                          </form>
                        </div>
                      </div>

                      {loading ? (
                        <h5 style={{ textAlign: "center" }}>loading...</h5>
                      ) : stp_list.length !== results.length ? (
                        <div>
                          <div className="ml-auto mr-auto">
                            <h5
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                                color: "red",
                              }}
                              onClick={() => {
                                setKey("");
                                setResults(stp_list);
                              }}
                            >
                              Clear Results
                            </h5>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="pt-2 pb-2">
                        <span className="text-warning">
                          বিঃদ্রঃ সরকারি ছুটির দিনে কাস্টমার কেয়ার বন্ধ থাকবে
                        </span>
                      </div>
                      {/* {stp_list.length !== results.length ? (
                        <div>
                          <div className="ml-auto mr-auto">
                            <h5
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                                color: "red",
                              }}
                              onClick={() => {
                                setKey("");
                                setResults(stp_list);
                              }}
                            >
                              Clear Results
                            </h5>
                          </div>
                        </div>
                      ) : (
                        ""
                      )} */}
                      <div
                        className="post-wrap "
                        data-post-image="wolmart-post-small"
                      >
                        <article className="d-block table-responsive">
                          <table
                            className="table"
                            style={{
                              borderCollapse: "collapse",
                            }}
                          >
                            <thead>
                              <tr>
                                <th
                                  className="text-center custom-border"
                                  scope="col"
                                >
                                  SI NO.
                                </th>
                                <th
                                  className="text-center custom-border"
                                  scope="col"
                                >
                                  Branch
                                </th>
                                <th
                                  className="text-center custom-border"
                                  scope="col"
                                >
                                  Service Hour
                                </th>
                                <th
                                  className="text-center custom-border"
                                  scope="col"
                                >
                                  Weekend
                                </th>
                                <th
                                  className="text-center custom-border"
                                  scope="col"
                                >
                                  Address
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {results.map((item: any, indx: number) => (
                                <tr key={indx}>
                                  <th
                                    className="text-center custom-border"
                                    scope="row"
                                  >
                                    {indx + 1}
                                  </th>
                                  <td className="text-center custom-border">
                                    {item["Branch"]}
                                  </td>
                                  <td className="text-center custom-border">
                                    {item["Service Hour"]}
                                  </td>
                                  <td className="text-center custom-border">
                                    {item["Weekend"]}
                                  </td>
                                  <td className="custom-border">
                                    {item[`Address_Bangla`] +
                                      item["Address_English"]}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
