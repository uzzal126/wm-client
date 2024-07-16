import Link from "next/link";
import Card from "react-bootstrap/Card";
import IconLink from "../helper/IconLink";
import { TeamCardType } from "./type";

const TeamMemberCard1 = ({
  img,
  name,
  designation,
  profile_url = "#",
  bio,
  socials = [],
}: TeamCardType) => {
  //border : '1px solid var(--theme-deafult)'
  return (
    <div className="px-2 py-2 text-center h-100">
      <Card style={{ maxWidth: "20rem" }} className="mx-auto h-100">
        <Link href={profile_url || "#"}>
          <Card.Img variant="top" src={img || "/images/dummy_pic.png"} />
        </Link>
        <Card.Body>
          {name && <Card.Title>{name}</Card.Title>}
          {designation && <Card.Text>{designation}</Card.Text>}
          {bio && <Card.Text>{bio}</Card.Text>}
          <div className="flex-row py-3 d-flex align-items-center">
            <IconLink data={socials} />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TeamMemberCard1;
