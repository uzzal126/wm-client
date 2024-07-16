import Image from "next/image";

import banner from "../../../public/images/404-page.gif";

export default function StoreError() {
  return (
    <div className="template-password">
      <div className="uix">
        <div className="top-0 ui1 position-absolute start-0">
          <img alt="" src="/images/ui1.svg" width={130} />
        </div>
        <div className="bottom-0 ui1 position-absolute start-0">
          <img alt="" src="/images/ui2.svg" width={130} />
        </div>
        <div className="bottom-0 ui1 position-absolute end-0">
          <img alt="" src="/images/ui3.svg" width={130} />
        </div>
      </div>
      <div className="container">
        <div className="d-flex flex-column align-item-center justify-content-between vh-100">
          <div className="pt-5 w-100 h-100">
            <div className="text-center">
              <Image src={banner} alt="" height={400} />
            </div>
            <div className="p-5 mt-5 text-center rounded-lg bg-light">
              <h2 className=" text-capitalize">This store does not exist.</h2>
              <a
                href="https://webmanza.com/pricing"
                className="mt-3 rounded btn btn-primary text-capitalize"
              >
                Start a free trial{" "}
              </a>
            </div>
            <div className="mt-3 row">
              <div className="col-lg-4">
                <div className="border-0 card">
                  <div className="card-body">
                    <h4>Free Trial</h4>
                    <p>
                      Before choosing the plan best fitted to your preferences,
                      try WebManza for 14 days without any payment
                    </p>
                    <a href="https://webmanza.com/pricing">
                      Start a free trial
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="border-0 card">
                  <div className="card-body">
                    <h4>E-Commerce</h4>
                    <p>
                      Get ahead of your competitors by automating inventory
                      management, delivery and payments
                    </p>
                    <a href="https://webmanza.com/pricing">Start Now</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="border-0 card">
                  <div className="card-body">
                    <h4>Portfolio & Blog</h4>
                    <p>
                      Showcase your experiences with access to customizable,
                      best-in-class templates and grow your audience
                    </p>
                    <a href="https://webmanza.com/pricing">Start Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="p-2 mb-0 bg-white rounded d-inline-block position-relative z-index-1">
              {`© ${new Date().getFullYear()}, Powered by `}
              <img
                src="/images/logo.png"
                alt="Web"
                className="img-fluid"
                style={{ maxWidth: 100 }}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
