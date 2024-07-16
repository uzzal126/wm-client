import React, { FC } from "react";
import AboutWithService from "../Collections/about/About-Section";

type Props = {
  data?: any;
};

const AboutHandler: FC<Props> = ({ data }) => {
  return (
    <>
      <AboutWithService data={data} />
    </>
  );
};

export default AboutHandler;
