import React from 'react';
import variables from '../globalVariables';
// import classes from './Bubble.module.scss';

const bubble = (props) => {
    const color = "Color"+ props.color || 1;
    let backgroundColor = variables.accentColor1;

    if(props.color) {
        if(props.color === 2) {
            backgroundColor = variables.accentColor2;
        } else if(props.color === 3) {
            backgroundColor = variables.accentColor3;
        }else {
            backgroundColor = variables.accentColor1;
        }
    }

    return (
        <span >
            {props.children}
            <style jsx>{`
                 span {
                    font-weight: bold;
                    font-size: 0.75em;
                    text-align: center;
                    padding: 3px 3px;
                    min-width: 85px;
                    background-color: ${backgroundColor};
                    margin-left: 5px;
                    border-radius: 15px;
                    color: ${variables.clearColor};
                    display: inline-block;
                 }
            `}</style>
        </span>
    );
}

export default bubble;