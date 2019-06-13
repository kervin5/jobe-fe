// import classes from './Button.module.scss';
import variables from '../globalVariables';

const button = props => {
    const buttonWidth = "Width:" + props.width || ;
    let widthStyle = {width: '100%'};
    
    // if (props.width) {
    //     if(props.width === widthStyle)
    // }



    return(
        <button onClick={props.click} className={"Button"}>
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
                }

                .Button:hover{
                    background-color: ${variables.accentColor2};
                    cursor: pointer;
                }

                ${props.styles || ""}
                
                `}</style>
        </button>
    );
};

export default button;

