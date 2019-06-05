// import classes from './Button.module.scss';
import variables from '../../../common/globalVariables';

const button = props => {
    return(
        <button onClick={props.click} className={"Button" + " " + props.className}>
            {props.children}
            <style jsx>{`
                li {
                    list-style: none;
                    margin: 5px 0;
                }

                a {
                    text-decoration: none;
                    color: blue;
                    font-family: 'Arial';
                }

                a:hover {
                    opacity: 0.6;
                }

                .Button{
                    height: ${variables.inputHeight};
                    border-radius: ${variables.roundedRadius};
                    background-color: ${variables.accentColor1};
                    border: none;
                    color: ${variables.clearColor};
                    box-shadow: 0px 3px 22px -10px rgba(0,0,0,0.75);
                    transition: 300ms;
                    width: 100%;
                    ${props.styles || ""}
                }

                .Button:hover{
                    background-color: ${variables.accentColor2};
                    cursor: pointer;
                }
                `}</style>
        </button>
    );
};

export default button;

