import React, { useState } from "react";

import Icon from "./Icon";

const favoriteIcon = props => {
  const [favoriteSelected, setFavoriteSelected] = useState(false);
  const [classes, setClasses] = useState("untouched");

  const setFavoriteHandler = () => {
    setFavoriteSelected(!favoriteSelected);
    setClasses(classes === "untouched" ? "touched" : "untouched");
  };

  return (
    <span onClick={setFavoriteHandler} className={classes}>
      <Icon
        icon={"star"}
        size={props.size || "lg"}
        title={"Add to Favorites"}
      ></Icon>

      <style jsx>{`
        .untouched :global(svg) {
          color: white;
        }

        .touched :global(svg) {
          color: #ffd800;
        }
      `}</style>
    </span>
  );
};

export default favoriteIcon;
