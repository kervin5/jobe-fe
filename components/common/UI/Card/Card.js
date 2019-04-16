import React from 'react';
import classes from './Card.module.scss';

const card = props => {

    return(
        <div className={classes.Card}>
            {props.children}
        </div>
    );
};

export default card;