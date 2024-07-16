import Hero from "../common/Hero/Hero";

const HeroHandler = ({ data }: any) => {
  return data && data?.setting ? (
    data?.setting?.template === "hero-grid-slider" ? (
      <Hero data={data} />
    ) : (
      <Hero data={data} />
    )
  ) : (
    <p className="py-5 text-center text-danger">
      Please configure hero component again
    </p>
  );
};

export default HeroHandler;
