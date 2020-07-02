import React from "react";
import { Grid } from "semantic-ui-react";
import JobsStatsCards from "./JobsStatsCards";
import ApplicationsCountWarning from "@/components/applications/ApplicationsCountWarning";
import WidgetCard from "@/components/admin/dashboard/widgets/WidgetCard";
import BarsChartCountOfApplications from "@/components/charts/BarsChartCountOfApplications";

class DashboardHome extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ApplicationsCountWarning />
        <JobsStatsCards />
        <Grid columns="2">
          <Grid.Row>
            <Grid.Column>
              <WidgetCard>
                <BarsChartCountOfApplications />
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
