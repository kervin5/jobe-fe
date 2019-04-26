import classes from './Button.module.scss';

const button = props => {
    return(
        <button onClick={props.click} className={classes.Button}>
            {props.children}
        </button>
    );
};

export default button;

