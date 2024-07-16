import CustomPagination from "@/components/account/common/Pagination";
import JobCard from "@/components/cards/JobCard";
import SeoHead from "@/components/layout/seo/head";
import { useGetAllJobsQuery } from "@/redux-handler/api/slices/jobsSlice";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

function JobsPage() {
  const [search, setSearch] = useState("");
  const post = {
    search: search,
    page: 1,
    limit: 10,
  };
  const {
    isLoading,
    data,
    error,
    isFetching,
    refetch: refetchJobs,
  } = useGetAllJobsQuery(post);

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
  if (!isLoading && !data?.data && search === "") {
    return (
      <div className="container">
        <div className="d-flex align-items-center flex-column py-5">
          <img
            src={`/assets/images/empty-search.jpg`}
            className="mx-auto img-fluid"
            alt="No product found"
          />
          <h3>No Job Is Available Right Now</h3>
        </div>
      </div>
    );
  }
  return (
    <>
      <SeoHead title={"Jobs"} description={"Jobs"} />
      <div className="container">
        <h2 className="mx-4 my-2 text-5xl font-bold text-center">Jobs</h2>
        <div className="mt-4 d-flex flex-column align-items-center">
          <div className="mb-3 input-group" style={{ maxWidth: 500 }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search jobs"
              onChange={(e: any) => {
                setSearch(e.target.value);
                if (e.target.value?.length >= 3) {
                  refetchJobs();
                }
              }}
            />
            <Button variant="primary">Search</Button>{" "}
          </div>
          {!isLoading && !data?.data && search !== "" && (
            <div className="container my-2">
              <div className="d-flex align-items-center flex-column">
                <h3>No jobs found ...</h3>
              </div>
            </div>
          )}
        </div>
        <div className="row row-cols-1 row-cols-lg-2">
          {data?.data &&
            data?.data?.length > 0 &&
            data?.data?.map((item: any) => (
              <JobCard
                key={item?.id}
                data={item}
                deadline={item?.deadline}
                date={item?.scheduled_at}
                title={item?.title}
                image={item?.banner}
                jobType={item?.employment_status}
                location={item?.location}
                salary={item?.salary}
                experience={item?.experience}
              />
            ))}
        </div>
        <CustomPagination
          pagination={data?.payload?.pagination}
          prefix={"career/jobs"}
        />
      </div>
    </>
  );
}

export default JobsPage;
