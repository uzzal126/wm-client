import { useEffect, useState } from "react";

const TapTop = () => {
  const [goingUp, setGoingUp] = useState(false);

  useEffect(() => {
    // Tap to Top Scroll
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 500) setGoingUp(true);
      else setGoingUp(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]);

  const tapToTop = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };
  return (
    <div
      className="tap-top top-cls"
      style={
        goingUp
          ? { display: "block", bottom: "100px" }
          : { display: "none", bottom: "100px" }
      }
      onClick={tapToTop}
    >
      <div>
        <i className="fa fa-angle-double-up"></i>
      </div>
    </div>
  );
};

export default TapTop;
