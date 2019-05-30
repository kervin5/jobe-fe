import React from 'react';

import classes from './Icon.modules.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const icon = (props) => (

      <FontAwesomeIcon icon={["fa", props.icon]} style={{color: props.color, float: props.float}} className={classes.icon} size={"lg"} onClick={props.click}/>    
)

export default icon;