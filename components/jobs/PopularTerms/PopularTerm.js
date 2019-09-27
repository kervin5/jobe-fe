import React from "react";
import Link from "next/link";
import variables from "../../common/globalVariables";
import DynamicImageBg from "../../common/UI/DynamicImageBg";

const getLinkPath = term => {
  if (term.type === "location") return "/jobs?location=" + term.label;
  if (term.type === "category") return "/jobs?category=" + term.label;
};

const getLabel = term => {
  if (term.type === "location") return term.label.split(",")[0];
  if (term.type === "category") return term.label.split(" ◦ ")[0];
};

const PopularTerm = ({ term }) => {
  const colors = [
    variables.accentColor1,
    variables.accentColor2,
    variables.accentColor3,
    "rgba(0,0,0,0.4)"
  ];
  const nobg = Math.random() >= 0.5;
  colors.sort((elem1, elem2) => Math.random() - Math.random());

  return (
    <div key={term.id} className="Term">
      <Link href={getLinkPath(term)}>
        <a>
          <DynamicImageBg query={term.label} noblur hide>
            <p className="TermContent">{getLabel(term)}</p>
          </DynamicImageBg>
        </a>
      </Link>
      <style jsx>{`
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
          background: ${colors[0]};
          position: absolute;
          display: block;
          z-index: 5;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          opacity: 0.8;
        }

        .Term .TermContent {
          position: relative;
          padding: 30px 10px;
          font-weight: bold;
          color: white;
          text-align: center;
          z-index: 4;
        }

        @media (max-width: 720px) {
          .Term .TermContent {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default PopularTerm;
