import React from 'react';

import classes from './JobListing.modules.scss';
// import BottomNav from '../../common/UI/BottomNav/BottomNav';

import JobListingDescription from './JobListingDescription/JobListingDescription';
import JobListingHeader from './JobListingHeader/JobListingHeader';
import List from '../../common/UI/List/List';
import Title from '../../common/UI/Title/Title';
import Button from '../../common/UI/Button/Button';


// import BottomNav from '../../common/UI/BottomNav/BottomNav';

const jobListing = (props) => (
    <div className={classes.JobListing}>
        <JobListingHeader 
            title={props.title} 
            location={props.location}   
            minAmount={props.minAmount} 
            maxAmount={props.maxAmount} 
            type={props.type}/>

        <div className={classes.Body}>

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

            <Button className={classes.Button} click={() => window.alert("You Have Sucessfully applied")}>Apply</Button>
        </div>
    </div>
)

export default jobListing