import styled from "styled-components";

const StyledTransformeContainer = styled.div`
  &.TransformerContainer {
    /* box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23); */
    margin-bottom: 30px;
    /* border-radius: ${(props) => props.theme.roundedRadius}; */
    /* background-color: ${(props) => props.theme.lightColor}; */
    padding: ${(props) => (props.padding ? "30px" : "0")};

    @media only screen and (max-width: 520px) {
      max-width: 100%;
      margin: 0 auto;
      border-radius: 0px;
      box-shadow: none;
    }
  }
`;

const TransformerContainer = (props) => {
  return (
    <StyledTransformeContainer className="TransformerContainer" {...props}>
      {props.children}
    </StyledTransformeContainer>
  );
};

export default TransformerContainer;
