import React from 'react';
// import classes from './InputGroup.module.scss';

const inputGroup = props => {
    const classesToRender =['InputGroup', (props.inline ? "Inline" : "")].join(" ");
    return (

        <div className={classesToRender}>
             <p>{props.title}</p>
            <div className={"Content"}>
                {props.children}
            </div>
            <style jsx global>{`
                .InputGroup {
                    position: relative;
                }

                .InputGroup p {
                  font-weight: normal;
                  color: #888888;
                }

                .Content {
                    display: flex;
                    flex-direction: column;
                  }

                .Inline .Content {
                    flex-direction: row;
                }

                .Inline .Content  label {
                    font-size: 0.9em;
                    top: -20px;
                    font-weight: lighter;
                }
            `}</style>
        </div>
    );
};

export default inputGroup;