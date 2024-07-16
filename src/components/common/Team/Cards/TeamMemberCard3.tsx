import Link from "next/link";
import IconLink from "../helper/IconLink";
import { TeamCardType } from "./type";

const TeamMemberCard3 = ({
  img,
  classes,
  name,
  designation,
  bio,
  profile_url = "#",
  socials = [],
}: TeamCardType) => {
  //border : '1px solid var(--theme-deafult)'
  return (
    <div
      className="py-2 mr-lg-5 mr-md-3 mr-sm-2 h-100"
      style={{ maxHeight: bio ? "600px" : "500px" }}
    >
      <div className="rounded shadow-sm d-flex flex-column align-items-center h-100">
        <Link href={profile_url || "#"}>
          <img
            src={img || "/images/dummy_pic.png"}
            width={200}
            height={"auto"}
            alt={name}
            className="py-4"
            style={{ borderRadius: "50%" }}
          />
        </Link>
        <div className="px-3 py-3 text-center">
          {name && <h3>{name}</h3>}
          {designation && <p style={{ fontWeight: 600 }}>{designation}</p>}
          {bio && <p style={{ fontWeight: 400 }}>{bio}</p>}
        </div>
        <div className="flex-row py-3 d-flex align-items-center">
          <IconLink data={socials} />
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard3;
