import variables from "../../globalVariables";

export const inputStyles = (<style jsx>{`
input, textarea, select {
    border: none;
    margin: 5px 20px 5px 45px;
    width: 90%;
    outline: none;
}

input::placeholder, textarea::placeholder, select::placeholder {
     color: ${variables.mutedColor1};   
}
`}</style>);