import React from "react";
import variables from "@/common/globalVariables";

const Avatar = ({ name = "Unknown", nomargin }) => {
  const initials = name?.split(" ");
  const firstInitial = initials[0][0];
  const lastInitial = initials?.[1]?.[0];

  return (
    <span className="Avatar">
      {`${firstInitial} ${lastInitial?.toUpperCase() ?? ""}`}
      <style jsx>{`
        .Avatar {
          background: ${variables.accentColor3};
          color: ${variables.lightColor};
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100px;
          height: 100px;
          border-radius: 20px;
          font-size: 2em;
          margin: ${nomargin ? "0" : "auto 10px"};
        }
      `}</style>
    </span>
  );
};

export default Avatar;
