import React from 'react';

import classes from './Header.modules.scss';
import Title from '../../../common/UI/Title/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackgroundChanger from '../BackgroundChanger/backgroundChanger';

const header = (props) => (
    <div className={classes.header} >
            <Title size={'l'}>{props.title}</Title>
            <Title size={"m"}>{props.location}</Title>
            <FontAwesomeIcon icon={"heart"} className={classes.Icon}/> 
    </div>

)

export default header

//, BackgroundChanger(accounting) ].join(' ')