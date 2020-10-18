import React from "react";
import Grid from "@material-ui/core/Grid";
import JobsStatsCards from "./JobsStatsCards";
import ApplicationsCountWarning from "@/components/applications/ApplicationsCountWarning";
import WidgetCard from "@/components/admin/dashboard/widgets/WidgetCard";
import BarsChartCountOfApplications from "@/components/charts/BarsChartCountOfApplicationsByBranch";
import BarsChartCountOfJobsByBranch from "@/components/charts/BarsChartCountOfJobsByBranch";
import LinesChartYTDJobsAndApplications from "@/components/charts/LinesChartYTDJobsAndApplications";
import TableChartPowerUsers from "@/components/charts/TableChartPowerUsers";
import appText from "@/lang/appText";

class DashboardHome extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ApplicationsCountWarning />
        <JobsStatsCards />
        <Grid container spacing="3">
          <Grid item md="6">
            <WidgetCard title={appText.widget.ytdJobsVsApplications}>
              <LinesChartYTDJobsAndApplications />
            </WidgetCard>
          </Grid>
          <Grid item md="6">
            <WidgetCard title={appText.widget.powerUsersOfTheMonth}>
              <TableChartPowerUsers />
            </WidgetCard>
          </Grid>
          <Grid item md="6">
            <WidgetCard title={appText.widget.totalApplicationsByBranch}>
              <BarsChartCountOfApplications />
            </WidgetCard>
          </Grid>
          <Grid item md="6">
            <WidgetCard title={appText.widget.totalJobsByBranch}>
              <BarsChartCountOfJobsByBranch />
            </WidgetCard>
          </Grid>
        </Grid>

        {/* <JobsTable /> */}
      </React.Fragment>
    );
  }
}

export default DashboardHome;
