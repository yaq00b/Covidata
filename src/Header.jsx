import React from "react";
import ReactDOM from "react-dom";

function header() {
  return (
  <div>
    
    <div className="row">
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-black sidebar collapse">
      <div className="sidebar-sticky pt-3">
        <ul className="nav flex-column">      
        <li className="nav-head">
            <a class="nav-link" href= "#"><h2>COVIDATA</h2></a>
          </li>
          <li className="nav-item">
            <a class="nav-link" href= "#"><h5>Confirmed Cases</h5></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href= "#"><h5>Recovered Cases</h5></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href= "#"><h5>Covid Deaths</h5></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href= "#"><h5>Critical cases</h5></a>
          </li>
        </ul>

      </div>
    </nav>

    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 borderBottom">
      <div className="header">
      <h3>Global cases of COVID-19 dating from JAN/2020 - JUL/2020</h3>
    </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group mr-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
          </div>
        </div>
      </div>
      </main>
    </div>
  </div>
  );
}
export default header;
