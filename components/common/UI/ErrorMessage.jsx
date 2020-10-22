import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledErrorMessage = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;

  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const DisplayError = ({ error, data }) => {
  const parsed = parseGraphqlError(error, data);
  if (!parsed.length) return null;

  return parsed.map((error, i) => (
    <StyledErrorMessage key={i}>
      <p data-test="graphql-error">
        <strong>Shoot!</strong>
        {error.message.replace("GraphQL error: ", "")}
      </p>
    </StyledErrorMessage>
  ));
};

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export const parseGraphqlError = (error, data) => {
  // if (!error && !error.message) return null;
  if (error?.networkError?.result?.errors?.length) {
    return error.networkError.result.errors.map((error, i) => ({
      message: error.message,
    }));
  }

  if (data) {
    const [dataKey] = Object.keys(data);
    if (data[dataKey]["__typename"] === "GraphqlError") {
      return [{ message: data[dataKey]["message"] }];
    }
  }

  if (error?.message) {
    return [{ message: error.message }];
  }

  return [];
};

export default DisplayError;
