import { gql } from "@apollo/client";
import { Query } from "@apollo/react-components";
import { Loader } from "semantic-ui-react";

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

const PopularTerms = ({ terms }) => {
  return (
    <div className="PopularTerms">
      <Query query={POPULAR_TERMS_QUERY}>
        {({ error, loading, data }) => {
          if (error && !terms) return <p>Something went wrong</p>;

          if (loading && !terms)
            return (
              <>
                <span></span>
                <Loader active inline="centered" />
              </>
            );

          const termsToRender = data?.popularTerms ?? terms;
          if (termsToRender)
            return termsToRender.map(term => (
              <PopularTerm key={term.label + "Term"} term={term} />
            ));
        }}
      </Query>
      <style jsx>
        {`
          .PopularTerms {
            width: 100%;
            display: grid;
            grid-template-columns: auto auto auto;
            grid-gap: 1em;
            position: relative;
            z-index: 2;
            margin-bottom: 30px;
          }
        `}
      </style>
    </div>
  );
};

export default PopularTerms;
