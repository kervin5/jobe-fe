import React from 'react';

import BottomNav from '../../common/UI/BottomNav/BottomNav';
import Button from '../../common/UI/Button/Button';
import JobListingHeader from './JobListingHeader/JobListingHeader';
import List from '../../common/UI/List/List';
import classes from './JobListing.modules.scss';
import Title from '../../common/UI/Title/Title';
import JobListingDescription from './JobListingDescription/JobListingDescription';

// import BottomNav from '../../common/UI/BottomNav/BottomNav';

const jobListing = (props) => (
    <div className={classes.cont}>
        <JobListingHeader title={props.title} location={props.location}/>

        <div className={classes.Body}>
            <Title size={"m"}>About {props.business}</Title>
            <JobListingDescription>{"At Sysco, we offer our associates the opportunity to grow personally and professionally, to contribute to the success of a dynamic organization, and to serve others in a manner that exceeds their expectations. We are looking for talented, hard-working individuals to join our team. Come grow with us and let us show you why good things really do come from Sysco."}</JobListingDescription>

            <Title size={"m"}>Job Description:</Title>
            <JobListingDescription>{"This is a warehouse position responsible for operating an electric pallet jack or forklift, selecting the correct products from warehouse racking, labeling product using SOS label technology, palletizing product as it is selected to build customer orders and delivering product to the dock in a safe and efficient manner. This position requires working 6:00 p.m. until end-of-shift until all product is accurately selected and loaded. Overtime hours and working weekends and holidays are required in order to successfully fill customers' orders. Job requires working in areas with temperature and humidity variations based on local weather conditions, and on selecting environment (Dry, Cooler, Freezer)."}</JobListingDescription>

            <Title size={"m"}>Responsabilities:</Title>
                <List jobQualifications={props.jobQualifications}/>
                
            <Title size={"m"}>Qualilfications:</Title>
                <List />

            <Button className={classes.Button}>Apply</Button>
        </div>
    </div>
)

export default jobListing