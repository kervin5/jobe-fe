import React from "react";
import JobStatusCard from "./JobStatusCard";
import ApplicationStatusCard from "./ApplicationsStatusCard";

class JobsInformationSection extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="Summary">
          <JobStatusCard label="Posted" status="POSTED" />
          <JobStatusCard label="Draft" status="DRAFT" icon="pencil" color="2" />
          <JobStatusCard
            label="Pending"
            status="PENDING"
            icon="comments"
            color="3"
          />
          <ApplicationStatusCard color="4" icon="smile" />
        </div>

        <style jsx>{`
          .Summary {
            display: flex;
            margin-bottom: 20px;
            margin-top: 20px;
            justify-content: space-between;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

// export default JobsInformationSection;
export default JobsInformationSection;
