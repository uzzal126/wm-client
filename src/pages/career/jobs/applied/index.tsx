import ContinueShoppingBtn from "@/components/buttons/ContinueShoppingBtn";
import AppliedJobCard from "@/components/cards/AppliedJobCard";
import SeoHead from "@/components/layout/seo/head";
import { getLocal } from "@/helpers/storage";
import { useGetAppliedJobsQuery } from "@/redux-handler/api/slices/jobsSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";

function JobsAppliedPage() {
  const user = getLocal("user");
  const router = useRouter();
  useEffect(() => {
    if (!user?.id) {
      router.push("/auth/login");
    }
  }, [user?.id]);

  const post = {
    page: 1,
    limit: 10,
    id: user?.id || 0,
  };
  const { isLoading, data, error, isFetching } = useGetAppliedJobsQuery(post);

  if (isLoading) {
    return (
      <div className="d-flex align-items-center flex-column">
        <Spinner
          animation="border"
          variant="primary"
          style={{ width: 60, height: 60 }}
        />
      </div>
    );
  }
  if (!isLoading && !data?.data) {
    return (
      <div className="container">
        <div className="py-5 d-flex align-items-center flex-column text-align-center justify-items-center">
          <div className="not-found">
            <img src="/assets/images/empty-search.jpg" alt="No job application found" />
          </div>
          <h3 className="px-2 py-2 text-align-center">No job application found</h3>
          <ContinueShoppingBtn fontSize={14} link={'/career/jobs'} showIcon={false} text={'Explore Career'} textSize={14}/>
        </div>
      </div>
    );
  }
  return (
    <>
      <SeoHead title={"Applied Jobs"} description={"Applied Jobs"} />
      <div className="container">
        <h2 className="mx-4 my-2 text-5xl font-bold text-center">
          Applied Jobs
        </h2>
        <div className="row row-cols-1 row-cols-lg-2">
          {data?.data &&
            data?.data?.length > 0 &&
            data?.data?.map((item: any) => (
              <AppliedJobCard
                key={item?.id}
                data={item}
                date={item?.created_at}
                title={item?.job_title}
                status={item?.application_status}
              />
            ))}
        </div>
        {/* <CustomPagination
          pagination={data?.payload?.pagination}
          prefix={"career/jobs"}
        /> */}
      </div>
    </>
  );
}

export default JobsAppliedPage;
