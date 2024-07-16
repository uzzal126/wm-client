import React from "react";
import EditorComp from "../components/editor";
import ImageComp from "../components/image";

const CompHelper = ({ data }) => {
  return (
    <div>
      {data?.type === "editor" && <EditorComp data={data?.body} />}
      {data?.type === "image" && <ImageComp data={data?.body} />}
    </div>
  );
};

export default CompHelper;
