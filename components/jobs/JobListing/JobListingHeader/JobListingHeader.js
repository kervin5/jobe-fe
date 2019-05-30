import React from 'react';

import Title from '../../../common/UI/Title/Title';
import classes from './JobListingHeader.modules.scss';

import Bubble from '../../../common/UI/Bubble/Bubble';
import Icon from '../Icon/Icon';

const header = (props) => (
    <div className={classes.header} >
            <Title size={'l'}>{props.title}</Title>
            <Title size={"m"}>{props.location}</Title>
            <Bubble>${props.minAmount}-{props.maxAmount}</Bubble>
            <Bubble>{props.type}</Bubble>
            <Icon icon="heart" color="white" float="right" click={() => window.alert("You Have Liked this post")}/>
    </div>
)

export default header;