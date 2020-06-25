import { useState } from "react";
import { Message } from "semantic-ui-react";
import { Query } from "react-apollo";
import { APPLICATION_STATUS_QUERY } from "@/admin/dashboard/DashboardHome/ApplicationsStatusCard";

const ApplicationsCountWarning = () => {
  const [open, setOpen] = useState(true);
  return (
    <Query query={APPLICATION_STATUS_QUERY}>
      {({ error, loading, data }) => {
        // if (loading) return <p>Loading...</p>;
        if (loading) return null;
        if (error) return <p>Ooops something went wrong</p>;
        if (data.applicationsConnection < 100) return null;
        return (
          open && (
            <Message
              icon="inbox"
              error
              onDismiss={() => setOpen(false)}
              header={`There are ${data.applicationsConnection} applications in your queue that require attention!`}
              content={
                <p>
                  Please make sure to change to status of the applications to{" "}
                  <strong>HIRED</strong> or <strong>ARCHIVED</strong> once the
                  candidate is not longer being considered for a position in
                  order to remove the application from the queue.
                </p>
              }
            />
          )
        );
      }}
    </Query>
  );
};

export default ApplicationsCountWarning;
