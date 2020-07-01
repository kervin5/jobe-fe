import React from "react";
import JobsStatsCards from "./JobsStatsCards";
import ApplicationsCountWarning from "@/components/applications/ApplicationsCountWarning";
import JobsTable from "@/components/jobs/JobsTable";
import BarsChartCountOfApplications from "@/components/charts/BarsChartCountOfApplications";

class DashboardHome extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ApplicationsCountWarning />
        <JobsStatsCards />
        <BarsChartCountOfApplications />
        {/* <JobsTable /> */}
      </React.Fragment>
    );
  }
}

export default DashboardHome;
