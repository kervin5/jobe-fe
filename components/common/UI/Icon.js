import React from "react";
import PropTypes from "prop-types";

// import classes from './Icon.modules.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = props => {
  if (props.icon) {
    return (
      <FontAwesomeIcon
        icon={["fa", props.icon]}
        size={props.size || "lg"}
        onClick={props.click}
      />
    );
  }

  return null;
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default Icon;
