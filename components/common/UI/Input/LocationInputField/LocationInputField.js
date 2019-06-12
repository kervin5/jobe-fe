import variables from '../../../globalVariables';
import AutoCompleteInputField from '../AutoCompleteInputField/AutoCompleteInputField';
// import inputStyles from '../InputStyles';

const locationInputField = props => {

    const changeHandler = (value) =>{
        props.change(value);
    };

    const options = [
        {label: "Los Angeles", value: "Los Angeles"},
        {label: "Florida", value: "Florida"},
        {label: "Texas", value: "Texas"},
        {label: "Managua", value: "Managua"},
        {label: "Manila", value: "Manila"},
         {label: "Congo", value: "Congo"}
    ];

    return (<React.Fragment>
                {/*<input type="text" placeholder={props.placeholder} value={props.value || ''} onChange={changeHandler} />*/}
                <AutoCompleteInputField placeholder={props.placeholder} change={changeHandler}  value={props.value || ''} options={options}/>
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

            </React.Fragment>);

};

export default locationInputField;