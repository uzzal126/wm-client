import { FC } from "react";
import { Container } from "react-bootstrap";
import { styleGenerator } from "../../helpers/misc";

type Props = {
  data?: any;
};

const TextBlockHandler: FC<Props> = ({ data }) => {
  return (
    <section
      className="section-b-space blog-section"
      style={{ ...styleGenerator(data?.setting?.styles) }}
    >
      <Container>
        <div className="box">
          <div
            dangerouslySetInnerHTML={{ __html: data?.content }}
            className="text-block"
          ></div>
        </div>
      </Container>
    </section>
  );
};
export default TextBlockHandler;
