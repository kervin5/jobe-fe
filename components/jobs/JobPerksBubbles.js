import React from "react";
import Bubble from "../common/UI/Bubble";

const JobPerksBubbles = ({ perks }) => {
  return (
    <>
      {perks.map((perk, index) => (
        <Bubble color="1" key={perk.id ?? "Perk" + index}>
          {perk.name}
        </Bubble>
      ))}
    </>
  );
};

export default JobPerksBubbles;
