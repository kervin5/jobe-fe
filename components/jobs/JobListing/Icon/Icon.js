import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Icon.modules.scss';

const icon = (props) => (
    <div>
        <FontAwesomeIcon icon={props.icon} style={{color: props.color}} className={classes.icon}/>
    </div>
)

export default icon;