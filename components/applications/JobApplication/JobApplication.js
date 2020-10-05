import React from "react";
import variables from "@/common/globalVariables";
import TransformerContainer from "@/common/Layout/TransformerContainer";
import JobApplicationHeader from "./JobApplicationHeader";
import Title from "@/common/UI/Title";
import ResumeViewer from "@/components/resumes/ResumeViewer";
import appText from "@/lang/appText";

const JobApplication = (props) => {
  return (
    <TransformerContainer>
      <JobApplicationHeader
        title={`${props.data.job.title} in ${props.data.job.location.name}`}
        subtitle={props.data.user.email}
        jobId={props.data.job.id}
      />

      <div className="Body">
        <Title size={"m"}>{appText.objects.resume.singular}</Title>
        <br />
        <ResumeViewer url={props.data.resume.file.path.split("/").pop()} />
      </div>
      <style jsx>{`

            .Body{
                margin: 0 auto;
                padding: 40px 40px 60px 40px;
                position: relative;
                border-bottom-right-radius: ${variables.roundedRadius};
                border-bottom-left-radius: ${variables.roundedRadius};
                color: ${variables.baseTextColor};
            }

            Body .button{
                width: 50%;
                color: ${variables.lightColor};
                float: right;
            }

            .Body :global(ul){
                padding: 0 0 0 40px;
                color: ${variables.baseTextColor};
            }

            .Body :global(li) {
       
                list-style-image: url('${"../../../images/ExactStaffArrow.png"}');
                // padding: 5px;
                margin-bottom: 5px;
            }

            .Body :global(div){
              line-height: 1.7em;
            }



            @media only screen and (max-width: 520px){
           
                .Body{
                    //margin: 0 auto;
                    padding:40px 40px 60px 40px;
                    width: 100%;
                    border-bottom-right-radius: 0px;
                    border-bottom-left-radius: 0px;
                   
                }
                  
                .Body button{
                    width: 100%;
                    color:${variables.lightColor};
                    float: right;
                }

            }
        `}</style>
    </TransformerContainer>
  );
};

export default JobApplication;
