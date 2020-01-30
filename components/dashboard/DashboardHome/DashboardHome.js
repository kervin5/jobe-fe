import Router from "next/router";
import React from "react";
import Button from "../../common/UI/Button";
import JobsInformationSection from "./JobsInformationSection";
import ApplicationsCountWarning from "../../applications/ApplicationsCountWarning";
import JobsTable from "../../jobs/JobsTable";

class DashboardHome extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ApplicationsCountWarning />
        <div className="Header">
          <Button onClick={() => Router.push("/dashboard/jobs/new")}>
            Add New Job
          </Button>
        </div>
        <JobsInformationSection />
        <JobsTable />
        <style jsx>{`
          .Header {
            display: flex;
            justify-content: space-between;
            flex-direction: row-reverse;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default DashboardHome;
