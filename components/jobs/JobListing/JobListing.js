import React, { useState } from "react";
import variables from "../../../components/common/globalVariables";
import { getUserInfo } from "../../../data/auth";
// import classes from './JobListing.modules.scss';
// import BottomNav from '../../common/UI/BottomNav/BottomNav';
import RegisterForm from "../../users/RegisterForm/RegisterForm";
import TransformerContainer from "../../common/Layout/TransformerContainer";
import JobListingHeader from "./JobListingHeader/JobListingHeader";
import PopUp from "../../common/UI/PopUp";
import Title from "../../common/UI/Title";
import Button from "../../common/UI/Button";
import HtmlRenderer from "../../hoc/HtmlRenderer";

// import BottomNav from '../../common/UI/BottomNav/BottomNav';

const jobListing = props => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [buttonData, setButtonData] = useState({
    text: "Apply",
    disabled: false
  });
  const applyBtnClicHandler = () => {
    setShowPopUp(true);
  };

  const applicationCompleteHandler = registed => {
    if (registed) {
      setShowPopUp(false);
      setButtonData({ text: "Applied", disabled: true });
    }
  };

  return (
    <TransformerContainer>
      <JobListingHeader
        title={props.title}
        location={props.location}
        minAmount={props.minAmount}
        maxAmount={props.maxAmount}
        type={props.type}
        data-test="title-section"
      />

      <div className="Body" data-test="main-content-section">
        <Title size={"m"}>Job Description:</Title>
        <p>{props.description}</p>
        <br />

        <Title size={"m"}>Responsabilities:</Title>
        <HtmlRenderer html={props.qualifications} />
        <br />

        <Title size={"m"}>Qualilfications:</Title>
        <HtmlRenderer html={props.requirements} />
        <br />

        <Title size={"m"} data-test="company-information-section">
          About the Company:
        </Title>
        <p>{props.aboutCompany}</p>
        <br />

        <Button
          className="button"
          click={applyBtnClicHandler}
          data-test="appy-button"
          fullWidth
          disabled={buttonData.disabled}
        >
          {buttonData.text}
        </Button>
        <PopUp show={showPopUp}>
          <RegisterForm onSubmit={applicationCompleteHandler} />
        </PopUp>
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
    </TransformerContainer>
  );
};

export default jobListing;
