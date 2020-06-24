import React from "react";
import variables from "@/common/globalVariables";

const Avatar = ({ name = "Unknown" }) => {
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
          width: 100px;
          height: 100px;
          border-radius: 20px;
          font-size: 2em;
          margin: auto 10px;
        }
      `}</style>
    </span>
  );
};

export default Avatar;
