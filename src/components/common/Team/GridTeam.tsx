import { styleGenaretor } from "@/helpers/misc";
import { Fragment } from "react";
import { Row } from "react-bootstrap";
import TeamMemberCard1 from "./Cards/TeamMemberCard1";
import TeamMemberCard2 from "./Cards/TeamMemberCard2";
import TeamMemberCard3 from "./Cards/TeamMemberCard3";
import TeamMemberCard4 from "./Cards/TeamMemberCard4";

type Props = {
  data: any;
  cardType?: 1 | 2 | 3 | 4;
};

function GridTeam({ data, cardType = 1 }: Props) {
  return (
    <Fragment>
      {/* <h2 className='text-center'>Team</h2> */}
      <section
        style={{
          ...styleGenaretor(data?.setting?.styles),
        }}
      >
        <div className="container">
          <Row
            xl={cardType === 4 ? 3 : 4}
            md={2}
            xs={1}
            className="category-m justify-content-center"
          >
            {data && data?.list && data?.list.length > 0 ? (
              data?.list.map((slider: any, i: number) => {
                return cardType === 1 ? (
                  <TeamMemberCard1
                    key={i}
                    img={slider.image_url}
                    designation={slider?.designation}
                    name={slider?.name}
                    bio={slider?.bio}
                    socials={slider?.socials}
                    profile_url={slider?.profile_url}
                  />
                ) : cardType === 2 ? (
                  <TeamMemberCard2
                    key={i}
                    img={slider.image_url}
                    designation={slider?.designation}
                    name={slider?.name}
                    bio={slider?.bio}
                    socials={slider?.socials}
                    profile_url={slider?.profile_url}
                  />
                ) : cardType === 3 ? (
                  <TeamMemberCard3
                    key={i}
                    img={slider.image_url}
                    designation={slider?.designation}
                    name={slider?.name}
                    bio={slider?.bio}
                    socials={slider?.socials}
                    profile_url={slider?.profile_url}
                  />
                ) : cardType === 4 ? (
                  <TeamMemberCard4
                    key={i}
                    img={slider.image_url}
                    designation={slider?.designation}
                    name={slider?.name}
                    bio={slider?.bio}
                    socials={slider?.socials}
                    profile_url={slider?.profile_url}
                  />
                ) : (
                  <TeamMemberCard1
                    key={i}
                    img={slider.image_url}
                    designation={slider?.designation}
                    name={slider?.name}
                    bio={slider?.bio}
                    profile_url={slider?.profile_url}
                  />
                );
              })
            ) : (
              <div className="pt-5"></div>
            )}
          </Row>
        </div>
      </section>
    </Fragment>
  );
}

export default GridTeam;
