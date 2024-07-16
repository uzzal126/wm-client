import { GET_STP_LIST } from "@/helpers/services/api";
import { getQueryRequest } from "@/helpers/services/request";
import { useEffect, useState } from "react";
import { dummyEoList } from "../../eo-list";
import { searchValueInArrayObjects } from "../../helpers/misc";

export default function Index() {
  const [eoList, setEoList] = useState<any>([]);
  const [results, setResults] = useState<any>([]);
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEoList();
  }, []);

  const getEoList = async () => {
    const res = await getQueryRequest(`${GET_STP_LIST}/eo_list`);
    setLoading(false);
    console.log("🚀 ~ getEoList ~ res:", res);
    if (res?.success && res?.data && Array.isArray(res?.data)) {
      setEoList(res?.data);
      setResults(res?.data);
    } else {
      setResults(dummyEoList);
      setEoList(dummyEoList);
    }
  };

  return (
    <div className="mt-10 page-content contact-us">
      <div className="container">
        <div className={`row align-items-right`}>
          <div className="ml-auto mr-auto col-lg-10">
            <form
              style={{ paddingBottom: "20px", paddingTop: "10px" }}
              className={` subscribe-form d-flex flex-row`}
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
                  setResults(searchValueInArrayObjects(eoList, key));
                }}
              >
                Search
              </button>
            </form>
          </div>
        </div>
        {eoList.length !== results.length ? (
          <div className={`row align-items-center`}>
            <div className="ml-auto mr-auto col-lg-10">
              <h5
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "red",
                }}
                onClick={() => {
                  setKey("");
                  setResults(eoList);
                }}
              >
                Clear Results
              </h5>
            </div>
          </div>
        ) : (
          ""
        )}
        {loading ? (
          <h5 className="align-items-center">loading ...</h5>
        ) : (
          <div className="my-profile" style={{ paddingTop: 10 }}>
            <div className="row align-items-center">
              <div
                className="ml-auto mr-auto col-lg-10"
                style={{ marginLeft: 50 }}
              >
                <div className="imei-page">
                  <article className="custom-format table-responsive">
                    <table
                      className="table"
                      style={{
                        borderCollapse: "collapse",
                      }}
                    >
                      <thead>
                        <tr>
                          <th className="text-center custom-border" scope="col">
                            SI NO.
                          </th>
                          <th className="text-center custom-border" scope="col">
                            District
                          </th>
                          <th className="text-center custom-border" scope="col">
                            RetailerName
                          </th>
                          <th className="text-center custom-border" scope="col">
                            Address
                          </th>
                          <th className="text-center custom-border" scope="col">
                            Contact
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((item: any, indx: any) => {
                          return (
                            <tr key={indx}>
                              <th
                                className="text-center custom-border"
                                scope="row"
                              >
                                {indx + 1}
                              </th>
                              <td className="p-2 text-center custom-border">
                                {item[`District`]}
                              </td>
                              <td className="p-2 text-center custom-border">
                                {item[`RetailerName`]}
                              </td>
                              <td className="p-2 text-center custom-border">
                                {item[`Address`]}
                              </td>
                              <td className="p-2 text-center custom-border">
                                {item[`Contact`]}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </article>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
