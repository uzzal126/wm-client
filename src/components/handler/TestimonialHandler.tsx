import React, { FC } from "react";
import { Testimonial1 } from "../Collections/testimonial";

type Props = {
  data?: any;
};

const TestimonialHandler: FC<Props> = ({ data }) => {
  return (
    <>
      <Testimonial1 data={data} />
    </>
  );
};

export default TestimonialHandler;
