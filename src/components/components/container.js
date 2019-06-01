import React from 'react';

function Container(props) {
  return (
    <React.Fragment>
      <div class="dashboard-content-container" data-simplebar>
        <div class="dashboard-content-inner">
          <div class="dashboard-headline">
            <h3 class="margin-bottom-40">{props.title}</h3>
          </div>
          <div class="row margin-top-30 margin-bottom-30">
            <div class="col-xl-12">{props.children}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Container;
