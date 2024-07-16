import Link from "next/link";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import IconLink from "../Team/helper/IconLink";

type SocialType = {
  url: string;
  icon: string;
};

type fieldType = {
  image?: string;
  title?: string;
  profile_url?: string;
  details?: string;
  subtitle?: string;
  socials?: SocialType[] | undefined;
};

type Props = {
  data: fieldType;
};
function AboutMe({ data }: Props) {
  const [show, setShow] = useState(false);
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header>
          <Modal.Title>{data?.title}</Modal.Title>
          <Modal.Title onClick={() => setShow(false)} className="text-danger">
            <i
              className="fa fa-times-circle"
              style={{ cursor: "pointer", fontSize: 30 }}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-5 py-3">
          <div className="flex-row py-3 d-flex">
            <Link href={data?.profile_url || "#"}>
              <img
                src={data?.image || "/images/dummy_pic.png"}
                height={"auto"}
                width={"200px"}
                alt={data?.title}
                className="my-2 rounded img-responsive img-fluid"
              />
            </Link>
            <div className="p-3 d-flex flex-column">
              <h3>{data?.title}</h3>
              <p style={{ fontWeight: 600 }}>{data?.subtitle}</p>
            </div>
          </div>

          <p>{data?.details}</p>
        </Modal.Body>
      </Modal>
      <div className="h-100">
        <div>
          <div className="rounded-lg shadow-sm d-flex flex-column align-items-center h-100">
            <Link href={data?.profile_url || "#"}>
              <img
                src={data?.image || "/images/dummy_pic.png"}
                height={"auto"}
                alt={data?.title}
                className="rounded img-responsive img-fluid"
              />
            </Link>
            <div className="px-3 py-3 mb-3 text-center">
              <h3 className="mt-2">{data?.title}</h3>
              <p style={{ fontWeight: 600 }}>{data?.subtitle}</p>
              <span style={{ fontWeight: 400, textAlign: "justify" }}>
                {data?.details && data?.details?.length > 350 ? (
                  <span>
                    {`${data?.details?.slice(0, 350)}...`}
                    <span
                      style={{ color: "#3e97ff" }}
                      onClick={() => setShow(true)}
                      className="pointer"
                    >
                      view more
                    </span>
                  </span>
                ) : (
                  data?.details
                )}
              </span>
            </div>
            <div className="flex-row py-3 d-flex align-items-center">
              <IconLink data={data?.socials || []} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutMe;
