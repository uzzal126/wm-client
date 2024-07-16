import { useFilter } from "@/contexts/filter/FilterProvider";
import { productsApi } from "@/redux-handler/api/slices/productSlice";
import { useAppDispatch } from "@/store";
import { useEffect, useState } from "react";
import { Collapse, Input } from "reactstrap";

const Variants = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [openList, setOpenList] = useState<any>([]);

  const { apiSlug, category_slug, filter, setParam } = useFilter();
  const dispatch = useAppDispatch();

  const toggle = (indx: number) => {
    if (openList.indexOf(indx) == -1) {
      const newList = openList;
      newList.push(indx);
      setOpenList(newList);
    } else {
      const newList = openList.filter((e: any) => e != indx);
      setOpenList(newList);
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getVariants();
  }, [category_slug]);

  const getVariants = async () => {
    const res = await dispatch(
      productsApi.endpoints.getVariants.initiate(
        `category_slug=${category_slug}`
      )
    );
    setLoading(false);
    if (res?.isSuccess) {
      if (res.data.success && res.data.status_code === 200) {
        setData(res.data.data);
      } else {
        setData({});
      }
    }
  };

  const handleFilter = (event: any) => {
    let splitFilter = filter.split(",").filter((f: any) => f !== "");
    if (event.target.checked) {
      splitFilter.push(event.target.value);
    } else {
      splitFilter = splitFilter.filter((f: any) => f !== event.target.value);
    }
    setParam("filter", splitFilter.toString() || "");
  };

  if (loading) return <h5>loading...</h5>;

  return (
    <>
      {Object.keys(data)?.length > 0 &&
        Object.keys(data)?.map((key, indx) => (
          <div className="collection-collapse-block border-0 open" key={indx}>
            <h3 className="collapse-block-title" onClick={() => toggle(indx)}>
              {key}
            </h3>
            <Collapse isOpen={openList.indexOf(indx) !== -1}>
              <div className="collection-collapse-block-content">
                <div className="collection-size-filter">
                  {!data || !data[key] || data[key]?.length === 0 || loading
                    ? "loading"
                    : data &&
                      data[key]?.map((size: any, index: number) => (
                        <div
                          key={index}
                          className="custom-control custom-checkbox collection-filter-checkbox">
                          <Input
                            checked={filter.includes(size)}
                            value={size}
                            onChange={(e) => handleFilter(e)}
                            type="checkbox"
                            className="custom-control-input"
                            id={size}
                          />

                          <label
                            className="custom-control-label"
                            htmlFor={size}>
                            {size}
                          </label>
                        </div>
                      ))}
                </div>
              </div>
            </Collapse>
          </div>
        ))}
    </>
  );
};

export default Variants;