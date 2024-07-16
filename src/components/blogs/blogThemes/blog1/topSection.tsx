import BlogRender from "../helper/blogRender";

const TopSection = ({ data }: { data: any }) => {
  // console.log("data", data);

  return (
    <div>
      <div className="container">
        {data?.list && Object.keys(data?.list)?.length > 0 ? (
          <>
            <BlogRender data={data}  />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default TopSection;
