import React, { FC } from "react";
import SliderComponent1 from "../Collections/slider/Slider";

type Props = {
  data?: any;
};

const SliderHandler: FC<Props> = ({ data }) => {
  return (
    <>
      <SliderComponent1
        data={data}
        sectionClass="border-section small-section"
      />
    </>
  );
};

export default SliderHandler;
