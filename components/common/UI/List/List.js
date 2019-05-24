import React from 'react';

import classes from './List.modules.scss';

const listItems = ["High school diploma or General Education Development (GED) or equivalent", 
                    "3 months' warehouse experience", 
                    "3 months' experience operating an electric pallet jack or forklift", 
                    "Previous experience at Sysco or in foodservice industry"]

const list = (props) => {
    <style jsx>{`
    li { 
            list-style-image: url('../../../../static/images/ExactStaffArrow.svg');
        }
    `}</style>

    const totalList = listItems.map(listItem => {
        return <li>{listItem}</li>
    })

    return (
    <div className={classes.List}>
        <ul>
            {totalList}
        </ul>
    </div>
    )
};

export default list;