import React from 'react';

import classes from './JobListingHeader.modules.scss';
import Bubble from '../../../common/UI/Bubble/Bubble';
import Icon from '../../../common/UI/Icon/Icon';
import Title from '../../../common/UI/Title/Title';


const header = (props) => (
    <div className={classes.header} >
            <Title size={'l'} className={classes.JobListingTitle}>{props.title}</Title>
            <Title size={"m"} className={classes.JobListingLocation}><Icon icon="map-marker-alt"/> {props.location}</Title>

            <div className={classes.JobListingHeaderBar}>
                <div className={classes.JobListingJobType}>
                    <Bubble color="1">${props.minAmount}-{props.maxAmount}</Bubble>
                    <Bubble color="3">{props.type}</Bubble>
                </div>
                <Icon icon="heart" color="white" float="right" click={() => window.alert("You Have Liked this post")}/>
            </div>
            
    </div>
)

export default header;