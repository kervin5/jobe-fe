import React from 'react';
import variables from '../../../../components/common/globalVariables';
// import classes from './List.modules.scss';
import uniqid from 'uniqid';


const list = (props) => {
    const jobQualifications = 
    ["High school diploma or General Education Development (GED) or equivalent", 
    "3 months' warehouse experience", 
    "3 months' experience operating an electric pallet jack or forklift", 
    "Previous experience at Sysco or in foodservice industry"];


    const bulletStyle = {
        listStyleImage: 'url(../../../../static/images/ExactStaffArrow.svg)'
    }
    
    const totalList = jobQualifications.map(listItem => {
        return <li style={bulletStyle} key={uniqid('listing')}>{listItem}</li>
    })

    return (    
    <div className="List">
        <ul>
            {totalList}
        </ul>
        
        <style jsx>{`
            .List{
                padding: 0 0 20px 40px;
                color: ${variables.baseTextColor};
            }

            .List li {
                padding: 10px;
            }
        `}</style>
    </div>
    )
};

export default list;