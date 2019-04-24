import React from 'react';

import classes from './Button.modules.scss';

const button = (props) => {
    return(
        <div className={classes.cont}>
            <button className={classes.button}>{props.title}</button>
        </div>)
}

export default button