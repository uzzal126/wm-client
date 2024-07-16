import Link from "next/link";
import { useState } from "react";
import IconLink from "../helper/IconLink";
import { TeamCardType } from "./type";

const TeamMemberCard4 = ({
  img,
  classes,
  name,
  designation,
  bio,
  profile_url = "#",
  socials = [],
}: TeamCardType) => {
  //border : '1px solid var(--theme-deafult)'
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Link
      href={profile_url || "#"}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <div
        className="py-2 m-3 shadow-sm mr-lg-5 mr-md-3 mr-sm-2 h-100"
        style={{
          backgroundImage: `url(${img || "/images/dummy_pic.png"})`,
          backgroundSize: "cover",
          minHeight: "400px",
          maxHeight: "400px",
          borderRadius: "25px",
        }}
      >
        {showDetails && (
          <div
            id="details"
            className="shadow-sm d-flex flex-column align-items-center justify-content-center "
            style={{
              background: "rgba(40, 40, 40, 0.7)",
              minHeight: "400px",
              maxHeight: "400px",
              borderRadius: "25px",
            }}
          >
            <div className="px-3 py-3 text-center d-flex flex-column align-items-center ">
              {name && <h3 style={{ color: "white" }}>{name}</h3>}
              {designation && (
                <p style={{ fontWeight: 600, color: "white" }}>{designation}</p>
              )}
              {bio && <p style={{ fontWeight: 400, color: "white" }}>{bio}</p>}
            </div>
            <div className="flex-row py-3 d-flex align-items-center">
              <IconLink data={socials} color="white" size={36} />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default TeamMemberCard4;
