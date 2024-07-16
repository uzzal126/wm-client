import React, { FC } from "react";
import { VideoSection1 } from "../Collections/videos";

type Props = {
  data?: any;
};

const VideoHandler: FC<Props> = ({ data }) => {
  return (
    <>
      <VideoSection1 data={data} />
    </>
  );
};

export default VideoHandler;
