import React from 'react';

import classes from './jobInfo.modules.scss';
import Title from '../../../common/UI/Title/Title'

const jobInfo = (props) => {
    return (
        <div className={classes.jobinfo}>
            <div className={classes.item}>
                <Title size={"m"} title={props.title}></Title>
            </div>
            {/*<Title size={"m"}>Location</Title>*/}
            {/*<h3>Woodland Hills, CA</h3>*/}

            {/*<Title size={"m"}>Pay Rate</Title>*/}
            {/*<h3>DOE</h3>*/}

            {/*<Title size={"m"}>Skills</Title>*/}
            {/*<h3>qiuick, fast, agile</h3>*/}
        </div>
    )
}

export default jobInfo