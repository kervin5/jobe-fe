import React,{useState} from 'react';
import variables from '../../../globalVariables';
// import classes from './SwitchInputField.module.scss';

const switchInputField = props => {
    const values = {
        Left: props.options[0],
        Right: props.options[1]
    };

    const [selectedValue, setSelectedValue] = useState(props.value === values.Left ? values.Left : values.Right);
    const [selectorPosition, setSelectorPosition] = useState("Left");

    const clickHandler = (e) => {
        const clickedElement = e.target.getAttribute('data-position');
        setSelectedValue(values[clickedElement]);
        setSelectorPosition(clickedElement);
        props.change(clickedElement);
    };

    return (
        <div className={"SwitchInputField"}>
            <label>{props.label}</label>
            <ul className={"Switch"}>
                <li data-position="Left" onClick={clickHandler}>{values.Left}</li>
                <li data-position="Right" onClick={clickHandler}>{values.Right}</li>
            </ul>
            <span className={"Selector" + " " + selectorPosition}> {selectedValue} </span>
            <input type="hidden" value={selectedValue}/>
            <style jsx>{`
                .SwitchInputField {
                    height: 45px;
                    display: flex;
                    justify-items: center;
                    align-items: center;
                    position: relative;
                    top: -4px;
                    background-color: ${variables.mutedColor2};
                    border-radius: 10px;
                    margin-bottom: 5px;
                }

                .Switch {
                    height: 45px;
                    list-style: none;
                    display: flex;
                    position: relative;
                }

                li {
                    margin: 2px 5px;
                    display: flex;
                    justify-items: center;
                    align-items: center;
                    font-size: 0.8em;
                    padding-left: 10px;
                    padding-right: 10px;
                    color: ${variables.baseTextColor};
                    cursor: pointer;
                }

                .Selector {
                    content: " ";
                    display: flex;

                    height: 43px;
                    background-color: ${variables.accentColor1};
                    position: absolute;

                    border-radius: 10px;
                    padding-left: 15px;
                    padding-right: 15px;
                    justify-content: center;
                    align-items: center;
                    color: $clear-color;
                    font-size: 0.8em;
                    left: 0;
                    transition: 300ms;
                }

                .Left {
                    left: 0;
                }

                .Right {
                    left: 100%;
                    transform: translateX(-100%);
                }
            `}</style>
        </div>
    )
};

export default switchInputField;