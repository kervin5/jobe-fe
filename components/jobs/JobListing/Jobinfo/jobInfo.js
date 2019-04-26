import React from 'react';

import classes from './jobInfo.modules.scss';
import Title from '../../../common/UI/Title/Title'

const jobInfo = (props) => {
    return (
        <div className={classes.jobinfo}>
            <div className={classes.item}>
                <Title size={"m"} title={props.title}>fsdf</Title>
            </div>
        </div>
    )
}

export default jobInfo