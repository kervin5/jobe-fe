import React from 'react';

import BottomNav from '../../common/UI/BottomNav/BottomNav';
import Button from '../../common/UI/Button/Button';
<<<<<<< HEAD
import Header from './Header/Header';
import List from '../../common/UI/List/List';
// import BottomNav from '../../common/UI/BottomNav/BottomNav';

=======
import classes from './JobListing.modules.scss';
import Header from './JobListingHeader/JobListingHeader';
import Icon from '../JobListing/Icon/Icon';
import List from '../../common/UI/List/List';
import Title from '../../common/UI/Title/Title';
>>>>>>> 0fed779c0db752d9e7ea0e8513add9e075404d67


const jobListing = (props) => (
    <div className={classes.cont}>
<<<<<<< HEAD
        <Header title={props.title} location={props.location}/>
=======
        <Header title={"This is a test"} location={'Target - San Fernando'}/>
>>>>>>> 0fed779c0db752d9e7ea0e8513add9e075404d67

        <div className={classes.Body}>
            <Title size={"m"}>About {props.business}</Title>
                {props.about}

            <Title size={"m"}>Job Description:</Title>
                {props.description}

            <Title size={"m"}>Responsabilities:</Title>
                <List />

            <Title size={"m"}>Qualilfications:</Title>
                <List />

            <Button className={classes.Button}>Apply</Button>

        </div>
    </div>
)

export default jobListing