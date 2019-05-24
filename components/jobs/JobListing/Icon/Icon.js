import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Icon.modules.scss';

const icon = (props) => (

      <FontAwesomeIcon icon={props.icon} style={{color: props.color, float: props.float}} className={classes.icon} size={"lg"}/>    
)

export default icon;