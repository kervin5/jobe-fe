import variables from "../globalVariables";

const TransformerContainer = props => {
  return (
    <div className="TransformerContainer" {...props}>
      {props.children}

      <style jsx>{`
        .TransformerContainer {
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
            0 6px 6px rgba(0, 0, 0, 0.23);
          // min-height: 100vh;
          margin-bottom: 30px;
          border-radius: ${variables.roundedRadius};
          background-color: ${variables.clearColor};
        }

        @media only screen and (max-width: 520px) {
          .TransformerContainer {
            max-width: 100%;
            margin: 0 auto;
            border-radius: 0px;
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
};

export default TransformerContainer;
