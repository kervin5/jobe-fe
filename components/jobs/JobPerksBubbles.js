import React from "react";
import Bubble from "../common/UI/Bubble";

const JobPerksBubbles = ({ perks }) => {
  return (
    <div className="JobPerksBubbles">
      {perks.map((perk, index) => (
        <Bubble color="1" key={perk.id ?? "Perk" + index}>
          {perk.name}
        </Bubble>
      ))}
      <style jsx>{`
        .JobPerksBubbles {
          display: flex;
          position: inline-block;
        }
      `}</style>
    </div>
  );
};

export default JobPerksBubbles;
