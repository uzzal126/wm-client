import NotFound from "@/components/error_handler/productNotFound";
import JobDetails from "@/components/jobs/JobDetails";
import SeoHead from "@/components/layout/seo/head";
import { BASE_URL } from "@/config/constant/api.constant";
import { GET_ACCESS_TOKEN } from "@/helpers/services/api";
import { createAxios } from "@/helpers/services/request";
import { jobsApi } from "@/redux-handler/api/slices/jobsSlice";
import { wrapper } from "@/store";
import axios from "axios";
import nookies from "nookies";
import Spinner from "react-bootstrap/Spinner";

function JobDetailsPage({ job, errors }: any) {
  if (errors) {
    return <NotFound error={errors?.message} showSearch={false} />;
  }
  return (
    <>
      <SeoHead
        title={job?.title || "Jobs"}
        description={job?.title || "Jobs"}
        url={`${job?.origin}/career/jobs/${job?.id}`}
        image={job?.banner}
      />
      {!job ? (
        <div className="my-5 d-flex align-items-center flex-column">
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: 30, height: 30 }}
          />
        </div>
      ) : (
        <JobDetails
          data={job}
          date={job?.scheduled_at}
          deadline={job?.deadline}
          image={job?.banner}
          jobType={job?.employment_status}
          description={job?.description}
          salary={job?.salary}
          location={job?.location}
          title={job?.title}
          gender={job?.gender}
        />
      )}
    </>
  );
}

export default JobDetailsPage;

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async (context: any): Promise<any> => {
      const { slug } = context?.query;
      const formattedSlug = slug?.replace(/^www\./, "").replace(/\.com$/, "");

      // Parse
      const cookies = nookies.get(context);
      const origin: any = context.req?.headers?.host;
      createAxios(origin);
      let token = cookies?.token;
      if (!token) {
        const axiosInstance = axios.create({
          baseURL: BASE_URL,
          headers: {
            Origin: origin,
          },
        });

        const { data: response } = await axiosInstance.post(GET_ACCESS_TOKEN);
        token = `Bearer ${response?.access_token}`;
      }

      const params = {
        id: formattedSlug,
        origin: origin,
        token: token,
      };

      const response = await store.dispatch(
        jobsApi.endpoints.getJobDetails.initiate(params)
      );
      if (response?.data?.success) {
        return {
          props: { job: { origin: origin, ...response?.data?.data } },
        };
      } else {
        return {
          props: {
            job: {},
            errors: {
              message: response?.data?.message || "No Data Found",
            },
          },
        };
      }
    }
);
