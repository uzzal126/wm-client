import { useFilter } from "@/contexts/filter/FilterProvider";
import { useGetBrandsQuery } from "@/redux-handler/api/slices/productSlice";
import { useState } from "react";
import { Collapse, Input } from "reactstrap";

const Brand = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, loading } = useGetBrandsQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      data: data?.data || [],
      loading: isLoading,
    }),
  });

  const { brand, setParam } = useFilter();

  const handleBrand = (event: any) => {
    let splitBrand = brand.split(",").filter((f: any) => f !== "");
    if (event.target.checked) {
      splitBrand.push(event.target.value);
    } else {
      splitBrand = splitBrand.filter((f: any) => f !== event.target.value);
    }
    setParam("brand", splitBrand.toString() || "");
  };

  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={() => setIsOpen(!isOpen)}>
        brand
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-brand-filter">
            {!data || data?.length === 0 || loading
              ? "loading"
              : data &&
                data?.length > 0 &&
                data?.map((list: any, index: any) => (
                  <div
                    className="custom-control custom-checkbox collection-filter-checkbox"
                    key={index}>
                    <Input
                      checked={brand?.includes(list.slug)}
                      value={list?.slug}
                      onChange={(e) => handleBrand(e)}
                      type="checkbox"
                      className="custom-control-input"
                      id={list?.slug}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor={list?.slug}>
                      {list?.slug}
                    </label>
                  </div>
                ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Brand;
