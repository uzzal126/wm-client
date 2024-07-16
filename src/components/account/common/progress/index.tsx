import { POST_PROGRESS_LIST } from "@/helpers/services/api";
import { queryRequest } from "@/helpers/services/request";
import moment from "moment";
import { useEffect, useState } from "react";

const OrderProgress = ({
  invoice_id,
  orderCancelled,
}: {
  invoice_id: any;
  orderCancelled?: any;
}) => {
  const [progress, setProgress] = useState([]);
  useEffect(() => {
    getProgress(invoice_id);
  }, [invoice_id, orderCancelled]);

  const getProgress = async (id: any) => {
    const res = await queryRequest(POST_PROGRESS_LIST, { invoice_id: id });
    if (res.success && res.status_code === 200) {
      setProgress(res.data);
    }
  };
  //console.log("progress", progress);

  return progress && progress.length > 0 ? (
    <div className="my-5 card">
      <div className="card-body">
        <div className="order-track">
          <h4>Order Status</h4>
          <div className="mb-3 separator separator-dashed border-dark"></div>
          {progress.map((item: any, i: any) => (
            <div className="order-track-step d-flex align-items-center" key={i}>
              <div className="mt-3 text-center order-track-date w-40px me-4 min-w-auto">
                <p
                  className="mr-2 order-track-date-stat text-muted"
                  style={{ minWidth: "120px" }}
                >
                  {moment.unix(item?.created_at).format("MMM D, h:mma")}
                </p>
              </div>
              <div
                className={`order-track-status px-2 ml-5 ${
                  i === 0 ? "active" : "completed"
                } `}
              >
                <span className="order-track-status-dot align-items-center d-flex justify-content-center">
                  <i className="text-white fa fa-check fs-5" />
                </span>
                <span className="order-track-status-line"></span>
              </div>
              <div className="order-track-text">
                <p
                  className={`order-track-text-stat ${
                    i === 0 ? "text-primary" : ""
                  }`}
                >
                  {item?.current_order_status}
                </p>
                <span className="order-track-text-sub">{item?.order_note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default OrderProgress;
