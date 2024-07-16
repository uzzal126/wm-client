import { getTimeFromUnixValue } from "@/helpers/misc";
import Image from "next/image";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { MdCheckCircle } from "react-icons/md";

type Props = {
  title?: string;
  date?: string;
  data?: any;
  status?: string;
};

const statusColors: any = {
  Approved: "success",
  Submitted: "primary",
  Rejected: "danger",
  Pending: "warning",
};

function AppliedJobCard({
  data = {},
  title = "Sample Title",
  status = "",
  date,
}: Props) {
  return (
    <div className="p-3 mt-4 shadow-sm card d-flex flex-column flex-lg-row flex-md-row col">
      <div className="flex-row d-flex align-items-center">
        <Image
          alt="job"
          src={"/assets/images/icon/job_icon.png"}
          width={50}
          height={50}
          className="mx-2 my-2 ml-lg-4 mr-lg-4"
        />
        <Link
          href={`/career/jobs/${data?.post_id || "#"}?applied=1`}
          className="col d-lg-none d-md-none d-flex justify-content-end"
        >
          <Button
            style={{
              borderRadius: 5,
              textTransform: "none",
            }}
          >
            Details
          </Button>
        </Link>
      </div>
      <div className="mx-2 my-2">
        <h4 className="mb-2 leading-tight fs-3" style={{ fontWeight: 600 }}>
          {title}
        </h4>

        <p className="text-base">
          {getTimeFromUnixValue(date, "DD MMM, YYYY")}
        </p>
        <span
          className={`flex-row p-1 rounded-sm d-flex align-items-center alert-${statusColors[status]} justify-content-center`}
        >
          <MdCheckCircle size={20} className="mx-2" />
          <span className="mx-1">Status: {status}</span>
        </span>
      </div>
      <Link
        href={`/career/jobs/${data?.post_id || "#"}?applied=1`}
        className="col d-none justify-content-end d-lg-flex d-md-flex"
      >
        <Button
          style={{ height: "50px", borderRadius: 5, textTransform: "none" }}
        >
          Details
        </Button>
      </Link>
    </div>
  );
}

export default AppliedJobCard;
