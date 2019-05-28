import React from 'react';

import classes from './JobListingHeader.modules.scss';
import Title from '../../../common/UI/Title/Title';
import Icon from '../Icon/Icon';

const header = (props) => (
    <div className={classes.header} >
            <Title size={'l'}>{props.title}</Title>
            <Title size={"m"}>{props.location}</Title>
    </div>
)

export default header;