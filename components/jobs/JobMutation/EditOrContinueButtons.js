import React from "react";
import { useQuery } from "@apollo/client";
import { Button, Icon } from "semantic-ui-react";
import Router from "next/router";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import ChangeJobStatusButton from "./ChangeJobStatusButton";
import { SINGLE_JOB_QUERY } from "@/graphql/queries/jobs";

function EditOrContinueButtons({ jobId }) {
  const { error, loading, data } = useQuery(SINGLE_JOB_QUERY, {
    variables: { id: jobId }
  });
  if (loading) return <p>Loading...</p>;
  return (
    <div className="EditOrContinueButtons">
      <Button
        icon
        labelPosition="left"
        onClick={() => Router.push(`/admin/jobs/${jobId}/edit`)}
      >
        <Icon name="pencil" />
        Edit
      </Button>
      <RenderIfLoggedIn
        permissions={[{ object: "JOB", action: "PUBLISH" }]}
        fallback={
          <ChangeJobStatusButton jobId={jobId} status="PENDING">
            Submit for approval
          </ChangeJobStatusButton>
        }
      >
        {data.job.status !== "POSTED" && (
          <ChangeJobStatusButton jobId={jobId} status="POSTED">
            Publish
          </ChangeJobStatusButton>
        )}
      </RenderIfLoggedIn>
      <Button
        positive
        icon
        labelPosition="left"
        onClick={() => Router.push("/admin/dashboard")}
      >
        <Icon name="desktop" />
        Dashboard
      </Button>
      <style jsx>{`
        .EditOrContinueButtons {
          margin-bottom: 15px;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
}

export default EditOrContinueButtons;
