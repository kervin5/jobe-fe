import { useState } from "react";
import { Message } from "semantic-ui-react";
import { Query } from "@apollo/react-components";
import { APPLICATION_STATUS_QUERY } from "@/admin/dashboard/DashboardHome/ApplicationsStatusCard";
import appText from "@/lang/appText";

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
              header={appText.messages.application.attention(
                data.applicationsConnection
              )}
              content={
                <p>
                  {appText.messages.application.attentionInstructions(
                    "HIRED or ARCHIVED"
                  )}
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
