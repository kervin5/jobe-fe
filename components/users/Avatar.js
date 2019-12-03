import React from "react";
import variables from "../common/globalVariables";

const Avatar = ({ name = "Kervin Vasquez" }) => {
  const initials = name.split(" ");
  const firstInitial = initials[0][0];
  const lastInitial = initials.pop()[0];
  return (
    <span className="Avatar">
      {`${firstInitial} ${lastInitial}`}
      <style jsx>{`
        .Avatar {
          background: ${true ? variables.clearColor : "transparent"};
          font-weight: bold;
        }
      `}</style>
    </span>
  );
};

export default Avatar;
