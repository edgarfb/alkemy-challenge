import React from "react";

function StatsBar(props) {
  return (
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${props.width}%` }}
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {props.value}%
      </div>
    </div>
  );
}

export default StatsBar;
