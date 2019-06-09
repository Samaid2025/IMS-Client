import React from 'react'
import { NavLink } from 'react-router-dom';

function DashbaordPills(props){
    return(
        <div class="fun-fact col-xl-3 col-md-4">
					<div class="fun-fact-text">
						<span>{props.title}</span>
						<h4>{props.count}</h4>
					</div>
					
          <NavLink to={`/inventory/byType`} className="button ripple-effect button-sliding-icon show-all-btn">
          Show All <i class="icon-feather-arrow-right"></i>
                          </NavLink>
				</div>
    )
}

export default DashbaordPills