import { Fragment } from "react";
// @ts-ignore
import Countdown from "react-countdown";

const CountdownComponent = ({ time }: any) => {
  const Completionist = () => (
    <span style={{ color: "red" }}>Campaign Ended!</span>
  );

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div className="timer-box">
          <div className="timer">
            <div className="timer-p" id="demo">
              <span>
                {days}
                <span className="padding-l">:</span>
                <span className="timer-cal">Days</span>
              </span>
              <span>
                {hours}
                <span className="padding-l">:</span>
                <span className="timer-cal">Hrs</span>
              </span>
              <span>
                {minutes}
                <span className="padding-l">:</span>
                <span className="timer-cal">Min</span>
              </span>
              <span>
                {seconds}
                <span className="timer-cal">Sec</span>
              </span>
            </div>
          </div>
        </div>
      );
    }
  };

  var d = new Date(time) || new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  var coundown = new Date(year, month, day + 1000).getTime();

  return (
    <Fragment>
      <Countdown date={coundown} renderer={renderer} />
    </Fragment>
  );
};

export default CountdownComponent;
