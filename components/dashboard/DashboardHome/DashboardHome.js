import Router from "next/router";
import React from "react";
import Button from "../../common/UI/Button";
import JobsInformationSection from "./JobsInformationSection";
import ApplicationsCountWarning from "../../applications/ApplicationsCountWarning";
import DashboardPageHeader from "../DashboardPageHeader";
import JobsTable from "../../jobs/JobsTable";

class DashboardHome extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ApplicationsCountWarning />
        <DashboardPageHeader>
          <Button onClick={() => Router.push("/dashboard/jobs/new")}>
            Add New Job
          </Button>
        </DashboardPageHeader>
        <JobsInformationSection />
        <JobsTable />
      </React.Fragment>
    );
  }
}

export default DashboardHome;
