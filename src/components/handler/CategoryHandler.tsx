import { FC } from "react";
import {
  Category,
  CategoryEight,
  CategoryFive,
  CategoryFour,
  CategoryNine,
  CategorySeven,
  CategorySix,
  CategoryTen,
  CategoryTwo,
} from "../Collections/category";

type Props = {
  data?: any;
};

const CategoryHandler: FC<Props> = ({ data }) => {
  // console.log("cat data", data);
  return data && data?.setting ? (
    data?.setting?.template === "text-slider" ? (
      <Category data={data} />
    ) : data?.setting?.template === "modern-grid" ? (
      <CategoryTwo data={data} />
    ) : data?.setting?.template === "icon-slider" ? (
      <CategoryFour data={data} />
    ) : data?.setting?.template === "icon-details-grid-slider" ? (
      <CategoryTen data={data} />
    ) : data?.setting?.template === "text-box-slider" ? (
      <CategoryFive data={data} />
    ) : data?.setting?.template === "hover-box-grid-slider" ? (
      <CategorySix data={data} />
    ) : data?.setting?.template === "list-box-grid-slider" ? (
      <CategorySeven data={data} />
    ) : data?.setting?.template === "border-box-grid-slider" ? (
      <CategoryEight data={data} />
    ) : data?.setting?.template === "simple-box-grid-slider" ? (
      <CategoryNine data={data} />
    ) : (
      <p className="py-5 text-center text-danger">Please configure again</p>
    )
  ) : (
    <CategoryFour data={data} />
  );
};

export default CategoryHandler;
