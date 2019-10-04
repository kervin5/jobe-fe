import gql from "graphql-tag";
import { Query } from "react-apollo";
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

const PopularTerms = () => {
  return (
    <div className="PopularTerms">
      <Query query={POPULAR_TERMS_QUERY} ssr={false}>
        {({ error, loading, data }) => {
          if (error) return <p>Something went wrong</p>;

          if (loading)
            return (
              <>
                <span></span>
                <Loader active inline="centered" />
              </>
            );
          if (data)
            return data.popularTerms.map(term => (
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
