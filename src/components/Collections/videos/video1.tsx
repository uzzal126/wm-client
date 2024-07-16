import { youtube_parser } from "@/helpers/misc";
import React, { FC, Fragment, useState } from "react";
import { Container, Row, Col, Media, Modal } from "reactstrap";
const vedio = "/assets/images/beauty/video_1.jpg";

type Props = {
  data: any;
};

const VideoSection1: FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => {
    setOpen(!open);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <section className="video-section pt-0">
        <div className="title1">
          <h4>{data?.details}</h4>
          <h2 className="title-inner1">{data?.title || "product tutorial"}</h2>
        </div>
        <Container>
          <Row>
            <Col md="8" className="offset-md-2">
              <a href={"#"} onClick={onOpenModal}>
                <div className="video-img">
                  <img
                    src={data?.thumb || vedio}
                    alt=""
                    className="img-fluid blur-up lazyload"
                  />
                  <div className="play-btn">
                    <span>
                      <i className="fa fa-play" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
              </a>
              <Modal
                isOpen={open}
                toggle={onOpenModal}
                id="video"
                className="video-modal"
                centered
                size="lg">
                <iframe
                  height='550'
                  src={`https://youtube.com/embed/${youtube_parser(data?.list?.code)}`}
                  title='YouTube video player'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  // allowFullscreen
                ></iframe>
              </Modal>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export { VideoSection1 };
