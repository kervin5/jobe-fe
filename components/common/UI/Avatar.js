import React from "react";
import variables from "../globalVariables";

const Avatar = ({ name = "Kervin Vasquez" }) => {
  const initials = name.split(" ");
  const firstInitial = initials[0][0];
  const lastInitial = initials.pop()[0];

  return (
    <span className="Avatar">
      {`${firstInitial} ${lastInitial}`}
      <style jsx>{`
        .Avatar {
          background: ${variables.accentColor3};
          color: ${variables.clearColor};
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 30px;
          font-size: 1.2em;
          margin: auto 10px;
        }
      `}</style>
    </span>
  );
};

export default Avatar;
