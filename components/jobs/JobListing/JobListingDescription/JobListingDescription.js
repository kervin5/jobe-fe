import React from 'react';

import Title from '../../../common/UI/Title';


const jobListingDescription = (props) => (
    <div>
        <Title size={"m"}>{props.title}</Title>
        <p>{props.description}</p>
        <style jsx>{`
            p{
                padding-bottom: 40px;
            }
        `}</style>
    </div>
);

export default jobListingDescription;