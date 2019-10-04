import Router from "next/router";
import React from "react";
import Button from "../../common/UI/Button";
import JobsInformationSection from "./JobsInformationSection";

class DashboardHome extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="Header">
          <Button onClick={() => Router.push("/dashboard/jobs/new")}>
            Add New Job
          </Button>
        </div>
        <JobsInformationSection />
        <style jsx>{`
          .Header {
            display: flex;
            justify-content: space-between;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default DashboardHome;
