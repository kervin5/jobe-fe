import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Icon.modules.scss';

const icon = (props) => (
    <div className={classes.container}>
      <FontAwesomeIcon icon={["fas",props.icon || "caret-square-right"]} style={{color: props.color, float: props.float}} className={classes.icon}/>    
    </div>
)

export default icon;