import React from 'react';
import { NavLink } from 'react-router-dom';
import CountUp from 'react-countup';

function DashbaordPills(props) {
  return (
    <div class="fun-fact col-xl-3 col-md-4">
      <div class="fun-fact-text">
        <h3>{props.title}</h3>
        {/* <h3 style={{ fontSize: '28px' }}>{props.count}</h3> */}
        <br />
        <CountUp className="reactCount" end={props.count} />
      </div>

      <NavLink
        to={props.to}
        className="button ripple-effect button-sliding-icon show-all-btn"
      >
        Show All <i class="icon-feather-arrow-right" />
      </NavLink>
    </div>
  );
}

export default DashbaordPills;
