import variables from "../../globalVariables";

const inputStyles = (<style jsx>{`
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
    width: 100%;
    position: absolute;
    top: -25px;
    color: ${variables.baseTextColor};
}
`}</style>);

export default inputStyles;