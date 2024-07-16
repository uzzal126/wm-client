import { useEffect, useState } from "react";
import { useCountdown } from "./useCountdown";

type Props = {
  time: number | string;
};

export default function CountdownTimer({ time }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [days, hours, minutes, seconds] = useCountdown(time);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading...</p>;

  return (
    <>
      <div
        style={{
          padding: 15,
          fontSize: 14,
          fontWeight: 500,
          background: "#F5F5F5",
          margin: 5,
        }}
      >
        {days} Days : {hours} Hrs : {minutes} Min : {seconds} Sec
      </div>
    </>
  );
}
