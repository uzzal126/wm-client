import JobApplyForm from "@/components/forms/JobApplyForm";
import { check_date_expiry, getTimeFromUnixValue } from "@/helpers/misc";
import { getLocal } from "@/helpers/storage";
import Login from "@/pages/auth/login";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Col, Container, Row } from "reactstrap";
import JobApplyButton from "./JobApplyButton";

type Props = {
  title?: string;
  jobType?: string;
  location?: string;
  image?: string;
  date?: string;
  deadline?: string;
  salary?: string;
  gender?: string;
  description?: string;
  data?: any;
};

const JobDetails = ({
  title = "Frontend Developer",
  jobType = "",
  location = "",
  image = "",
  gender = "",
  date = "",
  deadline = "",
  salary = "",
  description,
  data = {
    id: 1,
  },
}: Props) => {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const user = getLocal("user");
  // const [hydrated, setHydrated] = useState(false);
  // useEffect(() => {
  //   setHydrated(true);
  // }, []);
  // if (!hydrated) {
  //   return null;
  // }

  const todayInUnix = Date.now() / 1000;

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header>
          <Modal.Title>Job Application</Modal.Title>
          <Modal.Title onClick={() => setShow(false)} className="text-danger">
            <i
              className="fa fa-times-circle"
              style={{ cursor: "pointer", fontSize: 30 }}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JobApplyForm data={data} setModal={() => setShow(false)} />
        </Modal.Body>
      </Modal>
      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Body className="py-3">
          <Login
            fromJob={true}
            setModal={() => setShowLogin(false)}
            setJobModal={() => setShow(true)}
          />
        </Modal.Body>
      </Modal>
      <section className="blog-detail-page section-b-space ratio2_3">
        <Container>
          <Row>
            <Col sm="12" className="blog-detail">
              <div className="d-none d-lg-block">
                <img
                  src={image || "/images/sample-desktop-banner.png"}
                  width={700}
                  height={"auto"}
                  alt=""
                />
              </div>
              <div className="d-block d-lg-none">
                <img
                  src={image || "/images/sample-desktop-banner.png"}
                  className="w-auto h-auto img-fluid blur-up lazyload"
                  alt=""
                />
              </div>
              <h3 className="text-4xl">{title || ""}</h3>
              <div className="d-flex post-social flex-column flex-lg-row">
                <ul className="list-none">
                  <li>
                    {date
                      ? getTimeFromUnixValue(date, "DD MMMM, YYYY")
                      : getTimeFromUnixValue(1694948526, "DD MMMM, YYYY")}
                  </li>
                </ul>
                <div className="ml-lg-4 mr-lg-2" style={{ fontWeight: 600 }}>
                  {jobType}
                </div>
                <div
                  className="my-1 mx-lg-1 my-lg-0"
                  style={{ fontWeight: 600 }}
                >
                  Age: {data?.age}
                </div>
                <div
                  className="my-1 mx-lg-1 my-lg-0"
                  style={{ fontWeight: 600 }}
                >
                  Gender: {data?.gender}
                </div>
                <div
                  className="my-1 mx-lg-1 my-lg-0"
                  style={{ fontWeight: 600 }}
                >
                  Experience: {data?.experience} years
                </div>
                <div
                  className={`my-1 mx-lg-1 my-lg-0 ${
                    check_date_expiry(todayInUnix, data?.deadline)
                      ? "text-danger"
                      : ""
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  Deadline:{" "}
                  {data?.deadline
                    ? getTimeFromUnixValue(data?.deadline, "DD MMM, YYYY")
                    : getTimeFromUnixValue(1694948526, "DD MM, YYYY")}
                </div>
                {/* <div className="flex-row pl-3 d-flex">
                  <MasterSocial
                    image={image}
                    name={title}
                    url={`career/jobs/${data?.id}`}
                  />
                </div> */}
                <JobApplyButton
                  setShow={setShow}
                  setShowLogin={setShowLogin}
                  user={user}
                  disabled={check_date_expiry(todayInUnix, data?.deadline)}
                />
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    description ||
                    `<h3>No Job Description</h3><p>No Job Description</p><br/>`,
                }}
              />
            </Col>
          </Row>
          {/* <Row className="my-5 blog-contact">
            <Col sm="12">
              <h2>Apply</h2>
              <Form className="theme-form">
                <Row>
                  <Col md="12">
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter Your name"
                    />
                  </Col>
                  <Col md="12">
                    <Label for="email">Email</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                    />
                  </Col>
                  <Col md="12">
                    <Label for="exampleFormControlTextarea1">Comment</Label>
                    <textarea
                      className="form-control"
                      placeholder="Write Your Comment"
                      id="exampleFormControlTextarea1"
                    ></textarea>
                  </Col>
                  <Col md="12">
                    <button className="btn btn-solid" type="submit">
                      Post Comment
                    </button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row> */}
        </Container>
      </section>
    </>
  );
};

export default JobDetails;
