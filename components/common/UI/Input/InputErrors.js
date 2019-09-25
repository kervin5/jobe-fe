import Icon from "../Icon";

const InputErrors = ({ errors = [] }) => {
  const errorLabels = (
    <React.Fragment>
      <li className="ErrorMessage">
        {" "}
        <Icon icon={"exclamation circle"} />
        {errors[0]}
      </li>
      {/* {errors.map(errorMessage => (
        <li key={errorMessage + "errorLabel"} className="ErrorMessage">
          {" "}
          <Icon icon={"exclamation circle"} />
          {errorMessage}
        </li>
      ))} */}
    </React.Fragment>
  );

  return (
    <ul className={"ErrorMessage"}>
      {errors.length > 0 ? errorLabels : null}
      <style jsx>{`
        ul {
          padding: 0px 5px 10px !important;
        }

        ul :global(.ErrorMessage) {
          color: red !important;
          top: initial !important;
          font-size: 1em;
          font-weight: 400 !important;
          padding: 0px 5px 10px;
        }

        ul :global(.ErrorMessage) {
          list-style: none;
        }

        ul :global(.ErrorMessage .icon) {
          display: inline-block;
          color: red;
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
      `}</style>
    </ul>
  );
};

export default InputErrors;
