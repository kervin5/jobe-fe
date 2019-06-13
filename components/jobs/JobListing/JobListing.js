import React from 'react';
import variables from '../../../components/common/globalVariables';
// import classes from './JobListing.modules.scss';
// import BottomNav from '../../common/UI/BottomNav/BottomNav';

import JobListingDescription from './JobListingDescription/JobListingDescription';
import JobListingHeader from './JobListingHeader/JobListingHeader';
import List from '../../common/UI/List';
import Title from '../../common/UI/Title';
import Button from '../../common/UI/Button';


// import BottomNav from '../../common/UI/BottomNav/BottomNav';

const jobListing = (props) => (
    <div className="JobListing">
            
        <JobListingHeader 
            title={props.title} 
            location={props.location}   
            minAmount={props.minAmount} 
            maxAmount={props.maxAmount} 
            type={props.type}/>

        <div className="Body">

            <JobListingDescription 
                description={props.aboutCompany} 
                title={"About the Company"} />

            <JobListingDescription 
                description={props.description} 
                title={"Job Description"} />

            <Title size={"m"}>Responsabilities:</Title>
                <List jobQualifications={props.jobQualifications}/>
                
            <Title size={"m"}>Qualilfications:</Title>
                <List />

            <Button className="button" click={() => window.alert("You Have Sucessfully applied")}>Apply</Button>
        </div>
        <style jsx>{`
            .JobListing {
                box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
                min-height: 100vh;
                margin-bottom: 30px;
                border-radius: 30px;
            }

            .Body{
                margin: 0 auto;
                padding: 40px 40px 60px 40px;
                background-color: ${variables.clearColor};
                border-bottom-right-radius: 30px;
                border-bottom-left-radius: 30px;
            }

            .Body button{
                width: 40%;
                color: ${variables.clearColor};n
                float: right;
            }

            .Body p {
                padding-bottom: 30px;
            }

            @media only screen and (max-width: 520px){
                .JobListing {
                    max-width: 100%;
                    margin: 0 auto;
                }

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
    </div>
  
)

export default jobListing