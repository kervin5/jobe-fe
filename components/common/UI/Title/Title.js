import React from 'react';

import classes from './Title.modules.scss';

const Title = (props) => (
    <div className={classes.Title}>
        {titleGenerator(props.size, props.children)}
    </div>
)

const titleGenerator = (size, text) =>
{
    switch (size) {
        case "s":
            return <p>{text}</p>
        case "m":
            return <h3>{text}</h3>
        case "l":
            return <h2>{text}</h2>
        default:
            return <h1>{text}</h1>
    }
}
export default Title