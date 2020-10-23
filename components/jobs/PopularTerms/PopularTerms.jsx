import { gql } from "@apollo/client";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import Loader from "@/common/UI/Animated/Loader";

import PopularTerm from "./PopularTerm";

const POPULAR_TERMS_QUERY = gql`
  query POPULAR_TERMS_QUERY {
    popularTerms {
      id
      label
      type
    }
  }
`;

const StyledPopularTerms = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 1em;
  position: relative;
  z-index: 2;
  margin-bottom: 30px;
`;

const PopularTerms = ({ terms }) => {
  const { error, loading, data } = useQuery(POPULAR_TERMS_QUERY);
  if (error && !terms) return <p>Something went wrong</p>;
  if (loading && !terms) {
    return <Loader active inline="centered" />;
  }
  const termsToRender = data?.popularTerms ?? terms;
  if (termsToRender) {
    return (
      <StyledPopularTerms className="PopularTerms">
        {termsToRender.map((term) => (
          <PopularTerm key={term.label + "Term"} term={term} />
        ))}
      </StyledPopularTerms>
    );
  }
  return null;
};

export default PopularTerms;
