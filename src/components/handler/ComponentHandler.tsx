import React, { FC } from "react";

type Props = {
  component: any;
  sectionData: any;
};

const ComponentHandler: FC<Props> = ({ component, sectionData }) => {
  return (
    <>
      {sectionData?.setting?.styles?.animation &&
      sectionData?.setting?.styles?.animation !== "none" ? (
        <div
          data-aos={sectionData?.setting?.styles?.animation || null}
          data-aos-duration="750"
        >
          {React.cloneElement(component, { data: sectionData })}
        </div>
      ) : (
        <>{React.cloneElement(component, { data: sectionData })}</>
      )}
    </>
  );
};

export default ComponentHandler;
