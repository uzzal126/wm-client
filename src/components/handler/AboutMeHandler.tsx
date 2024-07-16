import AboutMe from "../common/AboutMe/AboutMe";

const AboutMeHandler = ({ data }: any) => {
  return data && data?.setting ? (
    data?.setting?.template === "about_me_1" ? (
      <AboutMe data={data} />
    ) : (
      <AboutMe data={data} />
    )
  ) : (
    <p className="py-5 text-center text-danger">Please configure again</p>
  );
};

export default AboutMeHandler;
