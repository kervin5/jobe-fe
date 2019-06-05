import variables from "../../globalVariables";

const inputStyles = <style jxs>{`
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
`}</style>;

export default inputStyles;