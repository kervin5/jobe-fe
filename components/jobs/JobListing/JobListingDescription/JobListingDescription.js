import React from 'react';

import Title from '../../../common/UI/Title';


const jobListingDescription = (props) => (
    <div>
        <Title size={"m"}>{props.title}</Title>
        <p>{props.description}</p>
    </div>
);

export default jobListingDescription;