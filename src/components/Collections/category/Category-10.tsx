import Link from "next/link";
import { FC } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import {
  linkHandler,
  sliderConfig,
  styleGenerator,
} from "../../../helpers/misc";
import { svgLeaf } from "../../../helpers/services/script";
import { selectStoreData } from "../../../redux-handler/reducers/storeDataReducer";

const Data = [
  {
    img: svgLeaf,
    title: "19+ Only",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem blanditiis cupiditate deleniti",
  },
  {
    img: svgLeaf,
    title: "30g limit",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem blanditiis cupiditate deleniti",
  },
  {
    img: svgLeaf,
    title: "trusted source",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem blanditiis cupiditate deleniti",
  },
];

type Component = {
  img: any;
  title: any;
  link: any;
  desc: any;
};

const MasterSection: FC<Component> = ({ img, title, desc, link }) => {
  return (
    <div className="px-3 py-2 detail_section">
      <div className="text-center">
        <Link href={link || "#"}>
          <>
            {img && img?.includes("http") ? (
              <div
                className="mx-auto d-flex align-items-center"
                style={{
                  width: 60,
                  height: 60,
                }}
              >
                <img src={img} alt="" width={48} className="d-inline" />
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: svgLeaf }}></div>
            )}
            <h4>{title}</h4>
            <p>{desc}</p>
          </>
        </Link>
      </div>
    </div>
  );
};

type Props = {
  data: any;
};

const CategoryTen: FC<Props> = ({ data }) => {
  let storeData = useSelector(selectStoreData);
  const { menu_all } = storeData;

  let existingData =
    data?.list &&
    data?.list.length > 0 &&
    data?.list.filter((f: any) => f.id !== 0).length > 0
      ? data?.list.filter((f: any) => f.id !== 0)
      : Data;

  return (
    <section
      className="section-b-space detail-cannabis bg-grey"
      style={{
        ...styleGenerator(data?.setting?.styles),
      }}
    >
      <Container>
        {data?.setting?.layout_type === "slider" ? (
          <Slider
            {...sliderConfig(
              data?.setting?.slider,
              data?.setting?.show,
              existingData.length
            )}
            className="slide-4 no-arrow"
          >
            {existingData.map((data: any, i: any) => {
              return (
                <MasterSection
                  key={i}
                  img={data.icon || data.img}
                  title={data.name || data.title}
                  link={linkHandler(data, menu_all)}
                  desc={data.description || data.title}
                />
              );
            })}
          </Slider>
        ) : (
          <Row xl={data?.setting?.show?.desktop_row || 5} md={3} xs={1}>
            {existingData.map((data: any, i: any) => {
              return (
                <Col className="p-0 mb-1" key={i}>
                  <MasterSection
                    img={data.icon || data.img}
                    title={data.name || data.title}
                    link={linkHandler(data, menu_all)}
                    desc={data.description || data.title}
                  />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </section>
  );
};

export { CategoryTen };
