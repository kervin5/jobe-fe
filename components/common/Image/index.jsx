import React from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  width: 100%;
`;

const Workers = ({ src, alt }) => {
  return <StyledImage src={src} alt={alt} />;
};

export default Workers;
