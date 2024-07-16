import { useFilter } from "@/contexts/filter/FilterProvider";
import { useGetCategoryListQuery } from "@/redux-handler/api/slices/productSlice";
import Link from "next/link";
import { useState } from "react";
import { Collapse } from "reactstrap";

const Category = () => {
  const { apiSlug, category_slug } = useFilter();
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);

  const { categories, isLoading } = useGetCategoryListQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      categories:
        data?.data && data?.data.length > 0
          ? data?.data.filter((e: any) => e?.url_type == "category")
          : [],
      isLoading: isLoading,
    }),
  });

  if (isLoading) return <></>;

  return (
    <>
      <div className="collection-collapse-block open">
        <h3 className="collapse-block-title" onClick={toggleCategory}>
          Category
        </h3>
        <Collapse isOpen={isCategoryOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
              <ul className="category-list">
                <li>
                  <Link
                    href={`/category/?${apiSlug}`}
                    style={{
                      color: !category_slug ? "var(--theme-deafult)" : "",
                    }}
                  >
                    all products
                  </Link>
                </li>
                {categories &&
                  categories?.length > 0 &&
                  categories?.map((item: any, indx: number) => (
                    <li key={indx}>
                      <Link
                        href={`/${item?.url_type}/${item?.url}/?${apiSlug}`}
                        style={{
                          color:
                            category_slug === item?.url
                              ? "var(--theme-deafult)"
                              : "",
                        }}
                      >
                        {item?.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default Category;
