import Link from "next/link";
import { FC } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import {
  linkHandler,
  sliderConfig,
  styleGenerator,
} from "../../../helpers/misc";
import { selectStoreData } from "../../../redux-handler/reducers/storeDataReducer";
type Props = {
  data: any;
};
const Category: FC<Props> = ({ data }) => {
  let storeData = useSelector(selectStoreData);
  const { menu_all } = storeData;

  const bagTypes = [
    {
      name: "Category 1",
    },
    {
      name: "Category 2",
    },
    {
      name: "Category 3",
    },
    {
      name: "Category 4",
    },
    {
      name: "Category 5",
    },
    {
      name: "Category 6",
    },
  ];

  let existingData =
    data?.list &&
    data?.list.length > 0 &&
    data?.list.filter((f: any) => f.id !== 0).length > 0
      ? data?.list.filter((f: any) => f.id !== 0)
      : bagTypes;
  const customConfig = {
    ...sliderConfig(
      data?.setting?.slider,
      data?.setting?.show,
      existingData.length
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          autoplay: true,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          autoplay: true,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section
      className="section-b-space border-section"
      style={{
        ...styleGenerator(data?.setting?.styles),
      }}
    >
      <div className="container category-button">
        <Slider {...customConfig} className="partition1">
          {existingData.map((item: any, i: any) => (
            <div className="px-2" key={i}>
              <Link
                href={linkHandler(item, menu_all)}
                className="btn btn-outline btn-block"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export { Category };
