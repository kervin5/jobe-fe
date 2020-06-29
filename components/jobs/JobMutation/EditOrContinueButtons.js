import React from "react";
import { Button, Icon } from "semantic-ui-react";
import Router from "next/router";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";
import ChangeJobStatusButton from "./ChangeJobStatusButton";

function EditOrContinueButtons({ jobId }) {
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
        <ChangeJobStatusButton jobId={jobId} status="POSTED">
          Publish
        </ChangeJobStatusButton>
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
