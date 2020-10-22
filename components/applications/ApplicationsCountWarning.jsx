import { useQuery } from "@apollo/client";

import { APPLICATION_STATUS_QUERY } from "@/admin/dashboard/DashboardHome/ApplicationsStatusCard";
import appText from "@/lang/appText";

import Alert from "@/common/UI/Alert";

const ApplicationsCountWarning = () => {
  const { error, loading, data } = useQuery(APPLICATION_STATUS_QUERY);

  if (loading) return null;
  if (error) return <p>Ooops something went wrong</p>;
  if (data.applicationsConnection < 100) return null;
  return (
    <Alert
      open={open}
      message={appText.messages.application.attentionInstructions(
        "HIRED or ARCHIVED"
      )}
      header={appText.messages.application.attention(
        data.applicationsConnection
      )}
    />
  );
};

export default ApplicationsCountWarning;
