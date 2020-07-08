import React from "react";
import { Query } from "@apollo/react-components";
import { gql } from "@apollo/client";
import variables from "@/common/globalVariables";

const GET_IMAGE_QUERY = gql`
  query GET_IMAGE_QUERY($query: String!) {
    image(query: $query)
  }
`;

const staticImages = Array.from(Array(3).keys());
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const DynamicImageBg = ({ absolute, noblur, query, children, staticImage }) => {
  const baseProps = {
    absolute,
    noblur,
    children
  };

  if (staticImage) {
    const getRandomImage = () =>
      `/bg/bg (${staticImages[randomInt(0, staticImages.length - 1)]}).jpeg`;
    return <ImageBg src={getRandomImage()} {...baseProps} />;
  }

  return (
    <Query query={GET_IMAGE_QUERY} variables={{ query }} ssr={false}>
      {({ error, loading, data }) => {
        return <ImageBg src={data ? data.image : ""} {...baseProps} />;
      }}
    </Query>
  );
};

const ImageBg = props => {
  return (
    <div className={"DynamicImageBg "}>
      <div className={"ImgContainer"}></div>
      <div className={"Content"}>{props.children}</div>

      <style jsx>{`
    .DynamicImageBg {
        width: 100%;               
        height: 100%;
        position: relative;
        background-color: ${variables.mutedColor2}
    }

    .ImgContainer {
        background-image: url('${props.src}');
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
};

export default React.memo(DynamicImageBg);
