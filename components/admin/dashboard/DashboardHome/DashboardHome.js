import React from "react";
import { Grid } from "semantic-ui-react";
import JobsStatsCards from "./JobsStatsCards";
import ApplicationsCountWarning from "@/components/applications/ApplicationsCountWarning";
import WidgetCard from "@/components/admin/dashboard/widgets/WidgetCard";
import BarsChartCountOfApplications from "@/components/charts/BarsChartCountOfApplicationsByBranch";
import BarsChartCountOfJobsByBranch from "@/components/charts/BarsChartCountOfJobsByBranch";
import LinesChartYTDJobsAndApplications from "@/components/charts/LinesChartYTDJobsAndApplications";
import TableChartPowerUsers from "@/components/charts/TableChartPowerUsers";

class DashboardHome extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ApplicationsCountWarning />
        <JobsStatsCards />
        <Grid columns="2">
          <Grid.Row>
            <Grid.Column>
              <WidgetCard title="YTD Jobs vs Applications">
                <LinesChartYTDJobsAndApplications />
              </WidgetCard>
            </Grid.Column>
            <Grid.Column>
              <WidgetCard title="Power Users of the Month">
                <TableChartPowerUsers />
              </WidgetCard>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <WidgetCard title="Total Applications by Branch">
                <BarsChartCountOfApplications />
              </WidgetCard>
            </Grid.Column>
            <Grid.Column>
              <WidgetCard title="Total Jobs by Branch">
                <BarsChartCountOfJobsByBranch />
              </WidgetCard>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {/* <JobsTable /> */}
      </React.Fragment>
    );
  }
}

export default DashboardHome;
