import variables from '../../../globalVariables';
import React from 'react';
const dropdownInputField = props => {

    const optionsToRender = props.options.map((optionValue,index) => <option value={optionValue} key={optionValue+index}>{optionValue}</option>);

    return(
        <select onChange={(e)=> props.change(e.target.value)}>
            <option value="">{props.placeholder}</option>
            {optionsToRender}
            <style jsx>{`
                 input, textarea, select {
                    border: none;
                    margin: 5px 20px 5px 15px;
                    width: 90%;
                    outline: none;
                }
                
                input::placeholder, textarea::placeholder, select::placeholder {
                     color: ${variables.secondaryTextColor};   
                }
                
                textarea {
                    min-height: 300px;
                    padding-top: 15px;
                }
                
                label {
                    color: ${variables.baseTextColor};
                }
                 `}</style>
        </select>
    );
};

export default React.memo(dropdownInputField);