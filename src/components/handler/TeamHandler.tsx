import GridTeam from "../common/Team/GridTeam";
import SliderTeam from "../common/Team/SliderTeam";

const TeamHandler = ({ data }: any) => {
  return data && data?.setting ? (
    data?.setting?.template === "slider-grid-team1" ? (
      <GridTeam data={data} cardType={2} />
    ) : data?.setting?.template === "slider-team1" ? (
      <SliderTeam data={data} />
    ) : data?.setting?.template === "slider-grid-team3" ? (
      <GridTeam data={data} cardType={3} />
    ) : data?.setting?.template === "grid_modern_team_1" ? (
      <GridTeam data={data} cardType={4} />
    ) : data?.setting?.template === "slider_modern_team_1" ? (
      <SliderTeam data={data} cardType={4} />
    ) : (
      <p className="py-5 text-center text-danger">Please configure again</p>
    )
  ) : null;
};

export default TeamHandler;
