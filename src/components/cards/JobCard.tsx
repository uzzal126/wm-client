import {
  check_date_expiry,
  getAgoTime,
  getTimeFromUnixValue,
} from "@/helpers/misc";
import Image from "next/image";
import Link from "next/link";
import { FaMoneyBill } from "react-icons/fa";
import {
  MdAccessTimeFilled,
  MdCheckCircle,
  MdLocationPin,
} from "react-icons/md";

type Props = {
  title?: string;
  jobType?: string;
  location?: string;
  image?: string;
  date?: any;
  deadline?: string;
  salary?: string;
  data?: any;
  experience?: string;
};

const todayInUnix = Date.now() / 1000;

function JobCard({
  data = {},
  title = "Sample Title",
  jobType = "Full Time",
  location = "Dhaka, Bangladesh",
  salary = "50,000 - 90,000",
  image = "/assets/images/icon/job_icon.png",
  date,
  deadline,
  experience = "4 years",
}: Props) {
  return (
    <Link href={`/career/jobs/${data?.id || "#"}`} className="mt-4 col">
      <div className="p-2 shadow-sm card d-flex flex-column flex-lg-row flex-md-row">
        <div>
          <Image
            alt="job"
            src={"/assets/images/icon/job_icon.png"}
            width={50}
            height={50}
            className="mx-1 my-2 ml-lg-4 mr-lg-4 w-lg-40px"
          />
        </div>
        <div className="mx-1 my-2">
          <h4
            className="mb-2 leading-tight fs-3 w-lg-150 job-title"
            style={{ fontWeight: 600 }}
          >
            {title}
          </h4>
          <p className="text-base">{getAgoTime(date ? date * 1000 : "")}</p>
          <span className="flex-row mt-1 d-flex align-items-center">
            <MdAccessTimeFilled
              size={20}
              className="mb-3 mr-2"
              color="#4a4a4a"
            />
            <p className="text-lg">{jobType}</p>
          </span>
          <span className="flex-row d-flex align-items-center">
            <MdCheckCircle size={20} className="mb-3 mr-2" color="#4a4a4a" />
            <p className="text-lg">
              Experience: {experience}{" "}
              {`${parseInt(experience) > 1 ? "years" : "year"}`}
            </p>
          </span>
          <span className="flex-row mb-4 d-flex align-items-center">
            <MdLocationPin size={20} className="mb-3 mr-2" color="#4a4a4a" />
            <p className="text-base">{location}</p>
          </span>
          {salary?.includes("company policy")}
          <div className="flex-row mb-2 d-flex align-items-center">
            <FaMoneyBill size={20} className="mb-2 mr-2" color="#4a4a4a" />
            <h6
              className="text-base font-semibold w-lg-200px"
              style={{ color: "var(--theme-deafult)" }}
            >
              {salary?.includes("As Per Company Policy") ||
              salary?.includes("Negotiable")
                ? ""
                : "BDT"}{" "}
              {salary}
            </h6>
          </div>
        </div>

        <p
          className={`ml-auto  font-semibold w-lg-200px  ${
            check_date_expiry(todayInUnix, deadline) ? "text-danger" : "text-md"
          }`}
          style={{
            marginTop: "auto",
          }}
        >
          {" "}
          Deadline:{" "}
          {deadline
            ? getTimeFromUnixValue(deadline, "DD MMM, YYYY")
            : getTimeFromUnixValue(1694948526, "DD MM, YYYY")}
        </p>
      </div>
    </Link>
  );
}

export default JobCard;
