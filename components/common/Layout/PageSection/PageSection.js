import React from 'react';
// import classes from './PageSection.module.scss';

const pageSection = props => {
    const fullHeight = props.fullHeight ? "min-height: 100vh !important;" : "";
    const extraStyles = props.styles ? props.styles : "";

    console.log(props.styles);
    return(
        // <div className={classes.PageSection + " " +extraClasses}>
        <div className="PageSection">
            {props.children}
            <style jsx>{`
                    .PageSection {
                        min-height: 100vh;
                        width: 100%;
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: ${props.column ? 'column' : 'row'};
                        ${fullHeight}
                        ${extraStyles}
                    }

                    .PageSection:first-child {
                        min-height: calc(100vh - 50px);
                    }
                `}</style>
        </div>
    );
};

export default pageSection;