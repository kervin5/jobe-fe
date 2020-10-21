import React from "react";
import styled from "styled-components";
import Chip from "@material-ui/core/Chip";
import Link from "next/link";
import Title from "@/common/UI/Title";
import JobCompensationBubbles from "@/components/jobs/JobCompensationBubbles";

import ApplyToJobButton from "@/components/jobs/ApplyToJobButton";
import Translator from "@/common/UI/Translator/Translator";
import HtmlRenderer from "@/common/UI/HtmlRender";
import variables from "@/common/globalVariables";
import appText from "@/lang/appText";

const StyledJobListingBody = styled.div`

&.Body{
  margin: 0 auto;
  padding: 40px 40px 60px 40px;
  position: relative;
  border-bottom-right-radius: ${variables.roundedRadius};
  border-bottom-left-radius: ${variables.roundedRadius};
  color: ${variables.baseTextColor};
  line-height: 1.7em;

  .button{
    width: 50%;
    color: ${variables.lightColor};
    float: right;
  }

  ul{
      padding: 0 0 0 40px;
      color: ${variables.baseTextColor};
  }

  li {
       list-style-image: url('${"../../../images/ExactStaffArrow.png"}');
       margin-bottom: 5px;
   }

   @media only screen and (max-width: 520px){
           
         
               padding:40px 40px 60px 40px;
               width: 100%;
               border-bottom-right-radius: 0px;
               border-bottom-left-radius: 0px;
              
         
           button{
               width: 100%;
               color:${variables.lightColor};
               float: right;
           }

       }
  }  

`;

const JobListingBody = (props) => {
  return (
    <StyledJobListingBody className="Body">
      <Translator>
        <HtmlRenderer html={props.data.description} />
      </Translator>

      <Title size={"m"} data-test="company-information-section">
        {appText.objects.compensation.singular}
      </Title>
      <JobCompensationBubbles
        minCompensation={props.data.minCompensation}
        maxCompensation={props.data.maxCompensation}
      />

      <Title size={"m"} data-test="company-information-section">
        <Translator>
          {appText.messages.about} {props.data.company}
        </Translator>
      </Title>

      <Translator>{props.data.aboutCompany}</Translator>

      {props.preview ? null : <ApplyToJobButton jobId={props.data.id} />}
      <div className="Labels">
        {props.data.categories.map((category, index) => {
          return (
            <Link
              href={`/jobs?category=${category.name}&location=${props.data.location}`}
              key={"CategoryLabel" + index}
              passHref
            >
              <Chip label="Basic" as="a" label={category.name} />
            </Link>
          );
        })}
      </div>
    </StyledJobListingBody>
  );
};

export default JobListingBody;
