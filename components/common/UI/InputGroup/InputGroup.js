import React from 'react';
import classes from './InputGroup.module.scss';

const inputGroup = props => {
    const classesToRender =[classes.InputGroup, (props.inline ? classes.Inline : "")].join(" ");
    return (

        <div className={classesToRender}>
             <p>{props.title}</p>
            <div className={classes.Content}>
                {props.children}
            </div>
        </div>
    );
};

export default inputGroup;