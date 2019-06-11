import React, {useState, useEffect} from 'react';
import variables from '../../../globalVariables';
// import inputStyles from '../InputStyles';

const locationInputField = props => {

    let ajaxField = props.ajax || false;

    const [textFieldValue, setTextFieldValue] = useState("");
    const [optionsToDisplay, setOptionsToDisplay] = useState(null);
    const [options, setOptions] = useState(props.options);

    const changeHandler = (e) =>{
        setTextFieldValue(e.target.value);
        setOptions(filterOptions(e.target.value,props.options));
    };

    const handleOptionClick = (newValue) => {
        setTextFieldValue(newValue);
        setOptions(filterOptions(newValue,props.options));
    };

    useEffect(()=>{
        const optionsElements = options.map((option, index) => {
            return <div key={index} className={"Option"} onClick={()=> handleOptionClick(option.value)}>{option.label}</div>;
        });
        setOptionsToDisplay(optionsElements);
    });

    return (<React.Fragment>
                <input type="text" placeholder={props.placeholder} value={textFieldValue} onChange={changeHandler} />
                <div className={'Options'}>
                    {optionsToDisplay}
                </div>

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
                
                .Options {
                    
                    left: 0;
                    right: 0;
                    background-color: ${variables.clearColor};
                    border: 1px solid ${variables.mutedColor2};
                    position: absolute;
                    top: 50px;
                    z-index: 999;
                    border-bottom-left-radius: 10px;
                    border-bottom-right-radius: 10px;
                    padding: 5px 15px;
                    box-shadow: 0px 32px 45px -41px rgba(0,0,0,0.75);
                }
                
                .Options :global(.Option) {
                    margin-bottom: 5px;
                }
               
               .Options :global(.Option):hover {
                    margin-bottom: 5px;
                    background-color: blue;
                }
               
                 `}</style>

            </React.Fragment>);
};

const filterOptions = (sentence, options) => {
    const words = sentence.trim().split(" ");
    let result = [];
    let filteredWords = [];
    words.forEach(word => {
        if(word.length > 0 ) {
            options.forEach(option => {
            if(option.value.toLowerCase().includes(word.toLowerCase()) && !filteredWords.includes(option.value.toLowerCase()) ){
                result.push(option);
                filteredWords.push(option.value.toLowerCase());
            }
          });
        }
    });
    return result;
};

export default locationInputField;