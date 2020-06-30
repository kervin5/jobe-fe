import React from "react";
import JobsInformationSection from "./JobsStatsCards";
import ApplicationsCountWarning from "@/components/applications/ApplicationsCountWarning";
import JobsTable from "@/components/jobs/JobsTable";

class DashboardHome extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ApplicationsCountWarning />
        {/* <DashboardPageHeader>
      
        </DashboardPageHeader> */}
        <JobsInformationSection />
        <JobsTable />
      </React.Fragment>
    );
  }
}

export default DashboardHome;
