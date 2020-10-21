import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import Button from "@material-ui/core/Button";
import DesktopIcon from "@material-ui/icons/DesktopWindows";
import EditIcon from "@material-ui/icons/Edit";
import Router from "next/router";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import ChangeJobStatusButton from "./ChangeJobStatusButton";
import { SINGLE_JOB_QUERY } from "@/graphql/queries/jobs";
import appText from "@/lang/appText";

const StyledEditOrContinueButtons = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-end;
`;

function EditOrContinueButtons({ jobId }) {
  const { error, loading, data } = useQuery(SINGLE_JOB_QUERY, {
    variables: { id: jobId },
  });
  if (loading) return <p>Loading...</p>;
  return (
    <StyledEditOrContinueButtons>
      <Button
        startIcon={<EditIcon />}
        onClick={() => Router.push(`/admin/jobs/${jobId}/edit`)}
      >
        <Icon name="pencil" />
        {appText.actions.edit}
      </Button>
      <RenderIfLoggedIn
        permissions={[{ object: "JOB", action: "PUBLISH" }]}
        fallback={
          <ChangeJobStatusButton jobId={jobId} status="PENDING">
            {appText.messages.submitForApproval}
          </ChangeJobStatusButton>
        }
      >
        {data.job.status !== "POSTED" && (
          <ChangeJobStatusButton jobId={jobId} status="POSTED">
            {appText.actions.publish}
          </ChangeJobStatusButton>
        )}
      </RenderIfLoggedIn>
      <Button
        startIcon={<DesktopIcon />}
        onClick={() => Router.push("/admin/jobs")}
      >
        {appText.objects.job.plural}
      </Button>
    </StyledEditOrContinueButtons>
  );
}

export default EditOrContinueButtons;
