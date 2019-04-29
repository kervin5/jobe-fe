import React from 'react';

const dropdownInputField = props => {
    const optionsToRender = props.options.map((optionValue,index) => <option value={optionValue} key={optionValue+index}>{optionValue}</option>);

    return(
        <select>
            <option value="">{props.placeholder}</option>
            {optionsToRender}
        </select>
    );
};

export default dropdownInputField;