import React from 'react';
import variables from '../globalVariables';
// import classes from './List.modules.scss';
import uniqid from 'uniqid';


const list = (props) => {
    //const listItems = {props};

    const bulletStyle = {
        listStyleImage: 'url(../../../../static/images/ExactStaffArrow.svg)',
        padding: '5px'
    }
    
    const totalList = listItems.map(listItem => {
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