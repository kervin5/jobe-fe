import React from 'react';
// import classes from './Container.module.scss';

const container = (props) => {
    // const customWidth = props.maxWidth || "900px";

    return(
        <div>
            {props.children}
            <style jsx>{`
                div {
                    margin: auto;
                    max-width: 920px;
                    ${props.styles || ""};
                }
            `}</style>
        </div>
    );
}

export default container;