import React from 'react';

import classes from './JobListing.modules.scss';
import Title from '../../common/UI/Title/Title';
import Button from '../../common/UI/Button/Button';
import Icon from '../JobListing/Icon/Icon';
import Header from './Header/Header';
import List from '../../common/UI/List/List';
import BottomNav from '../../common/UI/BottomNav/BottomNav';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fab } from '@fortawesome/free-brands-svg-icons';


const jobListing = (props) => (
    <div className={classes.cont}>
        <Header title={props.title} location={'Target - San Fernando'}/>

        <div className={classes.Body}>
            <Title size={"m"}>About Target</Title>
            <p>At Sysco, we offer our associates the opportunity to grow personally and professionally, to contribute to the success of a dynamic organization, and to serve others in a manner that exceeds their expectations. We are looking for talented, hard-working individuals to join our team. Come grow with us and let us show you why good things really do come from Sysco.</p>

            <Title size={"m"}>Job Description:</Title>
            <p>This is a warehouse position responsible for operating an electric pallet jack or forklift, selecting the correct products from warehouse racking, labeling product using SOS label technology, palletizing product as it is selected to build customer orders and delivering product to the dock in a safe and efficient manner. This position requires working 6:00 p.m. until end-of-shift until all product is accurately selected and loaded. Overtime hours and working weekends and holidays are required in order to successfully fill customers' orders. Job requires working in areas with temperature and humidity variations based on local weather conditions, and on selecting environment (Dry, Cooler, Freezer).</p>

            <Title size={"m"}>Responsabilities:</Title>
                <List />

            <Title size={"m"}>Qualilfications:</Title>
                <List />

            <Button className={classes.Button} onClick={() => { console.log('Are you sure you wish to delete this item?') } }>Apply</Button>

            <Title size="m">Share:</Title>
             <Icon icon="twitter" color='red' className={classes.icon} />
            <Icon icon="heart" color='red' className={classes.icon}/> 

            <BottomNav />
        </div>
    </div>
)

export default jobListing