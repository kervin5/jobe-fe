import React from "react";
import styled from "styled-components";
import Link from "next/link";
import variables from "@/common/globalVariables";

const getLinkPath = (term) => {
  if (term.type === "location") return "/jobs?location=" + term.label;
  if (term.type === "category") return "/jobs?category=" + term.label;
};

const getLabel = (term) => {
  if (term.type === "location") return term.label.split(",")[0];
  if (term.type === "category") return term.label.split(" ◦ ")[0];
};

const StyledPopularTerm = styled.div`
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  transition: 100ms;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 60px 30px;

  &:hover {
    transform: scale(1.05);
  }

  &::before {
    content: "";
    background: ${(props) => props.colors[0]};
    position: absolute;
    display: block;
    z-index: 2;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }

  .TermContent {
    text-decoration: none;
    color: ${(props) => props.theme.lightColor};
    z-index: 3;
    font-size: 1.2em;
    font-weight: bold;
  }

  @media (max-width: 720px) {
    .TermContent {
      padding: 10px;
    }
  }
`;

const PopularTerm = ({ term }) => {
  const colors = [
    variables.accentColor1,
    variables.accentColor2,
    variables.accentColor3,
  ];

  colors.sort((elem1, elem2) => Math.random() - Math.random());

  return (
    <StyledPopularTerm key={term.id} className="Term" colors={colors}>
      <Link href={getLinkPath(term)}>
        <a href={getLinkPath(term)} className="TermContent">
          {getLabel(term)}
        </a>
      </Link>
    </StyledPopularTerm>
  );
};

export default PopularTerm;
