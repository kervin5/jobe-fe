import React from 'react';

import classes from './List.modules.scss';

// const listItem = {
//     listStyleImage: ('../../../../static/images/ExactStaffArrow.png'),
// }


const list = (props) => {
    return (
    <div className={classes.List}>
        <ul>
            <li>High school diploma or General Education Development (GED) or equivalent</li>
            <li>3 months' warehouse experience</li>
            <li>3 months' experience operating an electric pallet jack or forklift</li>
            <li>Previous experience at Sysco or in foodservice industry</li>
        </ul>

        <style jsx>{`
            li { 
                list-style-image: url('../../../../static/images/ExactStaffArrow.svg');

            }
        `}</style>
    </div>
    )
};

export default list;