import Brand from "../../shop/common/brand";
import Category from "../../shop/common/category";
import Price from "../../shop/common/price";

const Filter = ({ data }: { data: any }) => {
  return (
    <div className="collection-filter-block creative-card creative-inner">
      {data?.filter_by?.length > 0 ? (
        data?.filter_by?.map((item: any, indx: number) => {
          if (item == "categories") {
            return <Category key={indx} />;
          } else if (item == "brands") {
            return <Brand key={indx} />;
          } else if (item == "price-range") {
            return <Price key={indx} />;
          }
        })
      ) : (
        <>
          {/* <Category />
          <Brand />
          <Color />
          <Price /> */}
        </>
      )}
    </div>
  );
};

export default Filter;
