import gql from "graphql-tag";
import { Query } from "react-apollo";
import Link from "next/link";
import DynamicImageBg from "../common/UI/DynamicImageBg";

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
  const getLinkPath = term => {
    if (term.type === "location") return "/jobs?location=" + term.label;
    if (term.type === "category") return "/jobs?category=" + term.label;
  };

  return (
    <div className="PopularTerms">
      <Query query={POPULAR_TERMS_QUERY} ssr={false}>
        {({ error, loading, data }) => {
          if (error) return <p>Something went wrong</p>;
          if (loading) return <p>Loading</p>;
          if (data)
            return data.popularTerms.map(term => (
              <div key={term.id} className="Term">
                <Link href={getLinkPath(term)}>
                  <a>
                    <DynamicImageBg query={term.label}>
                      <p className="TermContent">{term.label}</p>
                    </DynamicImageBg>
                  </a>
                </Link>
              </div>
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
          }

          .Term {
            border-radius: 12px;
            overflow: hidden;
            position: relative;
            transition: 100ms;
          }

          .Term:hover {
            transform: scale(1.05);
          }

          .Term:before {
            content: "";
            background: rgba(0, 0, 0, 0.4);
            position: absolute;
            display: block;
            z-index: 5;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
          }

          .Term:nth-child(2n) {
            flex-basis: 100%;
          }

          .Term .TermContent {
            position: relative;
            padding: 30px 10px;
            font-weight: bold;
            color: white;
            text-align: center;
            z-index: 4;
          }
        `}
      </style>
    </div>
  );
};

export default PopularTerms;
