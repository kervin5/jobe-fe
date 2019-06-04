import React from 'react';

import classes from './Title.modules.scss';

const Title = (props) => {
    const alignment = props.center ? "Center" : (props.right ? "Right" : "Left");
    const classesToRender = [classes.Title,(props.className || ""),(classes[alignment])].join(" ");

    return(
    <div className={classesToRender}>
        {titleGenerator(props.size, props.children)}
    </div>);
};

const titleGenerator = (size, text) =>
{
    switch (size) {
        case "s":
            return <h5>{text}</h5>
        case "m":
            return <h3>{text}</h3>
        case "l":
            return <h2>{text}</h2>
        default:
            return <h1>{text}</h1>
    }
}
export default Title