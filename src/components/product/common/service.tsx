import React from "react";

import MasterServiceContent from "../../Collections/Service/MasterServiceConternt";

const Service = ({ data }: any) => {
  return (
    <div className="collection-filter-block">
      <div className="product-service">
        {data?.list?.length > 0 &&
          data?.list?.map((data: any, index: number) => {
            return (
              <MasterServiceContent
                key={index}
                link={data.link}
                icon={data?.icon}
                title={data.title}
                service={data.content}
                lastChild={data.lastChild}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Service;
