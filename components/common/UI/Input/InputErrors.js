import Icon from "../Icon";

const InputErrors = ({ errors = [] }) => {
  const errorLabels = (
    <React.Fragment>
      {errors.map(errorMessage => (
        <li key={errorMessage + "errorLabel"} className="ErrorMessage">
          {" "}
          <Icon icon={"Error"} />
          {errorMessage}
        </li>
      ))}
    </React.Fragment>
  );

  return (
    <ul className={"ErrorMessage"}>
      {errors.length > 0 ? errorLabels : null}
      <style jsx>{`
        ul {
        }

        ul :global(.ErrorMessage) {
          color: red !important;
          top: initial !important;
          font-size: 0.8em;
          font-weight: 400 !important;
          padding: 0px 5px 10px;
        }

        ul :global(.ErrorMessage) {
          list-style: none;
        }

        ul :global(.ErrorMessage .Icon) {
          display: inline-block;
        }

        ul :global(.ErrorMessage .Icon svg) {
          color: red;
          width: 15px;
          height: 15px;
        }
      `}</style>
    </ul>
  );
};

export default InputErrors;
