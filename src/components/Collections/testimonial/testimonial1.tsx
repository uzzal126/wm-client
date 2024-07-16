import React, { FC } from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";

type tProps = {
  img: string;
  name: string;
  post: string;
  about: any;
};

const TestiSlider: FC<tProps> = ({ img, name, post, about }) => {
  return (
    <div>
      <div className="review-content">
        {img && (
          <div className="avtar">
            <img src={img} alt="" />
          </div>
        )}
        <h5>{name}</h5>
        <h6>{post}</h6>
        <div dangerouslySetInnerHTML={{ __html: about }}></div>
      </div>
    </div>
  );
};

type Props = {
  data: any;
};

const Testimonial1: FC<Props> = ({ data }) => {
  return (
    <section className="section-b-space blog-section">
      <Container>
        <div className="review-box">
          <Slider className="slide-1">
            {data &&
              data.list.length > 0 &&
              data.list.map((item: any, i: number) => {
                return (
                  <TestiSlider
                    key={i}
                    img={item.avatar}
                    name={item.name}
                    post={item.designation}
                    about={item.details}
                  />
                );
              })}
          </Slider>
        </div>
      </Container>
    </section>
  );
};

export { Testimonial1 };
