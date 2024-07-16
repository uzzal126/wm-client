import BlogRender from "../helper/blogRender";

const MiddleContent = ({ data }: { data: any }) => {
  return (
    <div>
      {data?.list && Object.keys(data?.list)?.length > 0 ? (
        <>
          <BlogRender data={data} sectionKey="middle_section" />
        </>
      ) : null}
    </div>
  );
};

export default MiddleContent;
