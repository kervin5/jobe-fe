import React from "react";
import variables from "../../../components/common/globalVariables";
import TransformerContainer from "../../common/Layout/TransformerContainer";
import JobListingHeader from "./JobListingHeader/JobListingHeader";
import PageTitle from "../../common/Layout/PageTitle";
import Title from "../../common/UI/Title";
import ApplyToJobButton from "../../common/UI/ApplyToJobButton";
import HtmlRenderer from "../../common/UI/HtmlRenderer";
import SocialMedia from "../../common/UI/SocialMedia";
import StucturedJobListing from "./StructuredJobListing";

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
        <Title size={"m"}>Job Description:</Title>
        <HtmlRenderer html={props.data.description} />
        <br />

        <Title size={"m"} data-test="company-information-section">
          About the Company: {props.data.company}
        </Title>
        <p>{props.data.aboutCompany}</p>
        <br />

        {props.preview ? null : (
          //PLEASE CHANGE THE LINK BEFORE IT GOES LIVE
          <SocialMedia
            url={
              "https://myexactjobsstaging.herokuapp.com/jobs/" +
              props.data.title +
              "-" +
              props.data.id
            }
          />
        )}
        <br />

        {props.preview ? null : <ApplyToJobButton jobId={props.data.id} />}
      </div>
      <style jsx>{`

            .Body{
                margin: 0 auto;
                padding: 40px 40px 60px 40px;
                
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
