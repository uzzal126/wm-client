import React from "react";

export default function Error({ error }: { error?: string }) {
  return (
    <div className="template-password">
      <div className="uix">
        <div className="ui1 position-absolute top-0 start-0">
          <img alt="" src="/images/ui1.svg" width={130} />
        </div>
        <div className="ui1 position-absolute bottom-0 start-0">
          <img alt="" src="/images/ui2.svg" width={130} />
        </div>
        <div className="ui1 position-absolute bottom-0 end-0">
          <img alt="" src="/images/ui3.svg" width={130} />
        </div>
      </div>
      <div className="container-fluid">
        <div className="d-flex flex-column align-item-center justify-content-between vh-100">
          <div className="d-flex w-100 h-100 align-items-center">
            <div className="row w-100 h-lg-100 align-items-center">
              <div className="col-lg-5">
                <div className="pl-lg-5 pt-5 pt-lg-0 text-center text-lg-left">
                  <div className="logo mt-5 mt-lg-0 pt-5 pt-lg-0 mb-4">
                    <img
                      src="/images/logo.png"
                      alt="Web"
                      className="img-fluid"
                      style={{ maxWidth: 320 }}
                    />
                  </div>
                  <h2 className="mb-4">{error || "Will be Opening Soon!"}</h2>
                </div>
              </div>
              <div className="col-lg-7 text-right">
                <div className="ui-img mr-lg-5 mt-5 mt-lg-0">
                  <img alt="" src="/images/access.png" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="mb-0 p-2 bg-white rounded d-inline-block position-relative z-index-1">
              {`© ${new Date().getFullYear()}, Powered by WebManza.com.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
