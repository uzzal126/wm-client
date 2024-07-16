import { sliderConfig, styleGenaretor } from "@/helpers/misc";
import { Fragment } from "react";
import Slider from "react-slick";
import TeamMemberCard1 from "./Cards/TeamMemberCard1";
import TeamMemberCard2 from "./Cards/TeamMemberCard2";
import TeamMemberCard3 from "./Cards/TeamMemberCard3";
import TeamMemberCard4 from "./Cards/TeamMemberCard4";

type Props = {
  data: any;
  cardType?: 1 | 2 | 3 | 4;
};

function SliderTeam({ data, cardType = 1 }: Props) {
  let customSettings = {
    ...sliderConfig(
      data?.setting?.slider
        ? data?.setting?.slider
        : { dots: false, arrow: true, autoplay: true },
      data?.setting?.show ? data?.setting?.show : [],
      data?.list?.length
    ),
    infinite: false,
    rtl: false,
  };
  return (
    <Fragment>
      {/* <h2 className='text-center'>Team</h2> */}
      <section
        style={{
          ...styleGenaretor(data?.setting?.styles),
        }}
      >
        <div className="container">
          <Slider {...customSettings} className="slide-1 team-slider">
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
                    socials={slider?.socials}
                    profile_url={slider?.profile_url}
                  />
                );
              })
            ) : (
              <div className="pt-5"></div>
            )}
          </Slider>
        </div>
      </section>
    </Fragment>
  );
}

export default SliderTeam;
