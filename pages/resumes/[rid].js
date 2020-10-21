import React from "react";
import { useRouter } from "next/router";
import variables from "@/common/globalVariables";
import PageSection from "@/common/Layout/PageSection";
import ResumeViewer from "@/components/resumes/ResumeViewer";
import RenderIfLoggedIn from "@/components/hoc/RenderIfLoggedIn";

const pageStyles = `background-color:${variables.mutedColor1};`;

const SingleResumeView = (props) => {
  const router = useRouter();
  const { rid } = router.query;
  return (
    <RenderIfLoggedIn
      redirect
      permissions={[{ object: "RESUME", action: "READ" }]}
    >
      <PageSection styles={pageStyles}>
        <div className="JobContainer">
          <ResumeViewer url={rid} />
          <style jsx>
            {`
              .JobContainer {
                width: 100%;
                max-width: 970px;
                padding-top: 30px;
              }

              @media (max-width: 720px) {
                .JobContainer {
                  padding-top: 0;
                }
              }
            `}
          </style>
        </div>
      </PageSection>
    </RenderIfLoggedIn>
  );
}; //eof

export default SingleResumeView;
