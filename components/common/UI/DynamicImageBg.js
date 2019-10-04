import React, { useState, useEffect } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import variables from "../globalVariables";

const GET_IMAGE_QUERY = gql`
  query GET_IMAGE_QUERY($query: String!) {
    image(query: $query)
  }
`;

const DynamicImageBg = props => {
  return (
    <Query
      query={GET_IMAGE_QUERY}
      variables={{ query: props.query }}
      ssr={false}
    >
      {({ error, loading, data }) => {
        return (
          <div className={"DynamicImageBg "}>
            <div className={"ImgContainer"}></div>
            <div className={"Content"}>{props.children}</div>

            <style jsx>{`
              .DynamicImageBg {
                  width: 100%;               
                  height: 100%;
                  position: relative;
                  background-color: ${variables.accentColor1}
              }

              .ImgContainer {
                  background-image: url('${data ? data.image : ""}');
                  width: 100%;
                  background-size: cover;
                  background-position: center;
                  background-attachment: fixed;
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;

                  z-index: 4;
                  transition: 300ms;
              }

              .Content {
                  z-index: 5;
                  position: ${props.absolute ? "absolute" : "relative"};
              }

              @media(max-width: ${variables.mediumScreen}) {
                .ImgContainer {
                    
                      filter: blur(${props.noblur ? "0px" : "4px"});
                    
                  }
              }
          `}</style>
          </div>
        );
      }}
    </Query>
  );
};

export default React.memo(DynamicImageBg);
