import React, { FC } from "react";
import { ServiceLayout1 } from "../Collections/Service";

type Props = {
  data?: any;
};

const ServiceHandler: FC<Props> = ({ data }) => {
  return (
    <>
      <ServiceLayout1 data={data} sectionClass="border-section small-section" />
    </>
  );
};

export default ServiceHandler;
