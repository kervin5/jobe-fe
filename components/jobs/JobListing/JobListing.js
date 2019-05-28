import React from 'react';

import classes from './JobListing.modules.scss';
import Title from '../../common/UI/Title/Title';
import Button from '../../common/UI/Button/Button';
import Header from './Header/Header';
import List from '../../common/UI/List/List';
// import BottomNav from '../../common/UI/BottomNav/BottomNav';



const jobListing = (props) => (
    <div className={classes.cont}>
        <Header title={props.title} location={props.location}/>

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