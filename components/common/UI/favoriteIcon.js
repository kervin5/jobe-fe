import React, { useState } from "react";

const favoriteIcon = props => {
  const [favoriteSelected, setFavoriteSelected] = useState(false);
  let iconColor = { color: "#ffffff" };

  const setFavoriteHandler = () => {
    setFavoriteSelected(!favoriteSelected);
  };

  if (favoriteSelected === true) {
    iconColor = { color: "#ffeb11" };
  }

  return (
    <FontAwesomeIcon
      icon={["fa", "star"]}
      size={props.size || "lg"}
      onClick={setFavoriteHandler}
      style={iconColor}
      title={"Add to Favorites"}
    ></FontAwesomeIcon>
  );
};

export default favoriteIcon;
