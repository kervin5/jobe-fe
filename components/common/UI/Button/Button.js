// import classes from './Button.module.scss';

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
                `}</style>
        </button>
    );
};

export default button;

