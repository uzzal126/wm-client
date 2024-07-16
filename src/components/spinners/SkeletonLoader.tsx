import PostLoader from "@/helpers/preloader/PostLoader";

type Props = {
  amount?: number;
  className?: string;
  direction?: "column" | "row";
};

function SkeletonLoader({
  amount = 3,
  className = "",
  direction = "column",
}: Props) {
  const skeletonToShow = [];

  for (let i = 0; i < amount; i++) {
    skeletonToShow.push(
      <div key={i} className="col-xl-3 col-lg-4 col-6">
        <PostLoader />
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{ display: "flex", flexDirection: direction }}
    >
      {skeletonToShow}
    </div>
  );
}

export default SkeletonLoader;
