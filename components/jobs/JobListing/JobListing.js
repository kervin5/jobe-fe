import React from "react";
import { Label } from "semantic-ui-react";
import variables from "../../../components/common/globalVariables";
import TransformerContainer from "../../common/Layout/TransformerContainer";
import JobListingHeader from "./JobListingHeader/JobListingHeader";
import PageTitle from "../../common/Layout/PageTitle";
import Title from "../../common/UI/Title";
import ApplyToJobButton from "../../common/UI/ApplyToJobButton";
import HtmlRenderer from "../../common/UI/HtmlRenderer";
import SocialMedia from "../../common/UI/SocialMedia";
import StucturedJobListing from "./StructuredJobListing";
import { basePath } from "../../../config";
import Translator, { ListOfLanguages } from "../../hoc/Translator";

const jobListing = props => {
  return (
    <TransformerContainer data-test="job-listing">
      <PageTitle title={props.data.title + " at " + props.data.location} />
      <JobListingHeader
        title={props.data.title}
        location={props.data.location}
        minCompensation={props.data.minCompensation}
        maxCompensation={props.data.maxCompensation}
        type={props.data.type}
        data-test="title-section"
        hideFavoriteButton={props.preview}
        jobId={props.data.id}
      />

      <div className="Body" data-test="main-content-section">
        <ListOfLanguages />
        <Title size={"m"}>
          <Translator>Job Description</Translator>:
        </Title>
        <Translator>
          <HtmlRenderer html={props.data.description} />
        </Translator>
        <br />

        <Title size={"m"} data-test="company-information-section">
          <Translator>About the Company: {props.data.company}</Translator>
        </Title>
        <div>
          <Translator>{props.data.aboutCompany}</Translator>
        </div>
        <br />

        {props.preview ? null : (
          <SocialMedia
            url={`${basePath}/jobs/` + props.data.title + "-" + props.data.id}
          />
        )}
        <br />

        {props.preview ? null : <ApplyToJobButton jobId={props.data.id} />}
        <Label.Group tag>
          {props.data.skills.map((category, index) => {
            return <Label key={"CategoryLabel" + index}>{category.name}</Label>;
          })}
        </Label.Group>
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
                color: ${variables.clearColor};
                float: right;
            }

            .Body :global(ul){
                padding: 0 0 0 40px;
                color: ${variables.baseTextColor};
            }

            .Body :global(li) {
       
                list-style-image: url('${"../../../static/images/ExactStaffArrow.png"}');
                // padding: 5px;
                margin-bottom: 5px;
            }

            .Body :global(div){
              line-height: 1.7em;
            }

            .Body :global(.ListOfLanguages) {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 99;
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
                    color:${variables.clearColor};
                    float: right;
                }

            }
        `}</style>
      <StucturedJobListing data={props.data} />
    </TransformerContainer>
  );
};

export default jobListing;
