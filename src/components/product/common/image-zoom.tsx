import React, { FC } from "react";
import { Media } from "reactstrap";

type Props = {
  image: string;
};

const ImageZoom: FC<Props> = ({ image }) => {
  return (
    <Media
      src={`${image}`}
      alt={image}
      className="img-fluid image_zoom_cls-0"
    />
  );
};

export default ImageZoom;
