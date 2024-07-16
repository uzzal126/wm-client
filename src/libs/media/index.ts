import * as React from "react";

export interface CSSModule {
  [className: string]: string;
}

export interface MediaProps extends React.HTMLAttributes<HTMLElement> {
  [key: string]: any;
  body?: boolean;
  bottom?: boolean;
  cssModule?: CSSModule;
  heading?: boolean;
  left?: boolean;
  list?: boolean;
  middle?: boolean;
  object?: boolean;
  right?: boolean;
  tag?: React.ElementType;
  top?: boolean;
  src?: string;
  href?: string;
  alt?: string;
}

export class Media extends React.Component<MediaProps> {
  render() {
    const { tag = "img", ...attributes } = this.props;
    const TagElement = tag as React.ElementType;

    return React.createElement(TagElement, attributes);
  }
}

export default Media;
