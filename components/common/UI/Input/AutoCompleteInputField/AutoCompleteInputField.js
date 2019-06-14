import React, {useState, useEffect} from 'react';
import variables from '../../../globalVariables';
// import inputStyles from '../InputStyles';

const locationInputField = props => {

    let ajaxField = props.ajax || false;

    const [textFieldValue, setTextFieldValue] = useState("");
    const [optionsToDisplay, setOptionsToDisplay] = useState(null);
    const [options, setOptions] = useState(props.options);
    const [hasValueFromOptions, setHasValueFromOptions] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    //const fieldIsValid = useState(false);


    const changeHandler = async (e) =>{
        updateField(e.target.value);
         if(props.ajax && e.target.value !== "") {
                props.callback(e.target.value);
            }
    };

    const updateField = (value) => {
        setTextFieldValue(value);
        if(!props.ajax) {
             setOptions(filterOptions(value,props.options));
        }
        setHasValueFromOptions(fieldIsValid(value));
        console.log(hasValueFromOptions);
    };

    const fieldIsValid = (value) => {
      const result = props.options.filter(option => {
            return option.value.trim().toLowerCase() === value.trim().toLowerCase();
        });
      console.log("Verified");
      return result.length > 0;
    };

    useEffect(()=>{
        const optionsElements = options.map((option, index) => {
            return <div key={index} className={"Option"} onClick={()=> handleOptionClick(option.value)}>{option.label}</div>;
        });
        setOptionsToDisplay(optionsElements);
    },[options]);

    useEffect(()=> {
        setOptions(props.options);
    },[props.options]);



    useEffect(()=>{
        if(props.change) {
            if(hasValueFromOptions) {
                props.change(textFieldValue);
            } else {
                props.change("");
            }
        }
    },[textFieldValue, hasValueFromOptions]);

    const handleBlur = (e) => {
        //  const currentTarget = e.currentTarget;
        // console.log("Blur");
        // console.log(currentTarget);
        // console.log(document.activeElement);
        // setTimeout(function() {
        //   if (!currentTarget.contains(document.activeElement)) {
        //      setShowMenu(false);
        //   }
        // }, 0);

        //TODO: Refactor onBlur handler
    };

    const handleOptionClick = (value) => {
        updateField(value);
        console.log("clicked");
        setShowMenu(false);
    };

    useEffect(()=>{
        if(!showMenu) {
            if(!hasValueFromOptions) {
                setOptions([]);
            }
        }

    },[showMenu]);

    return (<div onBlur={handleBlur} className="AutoCompleteInputField">
                <input type="text" placeholder={props.placeholder} value={textFieldValue} onChange={changeHandler} onFocus={()=> setShowMenu(true)}/>
                {showMenu &&
                <div className={'Options'} >
                    {optionsToDisplay.length > 0 ? optionsToDisplay : "No results found"}
                </div>}

                 <style jsx>{`
                 .AutoCompleteInputField {
                    width: 100%;
                 }
                 
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

    </div>);
};

const filterOptions = (sentence, options) => {
    const words = sentence.replace(/[^a-zA-Z0-9\s]/g, "").trim().split(" ");
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
    return sentence === "" ? options : result;
};

export default locationInputField;