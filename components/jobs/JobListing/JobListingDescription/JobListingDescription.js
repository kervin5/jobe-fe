import React from 'react';

import Title from '../../../common/UI/Title/Title';


const jobListingDescription = (props) => (
    <div>
        <Title title={props.title}/>
        <p>{props.children}</p>
    </div>
);

export default jobListingDescription;