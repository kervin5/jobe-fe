import React from 'react';

import classes from './Title.modules.scss';

const Title = (props) => (
    <div className={classes.Title + " " + (props.className || "")}>
        {titleGenerator(props.size, props.children)}
    </div>
);

const titleGenerator = (size, text) =>
{
    const content = (<span>{text}</span>);

    switch (size) {
        case "s":
            return <h5>{content}</h5>
        case "m":
            return <h3>{content}</h3>
        case "l":
            return <h2>{content}</h2>
        default:
            return <h1>{content}</h1>
    }
}
export default Title